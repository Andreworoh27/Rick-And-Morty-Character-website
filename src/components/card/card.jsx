import { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

export default function Card(characters,{children, ...attr }) {
  const character = characters.characters;
  let check = localStorage.getItem(character.id) == null ? false : true;
  const [fav, setFav] = useState(check);
  const handleFav = (id, name) => {
    if (!fav) {
      localStorage.setItem(id, name);
      setFav(true);
    } else {
      localStorage.removeItem(id);
      setFav(false);
    }
  };
  // console.log(idx);
  return (
    <div className="card">
      <Link to={`/${character.id}`} {...attr} style={{ textDecoration: "none", color: "black" }}>
        <CardImage src={character.image}></CardImage>
        <CardDetail>
          <div className="content">
            Name : <br /> {character.name}
          </div>
          <div className="content">
            Gender : <br /> {character.gender}
          </div>
          <div className="content">
            Status : <br /> {character.status}
          </div>
          <div className="content">
            Species : <br /> {character.species}
          </div>
        </CardDetail>
      </Link>
      <div style={{ alignSelf: "flex-end" }} onClick={() => handleFav(character.id, character.name)}>
        favourite : <button> {fav ? "💗" : "🤍"}</button>
      </div>
    </div>
  );
}

export function CardContainer({ children, ...attr }) {
  return (
    <div>
      <div {...attr} className="container">
        {children}
      </div>
    </div>
  );
}

function CardImage({ src, ...attr }) {
  return <img src={src} alt="character" className="card-image" />;
}

function CardDetail({ children, ...attr }) {
  return <div className="card-content">{children}</div>;
}

export function CardCharacterDetail(details, { children, ...attr }) {
  const detail = details.details;
  let check = localStorage.getItem(detail.id) == null ? false : true;
  const [fav, setFav] = useState(check);
  const handleFav = (id, name) => {
    if (!fav) {
      localStorage.setItem(id, name);
      setFav(true);
    } else {
      localStorage.removeItem(id);
      setFav(false);
    }
  };
  return (
    <div className="card" {...attr}>
      <CardImage src={detail.image}></CardImage>
      <CardDetail>
        <div className="content">
          Name : <br /> {detail.name}
        </div>
        <div className="content">
          Gender : <br /> {detail.gender}
        </div>
        <div className="content">
          Status : <br /> {detail.status}
        </div>
        <div className="content">
          Species : <br /> {detail.species}
        </div>
        <div className="content">
          Gender : <br /> {detail.gender}
        </div>
        <div className="content">
          Origin : <br /> {detail.origin.name}
        </div>
        <div className="content">
          Location : <br /> {detail.location.name}
        </div>
      </CardDetail>
      <div style={{ alignSelf: "flex-end" }} onClick={() => handleFav(detail.id, detail.name)}>
        favourite : <button> {fav ? "💗" : "🤍"}</button>
      </div>
    </div>
  );
}
