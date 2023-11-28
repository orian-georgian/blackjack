import { Button } from "../../components";
import { useGame } from "../../hooks";
import { Statuses } from "../../constants";

import "./Welcome.scss";

export default function Welcome() {
  const { dispatch } = useGame();

  const handleStartPlaying = () => {
    dispatch({ type: "CHANGE_STATUS", payload: Statuses.Playing });
  };

  return (
    <section data-testid="welcome" className="bj-welcome flex-box flex-column">
      <h1 className="heading-1">Welcome to Anna's Blackjack Extravaganza!</h1>
      <p className="paragraph">
        Join Anna, your dynamic Blackjack dealer, for a thrilling card
        experience where every flip could be your winning moment! Luck is on
        your side, skill meets strategy, and exclusive rewards await. It's not
        just a game; it's a community where every win is celebrated. Feel the
        rush of the game as you challenge the dealer, with each card dealt
        holding the potential to turn the tables in your favor.
      </p>
      <p className="paragraph">
        Let Anna guide you through the nuances of the game, turning every move
        into a strategic masterpiece. Winning becomes an art form, and Anna is
        here to help you perfect it. Ready for an unforgettable experience? Anna
        is dealing, the cards are ready, and your seat at the Blackjack table
        awaits.
      </p>
      <Button
        testId="lets-play"
        className="bj-play-button"
        size="large"
        shape="rounded"
        variant="fire"
        text="Let's play"
        onClick={handleStartPlaying}
      />
    </section>
  );
}
