import { useQuery } from "react-query";
import { StatisticsApis } from "../../apis";
import { Badge, Loader } from "../../components";

import "./Statistics.scss";

const formatDate = (date) => {
  const today = new Date(date);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(today);
  let month = new Intl.DateTimeFormat("en", { month: "short" }).format(today);
  let day = new Intl.DateTimeFormat("en", { day: "numeric" }).format(today);
  let hours = today.getHours().toString().padStart(2, "0");
  let minutes = today.getMinutes().toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes}`;
};

export default function Statistics() {
  const { data, error, isLoading } = useQuery(["games"], () =>
    StatisticsApis.fetchStatistics()
  );

  if (error) {
    return "Damn, this is not good!";
  }

  return (
    <main className="bj-statistics flex-box flex-column max-content-width">
      <h1 className="heading-1">
        Blackjack chronicles: Facing fate with dealer Anna
      </h1>
      <p className="paragraph">
        Embark on a thrilling blackjack adventure with the formidable dealer
        Anna. Each game unfolds as a suspenseful chapter, showcasing strategic
        clashes and unpredictable outcomes. Victories, defeats, and draws paint
        a dynamic narrative, creating an exhilarating saga at the blackjack
        table. Stay tuned for more twists and turns in this ongoing tale of
        chance and skill with the indomitable Anna.
      </p>
      <table className="bj-games-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Score</th>
            <th>Date</th>
            <th>Cards</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr className="bj-loading-row">
              <td colSpan={4}>
                <Loader />
              </td>
            </tr>
          )}
          {data && data.length === 0 && (
            <tr className="bj-loading-row">
              <td colSpan={4}>No data available</td>
            </tr>
          )}
          {data?.map((game) => (
            <tr key={game.id}>
              <td>
                <Badge text={game.status} type={game.status} />
              </td>
              <td>{game.score}</td>
              <td>{formatDate(game.createdAt)}</td>
              <td>
                {game.cards.map((image) => (
                  <img
                    className="bj-game-card"
                    key={image}
                    src={image}
                    alt="Current playing card"
                    loading="lazy"
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
