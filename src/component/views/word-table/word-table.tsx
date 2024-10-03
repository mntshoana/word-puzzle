import CloseIcon from "component/icon/close/close";
import LolipopComponent from "component/lolipop/lolipop";
import { PuzzleSolverResponseDTO } from "data/dtos/puzzle/puzzle-solver-dto";
import css from "./word-table.module.css";

interface WordTableProps {
  close: () => void;
  data: PuzzleSolverResponseDTO[];
  max: number;
  className?: string;
}

const AppWordTableComponent = (props: WordTableProps) => {
  return (
    <div className={css.overlay}>
      <div className={css.content}>
        <div onClick={props.close}>
          <CloseIcon className={css.close_button} size={20} />
        </div>
        <h2 className={css.title}>Words found</h2>

        <table>
          <tbody>
            {props.data.map((row) => (
              <tr key={row.value}>
                <td>{row.word}</td>
                <td>
                  <LolipopComponent value={row.count} max={props.max} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppWordTableComponent;
