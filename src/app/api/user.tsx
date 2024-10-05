/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../../axios";
interface ApiResponse {
  success: boolean;
  msg: string;
  data: object;
}

export const apiGetCurrent = async (): Promise<ApiResponse | undefined> => {
  return axios({
    url: "/user/",
    method: "GET",
  });
};
