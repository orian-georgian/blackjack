import dealer from "../../assets/images/dealer.png";
import { Statuses } from "../../constants";
import { useGame } from "../../hooks";
import { Welcome, Table } from "../../components";

import "./Game.scss";

export default function Game() {
  const {
    state: { status },
  } = useGame();

  return (
    <main
      data-testid="game"
      className="bj-game flex-box max-content-width gap-3"
    >
      <div className="bj-board">
        {status === Statuses.Welcome && <Welcome />}
        {status !== Statuses.Welcome && <Table />}
      </div>
      <div data-testid="dealer-image" className="bj-dealer text-center">
        <img className="bj-dealer-image" src={dealer} alt="Cute dealer girl" />
      </div>
    </main>
  );
}
