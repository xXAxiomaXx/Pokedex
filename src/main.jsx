import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Pokemon from "./pages/Pokemon/index.jsx";
import ListaPokemons from "./pages/ListaPokemons/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ListaPokemons" element={<ListaPokemons />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
    </Routes>
  </BrowserRouter>
);
