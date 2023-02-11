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
    setpage(1);
  }, []);

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
    </div>
  );
}
