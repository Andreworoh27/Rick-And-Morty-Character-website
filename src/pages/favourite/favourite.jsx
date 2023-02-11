import { useQuery } from "@apollo/client";
import { useState } from "react";
import Card, { CardContainer } from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import { GetAllCharacter } from "../../lib/Queries";

export default function Favourite() {
  const [page, setpage] = useState(1);

  function handleNextPage() {
    setpage(page + 1);
  }
  function handlePreviousPage() {
    setpage(page - 1);
  }

  const { loading, error, data } = useQuery(GetAllCharacter, {
    variables: {
      page: page,
    },
  });

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>loading...</div>;
  return (
    <div>
      <Navbar />
      <h2 style={{ marginLeft: "10%" }}>Your Favourite Characters :</h2>
      <div>
        <CardContainer>
          {!loading &&
            !error &&
            data &&
            data.characters.results.map((character, idx) => {
              if (localStorage.getItem(character.id) !== null) {
                return <Card key={character.id} characters={character}></Card>;
              }
            }, "no character")}
        </CardContainer>
      </div>
      <button onClick={() => handlePreviousPage()}>-</button>
      <button onClick={() => handleNextPage()}>+</button>
    </div>
  );
}

/*
mau bikin fav page :
1. local storage key jadi index 
2. local storage value jadi id dari character
3. pas di fav ambil smua local storage id
4. search setiap id di search pake query search by id dan store di variabel
5. display pake map
*/
