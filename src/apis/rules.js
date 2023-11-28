import axios from "axios";
import { GeneralConstants } from "../constants";

const fetchRules = async () => {
  try {
    const response = await axios.get(`${GeneralConstants.baseUrl}/rules`);

    return response.data;
  } catch {
    return [];
  }
};

const rulesApis = { fetchRules };

export default rulesApis;
