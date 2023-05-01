import { useState } from "react";
import { useQuery } from "react-query";

import Character from "./Character";
import { ICharacter } from "../interfaces/charcter";

const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async () => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return res.json();
  };

  const { data, isLoading, isError } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true, // keep previous data
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error! </p>;
  }

  return (
    <>
      <div className='characters'>
        {data.results.map((character: ICharacter) => (
          <Character key={character.id} character={character} />
        ))}
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage((oldValue) => oldValue - 1)}
          >
            previous
          </button>
          <button
            // disabled={!data}
            onClick={() => setPage((oldValue) => oldValue + 1)}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Characters;
