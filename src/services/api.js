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

export const createPost = async (body) => {
  try {
    return await api.post("/posts", body);
  } catch (error) {
    console.error({ message: error.message });
  }
};

export const updatePost = async (body) => {
  const { id } = body;
  try {
    return await api.put(`/posts/${id}`, body);
  } catch (error) {
    console.error({ message: error.message });
  }
};
