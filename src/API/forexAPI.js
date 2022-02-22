import { FOREX_API_URL } from "../components/consts";
import { axiosGet } from "../utils/utils";

export const getForex = async (callback) => {
  await axiosGet(FOREX_API_URL, {}, callback);
};
