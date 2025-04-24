import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  steel: "#B7B7CE",
  dark: "#705746",
  fairy: "#D685AD",
};

const ListaPokemon = () => {
  const [generations, setGenerations] = useState([]);
  const [currentGenerationIndex, setCurrentGenerationIndex] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/generation/");
        const data = await response.json();
        setGenerations(data.results);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar gerações:", err);
        setError("Erro ao carregar as informações das gerações.");
        setLoading(false);
      }
    };

    fetchGenerations();
  }, []);

  useEffect(() => {
    const fetchPokemonsForGeneration = async () => {
      if (generations.length > 0) {
        setLoading(true);
        setError(null);
        const currentGenerationUrl = generations[currentGenerationIndex].url;

        try {
          const generationResponse = await fetch(currentGenerationUrl);
          const generationData = await generationResponse.json();
          const pokemonSpecies = generationData.pokemon_species;

          const pokemonDetailsPromises = pokemonSpecies.map(async (species) => {
            const speciesResponse = await fetch(species.url);
            const speciesDetails = await speciesResponse.json();
            if (
              speciesDetails.varieties &&
              speciesDetails.varieties.length > 0
            ) {
              const pokemonUrl = speciesDetails.varieties[0].pokemon.url;
              const pokemonResponse = await fetch(pokemonUrl);
              return await pokemonResponse.json();
            }
            return null;
          });

          let pokemonDetails = (
            await Promise.all(pokemonDetailsPromises)
          ).filter((pokemon) => pokemon !== null);

          pokemonDetails.sort((a, b) => a.id - b.id);

          setPokemons(pokemonDetails);
          setLoading(false);
        } catch (err) {
          console.error("Erro ao buscar Pokémon da geração:", err);
          setError(
            `Erro ao carregar os Pokémon da geração ${generations[currentGenerationIndex]?.name}.`
          );
          setLoading(false);
        }
      }
    };

    fetchPokemonsForGeneration();
  }, [generations, currentGenerationIndex]);

  const selectGeneration = (index) => {
    setCurrentGenerationIndex(index);
  };

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (generations.length === 0)
    return <p className="text-center mt-10">Nenhuma geração encontrada.</p>;

  return (
    <div className="bg-slate-800 overflow-x-hidden px-4">
      <nav className="static w-screen z-50 px-2 py-4 top-0 text-slate-300">
        <div className=" w-fit flex items-center gap-5">
          <a href="/">
            <i class="bx bx-home-alt text-3xl md:text-4xl hover:scale-110 hover:text-blue-600"></i>
          </a>
        </div>
      </nav>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:flex lg:flex-wrap justify-center items-center gap-1 lg:gap-2 space-x-2 p-4 mb-4">
        {generations.map((generation, index) => (
          <button
            key={generation.name}
            disabled={loading}
            onClick={() => selectGeneration(index)}
            className={`px-3 py-2 rounded-xl uppercase min-w-30 max-w-30 font-bold self-center ${
              currentGenerationIndex === index
                ? "bg-blue-600 text-white"
                : "bg-slate-400 text-black hover:bg-slate-300 border-black border-2 duration-150 ease-in-out cursor-pointer"
            }`}
          >
            {generation.name.replace("generation-", "Gen ")}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="bg-slate-800 flex justify-center items-center h-screen">
          <div class="border-gray-300 h-40 w-40 animate-spin rounded-full border-10 border-t-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {pokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div
                key={pokemon.id}
                className="bg-slate-200 hover:scale-105 rounded-xl flex flex-col items-center justify-center shadow-md py-4 text-center border-4"
                style={{ borderColor: typeColors[pokemon.types[0].type.name] }}
              >
                <div className="flex items-center justify-center p-6 w-fit rounded-xl bg-slate-300">
                  <img
                    src={
                      pokemon.sprites?.other?.["official-artwork"]
                        ?.front_default
                    }
                    alt={pokemon.name}
                    className="lg:w-40 lg:h-40 h-30 w-30 mx-auto self-center"
                  />
                </div>
                <p className="capitalize mt-2 mb-2 font-semibold">
                  {pokemon.id}. {pokemon.name}
                </p>
                <p className="text-lg text-gray-700">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-full text-white mr-2"
                      style={{
                        backgroundColor: typeColors[type.type.name] || "gray",
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </p>
              </div>
            </Link>
          ))}
          
        </div>
      )}
      <footer className="z-50 w-screen flex flex-col mb-6 items-center">
            <hr className="my-6 border-gray-200 w-11/12 lg:w-8/12 sm:mx-auto lg:my-4" />
            <span className="flex items-center justify-center gap-2 text-sm text-gray-500 sm:text-center">
              © 2025
              <a
                href="https://emouradev.vercel.app/"
                target="_blank"
                className="hover:underline text-white"
              >
                EM Dev
              </a>
              | All Rights Reserved.
            </span>
          </footer>
    </div>
  );
};

export default ListaPokemon;
