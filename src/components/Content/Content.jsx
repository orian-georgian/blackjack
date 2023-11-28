import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotFound, Game, Statistics, Rules } from "../../pages";
import { GameProvider } from "../../contexts";

const queryClient = new QueryClient();

export default function Content() {
  return (
    <div className="bj-content" data-testid="content">
      <GameProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route exact path="/" Component={Game} />
            <Route exact path="/statistics" Component={Statistics} />
            <Route exact path="/rules" Component={Rules} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </QueryClientProvider>
      </GameProvider>
    </div>
  );
}
