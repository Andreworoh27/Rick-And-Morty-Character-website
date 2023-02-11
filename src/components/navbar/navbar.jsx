import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav>
      <div className="navbar-title-container">
        <Link to={"/"} className="title">
          {" "}
          Rick And Morty
        </Link>
        <div>Character List Website</div>
      </div>
      <div className="navbar-content-container">
        <Link to={"/"} className="navbar-content" style={{
        }}>
          Home
        </Link>
        <Link to={"/favourite"} className="navbar-content" style={{
            marginLeft:"10%"
        }}>
          Favourite
        </Link>
      </div>
    </nav>
  );
}
