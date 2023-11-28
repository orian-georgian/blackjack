import PropTypes from "prop-types";
import { PlayerTypes, Statuses } from "../../constants";

import "./Player.scss";

const backCard =
  "https://clipart-library.com/new_gallery/222662_playing-card-png.png";

export default function Player({ type, name, score, status, currentCards }) {
  const statusColor =
    (status === Statuses.Playing && type === PlayerTypes.Player) ||
    (status === Statuses.Waiting && type === PlayerTypes.Dealer)
      ? "pulse green"
      : status === Statuses.Playing || status === Statuses.Waiting
      ? "red"
      : "gray";

  return (
    <div
      data-testid={`${type}`}
      className="bj-player flex-box flex-column gap-3"
    >
      <div className="bj-score flex-box gap-2 align-center">
        <div className={`circle ${statusColor}`} />
        <div>
          {name} ({score} points)
        </div>
      </div>
      <div className="bj-cards">
        {currentCards.map((card, i) => {
          return (
            <div
              className="bj-card"
              key={card.image}
              style={{
                left: i * 40,
              }}
            >
              <img
                className="card-image"
                alt="Playing card number"
                src={
                  type === PlayerTypes.Dealer &&
                  (status === Statuses.Playing || status === Statuses.Busted) &&
                  i === 0
                    ? backCard
                    : card.image
                }
                loading="progressive"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["player", "dealer"]),
};

Player.defaultProps = {
  type: "default",
};
