import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Card, { CardContainer } from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import { GetAllCharacter, SearchCharacterByName } from "../../lib/Queries";

export default function Home() {
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const [favourite, setfavourite] = useState(() => {
    const localData = localStorage.getItem("favourite");
    return localData ? localData.split(",") : [];
  });
  const { loading, error, data } = useQuery(search === "" ? GetAllCharacter : SearchCharacterByName, {
    variables: search === "" ? { page: page } : { name: { name: search }, page: page },
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

  function searchBtn() {
    setsearch(document.getElementById("name").value);
  }

  if (error) return <div>{error.message}</div>;
  if (loading) return <div>loading...</div>;
  return (
    <div>
      <Navbar />
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search Character Here"
          style={{
            marginLeft: "10%",
            padding: "0.5%",
          }}
        />
        <button
          onClick={() => searchBtn()}
          style={{
            padding: "0.5%",
          }}
        >
          Search
        </button>
        <div>
          <CardContainer>
            {!loading &&
              !error &&
              data &&
              data.characters.results.map((character, idx) => {
                return <Card key={character.id} characters={character} handlefav={handleFav} findfavourite={findFavouriteId}></Card>;
              }, "no character")}
          </CardContainer>
          <button
            onClick={() => handlePreviousPage()}
            style={{
              width: "10%",
              padding: "0.3%",
              marginLeft: "38%",
              marginRight: "2%",
            }}
          >
            -
          </button>
          <button
            onClick={() => handleNextPage()}
            style={{
              width: "10%",
              padding: "0.3%",
              // marginRight :"%",
              marginLeft: "2%",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
