import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Erro ao obter os posts: status: ${response.status}`);
    }
  } catch (error) {
    console.error({ message: error.message });
    throw new Error(`Erro ao obter os posts: ${error.message}`);
  }
};

export const createPost = async (body) => {
  try {
    if (!body || !body.title || !body.body || !body.userId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (typeof body.userId !== "number") {
      throw new Error("userId deve ser um número");
    }

    const response = await api.post("/posts", body);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Erro ao criar o post: status: ${response.status}`);
    }
  } catch (error) {
    console.error({ message: error.message });
    throw new Error(`Erro ao criar o post: ${error.message}`);
  }
};

export const updatePost = async (id, body) => {
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error("Id do post inválido");
    }

    if (!body || !body.title || !body.body || !body.userId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (typeof body.userId !== "number") {
      throw new Error("userId deve ser um número");
    }

    const response = await api.put(`/posts/${id}`, body);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Erro ao atualizar o post: status: ${response.status}`);
    }
  } catch (error) {
    console.error({ message: error.message });
    throw new Error(`Erro ao atualizar o post: ${error.message}`);
  }
};

export const deletePost = async (id) => {
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID do post inválido");
    }
    const response = await api.delete(`/posts/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Erro ao excluir o post: status: ${response.status}`);
    }
  } catch (error) {
    console.error({ message: error.message });
    throw new Error(`Erro ao excluir o post: ${error.message}`);
  }
};

export const getCommentsPost = async (id) => {
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID do post inválido");
    }
    const response = await api.get(`/posts/${id}/comments`);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        `Erro ao recuperar os comentários do post: status: ${response.status}`
      );
    }
  } catch (error) {
    console.error({ message: error.message });
    throw new Error(
      `Erro ao recuperar os comentários do post: status: ${response.status}`
    );
  }
};
