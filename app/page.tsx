"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCryptoPrices = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,ripple,cardano,solana",
      },
    }
  );
  return data;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 60000, // Cache for 1 min
  });

  const refreshPrices = () => {
    queryClient.invalidateQueries(["cryptoPrices"]);
  };

  const filteredData = data?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border p-3 rounded w-full mb-4 text-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={refreshPrices}
        className="bg-blue-500 text-white px-6 py-3 rounded mb-4 text-lg"
      >
        Refresh Prices
      </button>
      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <ul className="w-full">
          {filteredData?.map((coin) => (
            <li key={coin.id} className="flex flex-col md:flex-row justify-between p-3 border-b text-lg">
              <span>{coin.name}</span>
              <span className="font-semibold">${coin.current_price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}