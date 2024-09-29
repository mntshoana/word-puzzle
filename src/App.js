import { BrowserRouter } from "react-router-dom";
import "./App.css";
import DefaultRouter from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <DefaultRouter />
    </BrowserRouter>
  );
}

export default App;
