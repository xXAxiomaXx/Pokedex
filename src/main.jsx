import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ListaPokemons from "./pages/ListaPokemons/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokemon from "./pages/pokemon/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon" element={<ListaPokemons />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
    </Routes>
  </BrowserRouter>
);
