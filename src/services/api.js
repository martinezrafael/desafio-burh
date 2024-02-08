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

export const updatePost = async (id, body) => {
  try {
    return await api.put(`/posts/${id}`, body);
  } catch (error) {
    console.error("Erro ao atualizar o post:", error.message);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    return await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error({ message: error.message });
  }
};

export const filterUserPosts = async (userId) => {
  try {
    return await api.get(`/posts?userId=${userId}`);
  } catch (error) {
    console.error({ message: error.message });
  }
};

export const getCommentsPost = async (id) => {
  try {
    return await api.get(`/posts/${id}/comments`);
  } catch (error) {
    console.error({ message: error.message });
  }
};
