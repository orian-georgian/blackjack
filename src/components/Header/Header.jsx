import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import "./Header.scss";

const navs = [
  {
    text: "Game",
    path: "/",
  },
  {
    text: "Statistics",
    path: "/statistics",
  },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => () => {
    navigate(path);
  };

  return (
    <header
      data-testid="header"
      className="bj-header flex-box flex-wrap max-content-width align-center gap-1"
    >
      <img className="bj-logo" src={logo} alt="Blackjack logo" loading="lazy" />
      <nav className="bj-navigation">
        <ul className="navigation-list flex-box list-style-none">
          {navs.map(({ text, path }) => (
            <li
              className={`list-item ${
                path === location.pathname ? "selected" : "unselected"
              }`}
              key={path}
              onClick={handleClick(path)}
            >
              {text}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
