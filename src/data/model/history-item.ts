interface HistoryItem {
  generatedText: string;
  wordCount?: number;
  wordCountDescription?: { [key: string]: number };
  date: number;
}