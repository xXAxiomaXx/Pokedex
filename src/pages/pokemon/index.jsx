import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div class="border-gray-300 h-40 w-40 animate-spin rounded-full border-10 border-t-blue-600" />
      </div>
    );

  if (!pokemon) return null;

  const mainType = pokemon.types[0]?.type?.name;
  const backgroundColor = typeColors[mainType] || "#f3f4f6";
  const artworkUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="w-screen min-h-screen py-4 flex flex-col items-center justify-center bg-slate-800 select-none">
      <nav className="w-screen flex px-3 mb-10">
        <Link
          to="/pokemon"
          className="flex text-xl gap-1 items-center justify-center top-4 left-4 text-white font-bold"
        >
          <i class="bx bx-arrow-back text-xl"></i> Back
        </Link>
      </nav>
      <section
        className="mb-10 flex flex-col items-center w-11/12 lg:w-8/12 rounded-xl drop-shadow-2xl bg-slate-200 border-4 p-4"
        style={{ borderColor: typeColors[mainType] }}
      >
        <div className="flex flex-col lg:flex-row justify-center mb-6 h-full items-center gap-4 lg:w-11/12">
        
          {artworkUrl ? (
            <div className="flex items-center justify-center py-3 lg:w-7/12 rounded-xl bg-slate-300">
              <img src={artworkUrl} alt={pokemon.name} className="w-6/12" />
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 w-fit rounded-xl bg-slate-300">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-4/12 mt-8"
              />
            </div>
          )}
          <div
            className="lg:w-5/12 p-3 grid grid-cols-2 gap-x-5 lg:gap-x-0 items-center rounded-xl"
            style={{ backgroundColor: backgroundColor }}
          >
            <div className=" ">
              <h2 className="text-white text-2xl">Height</h2>
              <h3 className="text-lg tracking-wider">{pokemon.height / 10} m</h3>
            </div>
            <div className=" ">
              <h2 className="text-white text-2xl">Weight</h2>
              <h3 className="text-lg tracking-wider">{pokemon.weight / 10} Kg</h3>
            </div>
            <div className=" ">
              <h2 className="text-white text-2xl">Experience</h2>
              <h3 className="text-lg tracking-wider">{pokemon.base_experience}</h3>
            </div>
            <div className=" ">
              <h2 className="text-white text-2xl">Form</h2>
              <h3 className="text-lg tracking-wider capitalize">{pokemon.forms[0].name}</h3>
            </div>
            <div className=" ">
              <h2 className="text-white text-2xl">Abilities</h2>
              {pokemon.abilities.map((ability) => (
                <h3 className="text-lg tracking-wider capitalize" key={ability.ability.name}>{ability.ability.name}</h3>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white w-11/12 h-4/6 rounded-xl  mb-10 py-5">
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
          <div className="flex justify-around w-full capitalize">
            <div className=" text-center lg:w-10/12 lg:px-10">
              <h2 className="text-3xl mb-6 font-bold tracking-wider">Stats</h2>
              <ul className="flex gap-5 w-full items-center justify-between">
                {pokemon.stats.map((stat) => (
                  <li className="flex flex-col-reverse items-center gap-2" key={stat.stat.name}>
                    <h2 className="lg:text-lg font-bold">{stat.stat.name.replace("special-","sp ").replace("attack","Atk").replace("defense","Def").replace("speed","Spd").replace("hp","HP")}</h2>
                     
                    <div className="h-30 rounded-sm w-8 flex flex-col-reverse bg-gray-300">
                      <div
                        style={{
                          height: `${stat.base_stat}%`,
                          backgroundColor: typeColors[mainType],
                          maxHeight: "100%",
                        }}
                        className="h-full rounded-sm "
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className="z-50 w-screen flex flex-col items-center">
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

export default Pokemon;
