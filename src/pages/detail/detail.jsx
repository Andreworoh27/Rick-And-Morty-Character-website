import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Card, { CardCharacterDetail, CardContainer } from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";
import { SearchCharacterByID } from "../../lib/Queries";

export default function Detail() {
  // console.log(useParams().id)
  let id = useParams().id;
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
        <CardCharacterDetail details={data.charactersByIds[0]}></CardCharacterDetail>
      </CardContainer>
    </div>
  );
}
