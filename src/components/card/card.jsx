import { Link } from "react-router-dom";
import "./card.css";

export default function Card(characters, { children, ...attr }) {
  const character = characters.characters;
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
      <div style={{ alignSelf: "flex-end" }} onClick={() => characters.handlefav(character.id)}>
        favourite : <button> {characters.findfavourite(character.id) ? "💗" : "🤍"}</button>
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
      <div style={{ alignSelf: "flex-end" }} onClick={() => details.handlefav(detail.id)}>
        favourite : <button> {details.findfavourite(detail.id) ? "💗" : "🤍"}</button>
      </div>
    </div>
  );
}
