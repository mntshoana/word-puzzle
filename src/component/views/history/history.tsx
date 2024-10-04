import { ToasterContext } from "component/toastr/toastr.service";
import { HistoryItem } from "data/models/history-item";
import { useContext, useEffect, useState } from "react";
import SessionStorageService from "src/service/session-storage-service/session-storage-service";
import css from "./history.module.css";

const AppHistoryComponent = () => {
  const addToast: any = useContext(ToasterContext);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const session: SessionStorageService = new SessionStorageService();
  useEffect(() => {
    let history = session.getAll().map((item) => session.read(item));
    setHistoryData(
      history.reduce<HistoryItem[]>((list, item) => {
        try {
          list.push(JSON.parse(item));
          return list;
        } catch (e) {
          return list;
        }
      }, [])
    );
  }, []);

  const renderWordEntry = (item: {
    generatedText: string;
    wordCount: number;
    wordCountDescription: { [key: string]: number };
  }) => {
    return (
      <div className={css.container}>
        <p className={css.textGen}>{item.generatedText}</p>
        {renderWordCount(item.wordCount)}
        <div className={css.entry_container}>
          {orderCorrectory(item.wordCountDescription).map((wordKey) => (
            <div key={wordKey} className={css.entry_result}>
              {wordKey}: {item.wordCountDescription[wordKey]}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const orderCorrectory = (wordCountDescription: {
    [key: string]: number;
  }): string[] => {
    const order = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    return order.filter((key) => key in wordCountDescription);
  };

  const renderWordCount = (wordCount?: number) => {
    if (!wordCount) return null;
    return (
      <p className={css.word_count_title}>
        Count of {wordCount} word
        {wordCount === 1 ? "" : "s"}
      </p>
    );
  };
  return (
    <div className={css.historyContainer}>
      {historyData
        .sort((a, b) => b.date - a.date)
        .map((item, index) => (
          <div key={index} className={css.historyItem}>
            {renderWordEntry(item)}
          </div>
        ))}
      {historyData.length === 0 && (
        <p className={css.no_history}>No history found</p>
      )}
    </div>
  );
};

export default AppHistoryComponent;
