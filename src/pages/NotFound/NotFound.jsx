import pageNotFound from "../../assets/images/page-not-found.png";

import "./NotFound.scss";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="bj-page-not-found flex-box justify-center align-center"
    >
      <img
        className="bj-image"
        src={pageNotFound}
        alt="Page not found"
        loading="lazy"
      />
    </div>
  );
}
