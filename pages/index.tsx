import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState([]);

  let offset = 0;

  const loadMorePokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(({ data }) => {
        const newPokemon = [];
        data.results.forEach((p) => newPokemon.push(p.name));

        setPokemon((prev) => [...prev, ...newPokemon]);
        offset += 10;
      })
      .catch((error) => console.log(error));
  };

  const handleScroll = (e) => {
    //scrollTop и innerHeight в сумме равны scrollHeight
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      console.log(currentHeight);
      loadMorePokemon(currentHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    loadMorePokemon();
  }, []);

  return (
    <div
      className="flex
      flex-col items-center
      justify-center min-h-screen py-2
    bg-gray-900 text-gray-200"
    >
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="flex flex-col text-4xl font-bold items-center justify-center w-full px-20 text-center ">
        {pokemon?.map((p, i) => {
          return (
            <div
              key={i}
              className="my-5 border w-80 h-40 flex justify-center place-items-center bg-teal-900 font-mono"
            >
              <div className="mx-1">{i + 1}.</div>
              <div>{p.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
