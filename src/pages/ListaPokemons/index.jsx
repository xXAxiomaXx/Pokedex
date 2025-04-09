import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_POR_PAGINA = 151;

const ListaPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await res.json();
        setTotalPokemons(data.count);
        setTotalPages(Math.ceil(data.count / ITEMS_POR_PAGINA));
      } catch (error) {
        console.error("Erro ao buscar a contagem total de pokémons:", error);
        setError("Erro ao buscar informações sobre os Pokémon.");
        setLoading(false);
      }
    };

    fetchTotalPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      const offset = (currentPage - 1) * ITEMS_POR_PAGINA;

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_POR_PAGINA}&offset=${offset}`);
        const data = await res.json();

        const detalhes = await Promise.all(
          data.results.map(async (pokemon) => {
            const resDetalhes = await fetch(pokemon.url);
            return await resDetalhes.json();
          })
        );

        setPokemons(detalhes);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar pokémons da página:", error);
        setError("Erro ao carregar os Pokémon desta página.");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando Pokémon...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-slate-100">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <div
            key={pokemon.id}
            className="bg-white rounded-xl shadow-md p-4 text-center"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-20 h-20 mx-auto"
            />
            <p className="capitalize mt-2 font-semibold">{pokemon.id}. {pokemon.name}</p>
          </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={`px-3 py-2 rounded-md ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ListaPokemons;