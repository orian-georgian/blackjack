import loader from "../../assets/images/loader.gif";

export default function Loader() {
  return (
    <img
      className="bj-loader"
      src={loader}
      alt="Blackjack loader"
      loading="lazy"
    />
  );
}
