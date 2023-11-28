import PropTypes from "prop-types";
import { Statuses } from "../../constants";

import "./Badge.scss";

export default function Badge({ text, type }) {
  return <span className={`badge ${type}`}>{text}</span>;
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    Statuses.Busted,
    Statuses.Winner,
    Statuses.Lost,
    Statuses.Tie,
  ]),
};

Badge.defaultProps = {
  text: "Badge",
};
