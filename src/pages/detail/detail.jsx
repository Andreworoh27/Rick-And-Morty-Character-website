import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardCharacterDetail, CardContainer } from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import { SearchCharacterByID } from "../../lib/Queries";

export default function Detail() {
  let id = useParams().id;
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
    } else {
      setfavourite((favourite) => [...favourite, id]);
    }
  }

  function findFavouriteId(id) {
    return favourite.find((item) => item === id);
  }
  const { loading, error, data } = useQuery(SearchCharacterByID, {
    variables: {
      id: id,
    },
  });

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>loading...</div>;
  return (
    <div>
      {/* {console.log(data.charactersByIds)} */}
      <Navbar />
      <CardContainer>
        {/* <Card characters={data.charactersByIds[0]}></Card> */}
        <CardCharacterDetail details={data.charactersByIds[0]} handlefav={handleFav} findfavourite={findFavouriteId}></CardCharacterDetail>
      </CardContainer>
    </div>
  );
}
