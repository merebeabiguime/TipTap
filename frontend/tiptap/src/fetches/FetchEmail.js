import { myAxios } from "../axios/axios";

export function useFetchEmail() {
  const sendEmail = async (jsonData) => {
    const response = await myAxios.post("/email/send", jsonData);
    console.log("dans fetch email");
    return response.data;
  };

  return { sendEmail };
}
