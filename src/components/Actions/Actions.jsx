import { Button } from "../../components";
import { useGame } from "../../hooks";
import { Statuses } from "../../constants";
import { getMessageByStatus } from "../../utils";

import "./Actions.scss";

export default function Actions() {
  const {
    state: { status, player, dealer },
    dispatch,
  } = useGame();
  const isPlayerTurn = status === Statuses.Playing;
  const isDealerTurn = status === Statuses.Waiting;
  const isPlayAgainVisible =
    status === Statuses.Busted ||
    status === Statuses.Winner ||
    status === Statuses.Lost ||
    status === Statuses.Tie;
  const isStandDisabled =
    (isPlayerTurn && player.score < 17) || (isDealerTurn && dealer.score < 17);

  const handleHit = () => {
    dispatch({ type: "HIT_PLAYER" });
  };

  const handleStand = () => {
    dispatch({ type: "STAND_PLAYER" });
  };

  const handlePlayAgain = () => {
    dispatch({ type: "INITIALIZE_GAME" });
  };

  return (
    <div data-testid="actions" className="bj-actions">
      <p data-testid="message" className="bj-message mt-0">
        {getMessageByStatus(status)}
      </p>
      <div className="bj-buttons flex-box flex-wrap gap-2">
        <Button
          testId="hit-button"
          visible={isPlayerTurn || isDealerTurn}
          variant="fire"
          shape="rounded"
          text="Hit"
          onClick={handleHit}
        />
        <Button
          testId="stand-button"
          visible={isPlayerTurn || isDealerTurn}
          shape="rounded"
          text="Stand"
          disabled={isStandDisabled}
          onClick={handleStand}
        />
        <Button
          testId="play-again-button"
          visible={isPlayAgainVisible}
          variant="fire"
          shape="rounded"
          text="Play again"
          onClick={handlePlayAgain}
        />
      </div>
    </div>
  );
}
