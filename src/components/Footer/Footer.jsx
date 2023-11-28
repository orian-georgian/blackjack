import { Link } from "react-router-dom";

import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import twitter from "../../assets/images/twitter.png";
import youtube from "../../assets/images/youtube.png";
import pinterest from "../../assets/images/pinterest.png";
import bjIcon from "../../assets/images/bj-icon.png";

import "./Footer.scss";

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="bj-footer flex-box flex-wrap space-between max-content-width"
    >
      <div className="bj-column">
        <div className="bj-subtitle">Social Media</div>
        <div className="bj-social flex-box gap-1">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img
              className="bj-icon"
              src={facebook}
              alt="Facebook logo"
              loading="lazy"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img
              className="bj-icon"
              src={instagram}
              alt="Instagram logo"
              loading="lazy"
            />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img
              className="bj-icon"
              src={twitter}
              alt="Twitter logo"
              loading="lazy"
            />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <img
              className="bj-icon"
              src={youtube}
              alt="Youtube logo"
              loading="lazy"
            />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
            <img
              className="bj-icon"
              src={pinterest}
              alt="Pinterest logo"
              loading="lazy"
            />
          </a>
        </div>
        <div className="bj-symbol flex-box align-center gap-1">
          <img className="bj-icon" src={bjIcon} alt="Blackjack symbol" />
          <span className="bj-message">Play responsible!</span>
        </div>
      </div>

      <div className="bj-column">
        <div className="bj-subtitle">Stay Safe</div>
        <div className="bj-links flex-box flex-column gap-2">
          <Link to="/player-support">Player Support</Link>
          <Link to="/rules" onClick={goToTop}>
            Game Rules
          </Link>
          <Link to="/cookies">Cookies and Privacy Policy</Link>
        </div>
      </div>
      <div className="bj-column">
        <div className="bj-subtitle">About Us</div>
        <div className="bj-links flex-box flex-column gap-2">
          <Link to="/contact">Contact</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/faq">Questions</Link>
          <Link to="/law">Betting law</Link>
        </div>
      </div>
      <div className="bj-copyright">
        Georgian Orian © 2023. All rights reserved.
      </div>
    </div>
  );
}
