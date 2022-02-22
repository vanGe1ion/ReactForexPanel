import { FOREX_API_URL } from "../components/consts";
import { axiosGet } from "../utils/utils";

export const getForex = async (callback) => {
  await axiosGet(
    FOREX_API_URL,
    {
      access_key: process.env.REACT_APP_FIXER_IO_PRIVATE_KEY,
      format: 1,
    },
    callback
  );
};