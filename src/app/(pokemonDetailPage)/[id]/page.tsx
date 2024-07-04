import React from "react";
import Image from "next/image";
import { Pokemon } from "../types/pokemon";
import Link from "next/link";

export const fetchDetailData = async (id: string): Promise<Pokemon> => {
  const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  const data = await res.json();
  return data;
};

const pokemonDetail = async ({ params }: { params: { id: string } }) => {
  const data = await fetchDetailData(params.id);
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-black p-4 font-bold">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <div className="text-2xl font-bold mb-2 bg-gray-400">
          {data.korean_name}
        </div>
        <div className="text-lg mb-4">No.{data.id}</div>
        <div className="flex justify-center mb-4">
          <Image
            src={data.sprites.front_default}
            alt={data.korean_name}
            width={100}
            height={100}
          />
        </div>
        <div className="text-sm mb-2 font-bold">키: {data.height / 10}m</div>
        <div className="text-sm mb-2 font-bold">
          몸무게: {data.weight / 10}kg
        </div>
        타입:{" "}
        <span className="text-sl text-orange-500 mb-2 font-bold">
          {data.types.map((type: string) => type.type.korean_name).join(", ")}
        </span>{" "}
        <br />
        특성:{" "}
        <span className="text-sl text-green-500 mb-2 font-bold">
          {data.abilities
            .map((ability: string) => ability.ability.korean_name)
            .join(" ")}
        </span>
        <div className="text-sm font-bold mb-2">기술:</div>
        <div className="flex flex-wrap justify-center font-bold">
          {data.moves.map((move: string, index: number) => (
            <div key={index} className="p-1  text-sm">
              {move.move.korean_name}
            </div>
          ))}
          <div className="text-white border bg-blue-500 p-2 rounded">
            <Link href={"/"}>뒤로가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokemonDetail;
