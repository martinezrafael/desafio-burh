import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export const getAllPosts = async () => {
  try {
    return await api.get("/posts");
  } catch (error) {
    console.error({ message: error.message });
  }
};
