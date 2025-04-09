import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchPokemon = async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();

      setPokemon(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    }
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  if (!pokemon) return null;

  const mainType = pokemon.types[0]?.type?.name;
  const backgroundColor = typeColors[mainType] || "#f3f4f6";
  const artworkUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-300 select-none">
      <nav>
        <Link to="/" className="fixed top-4 left-4 text-black font-bold">
        <i class='bx bx-home-alt'></i> Voltar
        </Link>
      </nav>
      <section
        className="flex flex-col items-center lg:w-4/12 h-fit rounded-xl drop-shadow-2xl border-2"
        style={{ backgroundColor }}
      >
        {artworkUrl ? (
          <img src={artworkUrl} alt={pokemon.name} className="w-6/12" />
        ) : (
          // Caso a official-artwork não esteja disponível, você pode usar o sprite padrão como fallback
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-4/12 mt-8"
          />
        )}
        <div className="flex flex-col items-center bg-white w-10/12 h-4/6 rounded-xl  mb-10 py-5">
          <h1 className="text-3xl capitalize mb-6 font-bold">
            {pokemon.id}. {pokemon.name}
          </h1>
          <p className="mb-8 text-lg text-gray-700">
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
          <div className="flex justify-around w-full capitalize px-10 divide-x">
            <div className=" text-center w-8/12 px-4">
              <h2 className="text-xl mb-2 font-bold tracking-wide">Stats</h2>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}{" "}
                    <div className="h-1.5 rounded-full w-full bg-gray-300">
                      <div
                        style={{
                          width: `${stat.base_stat}%`,
                          backgroundColor: typeColors[mainType],
                          maxWidth: "100%",
                        }}
                        className="h-full rounded-full "
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pokemon;
