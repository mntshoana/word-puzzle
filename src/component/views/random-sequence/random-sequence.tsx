import {
  PuzzleSolverRequestDTO,
  PuzzleSolverResponseDTO,
} from "data/dtos/puzzle/puzzle-solver-dto";
import { useContext, useState } from "react";
import { HttpClientService } from "service/http-client-service/http-client.service";
import SessionStorageService from "src/service/session-storage-service/session-storage-service";
import { REGEX } from "../../../data/constants/regex";
import { WORD_LIMIT } from "../../../data/constants/word-limit";
import { OnErrorResponseDTO } from "../../../data/dtos/error-dto";
import ButtonComponent from "../../button/button";
import TextInputComponent from "../../input/text/text";
import SpinnerComponent from "../../spinner/spinner";
import { ToasterContext } from "../../toastr/toastr.service";
import AppWordTableComponent from "../word-table/word-table";
import css from "./random-sequence.module.css";
const AppRandomSequenceComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addToast: any = useContext(ToasterContext);

  const [sequence, setSequence] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<
    PuzzleSolverResponseDTO[] | OnErrorResponseDTO
  >([]);
  const [max, setMax] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const session: SessionStorageService = new SessionStorageService();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const errorCheck = (): boolean => {
    if (
      sequence.length < WORD_LIMIT.MIN_LENGTH_MINIMUM ||
      sequence.length > WORD_LIMIT.MAX_LENGTH_PUZZLE
    ) {
      const message = `Length of random sequence must be between ${WORD_LIMIT.MIN_LENGTH_MINIMUM} and ${WORD_LIMIT.MAX_LENGTH_PUZZLE}`;
      setErrorMessage(message);
      return true;
    }

    if (!REGEX.SEQUENCE.test(sequence)) {
      const message = "Only letters are allowed (caps or small)";
      setErrorMessage(message);
      return true;
    }

    setErrorMessage(null);
    return false;
  };

  const submit = () => {
    if (errorCheck()) {
      return;
    }

    setIsLoading(true);

    const endpoint = `/api/PuzzleSolver`;
    const request: PuzzleSolverRequestDTO = {
      wordSequence: sequence,
    };
    const client = new HttpClientService();
    client
      .post<
        PuzzleSolverResponseDTO[] | OnErrorResponseDTO,
        PuzzleSolverRequestDTO
      >(endpoint, request)
      .then((response: PuzzleSolverResponseDTO[] | OnErrorResponseDTO) => {
        addToast("Success", "success");
        setData(response);
        if (Array.isArray(response)) {
          const maxValue = Math.max(...response.map((item) => item.count));
          setMax(maxValue);

          const item: HistoryItem = {
            generatedText: sequence,
            date: new Date().getTime(),
            wordCount: response
              .map((item) => item.count)
              .reduce((a, b) => a + b),
            wordCountDescription: response
              .map((item) => ({ [item.word]: item.count }))
              .reduce((a, b) => ({ ...a, ...b })),
          };
          session.write(`${item.date}`, JSON.stringify(item));
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 400:
            addToast(
              "Sorry, we are unable to solve the puzzle you've entered..",
              "error"
            );
            break;
          default:
            addToast("Error, " + error?.message || error?.title, "error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    toggleModal();
  };

  return (
    <>
      {isLoading && <SpinnerComponent />}
      <div className={css.container}>
        <h2>See if we can solve a random sequence</h2>
        <TextInputComponent
          className={css.random_sequence_input}
          placeholder="Enter a random sequence"
          onBlur={() => errorCheck()}
          regex={REGEX.SEQUENCE}
          error={errorMessage}
          value={sequence}
          onChange={(val) => setSequence(val)}
        />
      </div>
      <ButtonComponent
        className={css.button}
        label="Solve"
        disabled={false}
        onClick={() => submit()}
      />
      {isModalOpen && data.length > 0 && (
        <AppWordTableComponent close={toggleModal} data={data} max={max} />
      )}
    </>
  );
};

export default AppRandomSequenceComponent;
