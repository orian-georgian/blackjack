import { useContext } from "react";
import { GameContext } from "../contexts";

// Create a custom hook to use the context
const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default useGame;
