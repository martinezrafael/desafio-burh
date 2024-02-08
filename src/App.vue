<template>
  <h1>Blog Burh</h1>
  <Post :userId="1" :id="1" title="Título do post" body="Conteúdo do post" />
</template>

<script setup>
import { ref } from "vue";
import * as api from "../src/services/api";
import Post from "./components/Blog/Postagens/Post.vue";

const postsFetched = ref([]);
const user = ref(1);
const postId = ref(1);

const handleFetchData = async () => {
  try {
    const response = await api.getAllPosts();
    postsFetched.value = response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const handleSubmitCreate = async () => {
  try {
    const bodyCreate = {
      title: "Teste 2",
      body: "Teste do Rafael numero 2",
      userId: 2,
    };
    const response = await api.createPost(bodyCreate);
    postsFetched.value.push(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

const handlesubmitUpdate = async () => {
  try {
    const bodyUpdate = {
      id: 101,
      title: "mudou o titulo",
      body: "mudou o body",
      userId: 1,
    };
    await api.updatePost(bodyUpdate);
  } catch (error) {
    console.error(error.message);
  }
};

const handleDeletePost = async (postId) => {
  try {
    await api.deletePost(postId);
    console.log("Post Excluído com sucesso");
    handleFetchData();
  } catch (error) {
    console.error(error.message);
  }
};

const handleFilterUserPosts = async () => {
  try {
    const response = await api.filterUserPosts(user.value);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

const handleFetchCommentsPost = async () => {
  try {
    const response = await api.getCommentsPost(postId.value);
  } catch (error) {
    console.error(error.message);
  }
};
handleFetchData();
handleFetchCommentsPost();
</script>

<style scoped></style>
