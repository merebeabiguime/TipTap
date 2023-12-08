import { myAxios } from "../axios/axios";

export function useFetchComment() {
  const addComment = async (jsonData) => {
    const response = await myAxios.post("/comment/addComment", jsonData);
    return response.data;
  };

  return { addComment };
}
