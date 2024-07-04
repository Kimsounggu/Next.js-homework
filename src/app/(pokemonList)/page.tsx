"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pokemon } from "../types/pokemon";
import Link from "next/link";

const Page = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        setPokemonData(response.data);
      } catch (error) {
        console.error(
          "포켓몬 데이터를 가져오는 중 에러가 발생했습니다:",
          error
        );
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="m-2">
      <h1 className="text-center text-2xl">포켓몬 도감</h1>
      <ul className="grid grid-cols-6 gap-4">
        {pokemonData.map((pokemon, id) => {
          return (
            <li key={id}>
              <div className="border p-4 rounded-lg ">
                <Link href={`/${pokemon.id}`}>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.korean_name}
                    width={100}
                    height={100}
                  />
                </Link>
                <p>{pokemon.korean_name}</p>
                <p>도감번호: {pokemon.id}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
