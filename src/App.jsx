import ListaPokemons from "./pages/ListaPokemons/index.jsx";
import Logo from "./assets/Images/Logo.png";

function App() {
  return (
    <>
      <img
        src={Logo}
        alt="Logo"
        className="md:w-3/12 mb-20 self-center justify-self-center"
      />
      <ListaPokemons />;
    </>
  );
}

export default App;
