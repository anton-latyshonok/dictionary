import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchForm from "./components/SearchForm/SearchForm";
import WordDefinition from "./components/WordDefinition/WordDefinition";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<SearchForm />} />
                    <Route path="/:word" element={<WordDefinition />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
