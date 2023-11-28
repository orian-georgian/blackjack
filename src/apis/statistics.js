import axios from "axios";
import { GeneralConstants } from "../constants";

const fetchStatistics = async () => {
  try {
    const response = await axios.get(
      `${GeneralConstants.baseUrl}/games/?order=desc&sortBy=createdAt`
    );

    return response.data;
  } catch {
    return [];
  }
};

const saveGameResults = async (game) => {
  try {
    const response = await axios.post(
      `${GeneralConstants.baseUrl}/games`,
      game
    );

    return response.data;
  } catch {
    return null;
  }
};

const statisticsApis = { fetchStatistics, saveGameResults };

export default statisticsApis;
