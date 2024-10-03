import ButtonComponent from "component/button/button";
import NumberInputComponent from "component/input/number/number";
import SliderComponent from "component/input/slider/slider";
import SpinnerComponent from "component/spinner/spinner";
import { ToasterContext } from "component/toastr/toastr.service";
import { WORD_LIMIT } from "data/constants/word-limit";
import { useContext, useState } from "react";
import { HttpClientService } from "service/http-client-service/http-client.service";
import { number_words } from "src/data/constants/example";
import {
  PuzzleGeneratorRequestDTO,
  PuzzleGeneratorResponseDTO,
} from "src/data/dtos/puzzle/puzzle-generator-dto";
import { countWordsInString } from "src/service/sequence-solver-service/random-sequence-solver";
import SessionStorageService from "src/service/session-storage-service/session-storage-service";
import css from "./generator.module.css";

const AppGeneratorComponent = () => {
  const [wordCount, setWordCount] = useState(WORD_LIMIT.WORD_COUNT_MINIMUM);
  const [minLength, setMinLength] = useState(WORD_LIMIT.MIN_LENGTH_MINIMUM);
  const [generateBy, setGenerateBy] = useState(0);
  const [lastSearched, setLastSearched] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const addToast: any = useContext(ToasterContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const session: SessionStorageService = new SessionStorageService();
  const errorCheck = (): boolean => {
    if (
      minLength < WORD_LIMIT.MIN_LENGTH_MINIMUM ||
      minLength > WORD_LIMIT.MIN_LENGTH_MAXIMUM
    ) {
      setErrorMessage(
        `Min length count must be between ${WORD_LIMIT.MIN_LENGTH_MINIMUM} and ${WORD_LIMIT.MIN_LENGTH_MAXIMUM}`
      );

      return true;
    }

    if (
      wordCount < WORD_LIMIT.WORD_COUNT_MINIMUM ||
      wordCount > WORD_LIMIT.WORD_COUNT_MAXIMUM
    ) {
      setErrorMessage(
        `Word count must be between ${WORD_LIMIT.WORD_COUNT_MINIMUM} and ${WORD_LIMIT.WORD_COUNT_MAXIMUM}`
      );
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

    let endpoint = `/api/PuzzleGenerator/words/${wordCount}`;
    if (generateBy === 1) {
      endpoint = `/api/PuzzleGenerator/minLength/${minLength}`;
    }
    const request: PuzzleGeneratorRequestDTO = {};
    const client = new HttpClientService();
    client
      .get<PuzzleGeneratorResponseDTO, PuzzleGeneratorRequestDTO>(
        endpoint,
        request
      )
      .then((response: PuzzleGeneratorResponseDTO) => {
        setLastSearched(response.wordSequence ?? null);
        addToast("Done", "success");
        if (response.wordSequence) {
          const item: HistoryItem = {
            generatedText: response.wordSequence,
            wordCount: response.wordCount,
            wordCountDescription: countWordsInString(
              response.wordSequence,
              number_words
            ),
            date: new Date().getTime(),
          };

          session.write(`${item.date}`, JSON.stringify(item));
        }
      })
      .catch((error) => {
        addToast(
          "System error. Please try again later." + error.message,
          "error"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <SpinnerComponent />}
      <div className={css.container}>
        {generateBy === 0 && (
          <>
            <h2>Generate by word count</h2>
            <NumberInputComponent
              className={css.word_count_input}
              value={wordCount}
              onBlur={() => errorCheck()}
              error={errorMessage}
              onChange={(val) => setWordCount(val)}
            />
          </>
        )}
        {generateBy === 1 && (
          <>
            <h2>Generate using minimum length</h2>
            <SliderComponent
              className={css.slider}
              min={WORD_LIMIT.MIN_LENGTH_MINIMUM}
              max={WORD_LIMIT.MIN_LENGTH_MAXIMUM}
              label="Value"
              value={minLength}
              disabled={false}
              valueChange={(val) => setMinLength(val)}
            />
          </>
        )}
      </div>
      <span
        className={css.switch_generator}
        onClick={() => setGenerateBy((generateBy + 1) % 2)}
      >
        Try by {generateBy === 0 ? "minimum length" : "word count"}
      </span>
      <ButtonComponent
        className={css.button}
        label="Generate"
        disabled={false}
        onClick={() => submit()}
      />

      {lastSearched && (
        <div className={css.result_container}>
          <h3 className={css.result}>{lastSearched}</h3>
        </div>
      )}
    </>
  );
};

export default AppGeneratorComponent;
