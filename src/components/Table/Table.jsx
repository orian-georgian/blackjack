import { Player, Actions } from "../../components";
import { useGame } from "../../hooks";
import { Statuses } from "../../constants";
import { StatisticsApis } from "../../apis";

import { useEffect, useCallback } from "react";

import "./Table.scss";

export default function Table() {
  const {
    state: { player, dealer, status },
    dispatch,
  } = useGame();

  const saveGame = useCallback(
    async (newStatus) => {
      if (player.currentCards.length > 0) {
        await StatisticsApis.saveGameResults({
          createdAt: new Date(),
          status: newStatus,
          score: player.score,
          cards: player.currentCards.map(({ image }) => image),
        });
      }
    },
    [player.score, player.currentCards]
  );

  useEffect(() => {
    dispatch({ type: "INITIALIZE_GAME" });
  }, [dispatch]);

  useEffect(() => {
    const playerScore = player.score;
    const dealerScore = dealer.score;
    const isGameOver = status === Statuses.GameOver;
    const isPlaying = status === Statuses.Playing;
    const isNotWinner = status !== Statuses.Winner;

    const handleStatusChange = (newStatus) => {
      saveGame(newStatus);
      dispatch({ type: "CHANGE_STATUS", payload: newStatus });
    };

    if (isPlaying && playerScore > 21) {
      handleStatusChange(Statuses.Busted);
    } else if (
      isNotWinner &&
      (dealerScore > 21 || (isGameOver && playerScore > dealerScore))
    ) {
      handleStatusChange(Statuses.Winner);
    } else if (isGameOver && playerScore < dealerScore) {
      handleStatusChange(Statuses.Lost);
    } else if (isGameOver && playerScore === dealerScore) {
      handleStatusChange(Statuses.Tie);
    }
  }, [player.score, dealer.score, status, dispatch, saveGame]);

  return (
    <section
      data-testid="table"
      className="bj-table flex-box flex-column gap-3 justify-center"
    >
      <Player status={status} {...player} />
      <Actions />
      <Player status={status} {...dealer} />
    </section>
  );
}
