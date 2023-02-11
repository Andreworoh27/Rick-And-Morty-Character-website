import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Card, { CardContainer } from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import { SearchCharacterByID } from "../../lib/Queries";

export default function Favourite() {
  const [page, setpage] = useState(1);
  const [favourite, setfavourite] = useState(() => {
    const localData = localStorage.getItem("favourite");
    return localData ? localData.split(",") : [];
  });

  useEffect(() => {
    localStorage.setItem("favourite", favourite);
  }, [favourite]);

  function handleFav(id) {
    let findid = findFavouriteId(id);
    if (findid) {
      let newfav = favourite.filter((favourite) => favourite !== id);
      setfavourite(newfav);
      window.location.reload();
    } else {
      setfavourite((favourite) => [...favourite, id]);
    }
  }

  function findFavouriteId(id) {
    return favourite.find((item) => item === id);
  }

  function handleNextPage() {
    setpage(page + 1);
  }
  function handlePreviousPage() {
    setpage(page - 1);
  }

  const favIds = localStorage.getItem("favourite");
  const ids = favIds ? favIds.split(",") : 0;

  const { loading, error, data } = useQuery(SearchCharacterByID, {
    variables: {
      id: ids,
    },
  });

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>loading...</div>;
  if (!loading) console.log(data.charactersByIds);
  return (
    <div>
      <Navbar />
      <h2 style={{ marginLeft: "10%" }}>Your Favourite Characters :</h2>
      <div>
        <CardContainer>
          {!loading &&
            !error &&
            data &&
            data.charactersByIds.map((character, idx) => {
              return <Card key={character.id} characters={character} handlefav={handleFav} findfavourite={findFavouriteId}></Card>;
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
