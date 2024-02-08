<template>
  <h1>Desafio Burh | Frontend</h1>
  <div v-for="post in postsFetched" :key="post.id">
    <p>Post:{{ post.id }}</p>
    <p>User: {{ post.userId }}</p>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <button @click="handleDeletePost(post.id)">Excluir Post</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../src/services/api";

const postsFetched = ref([]);

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

handleFetchData();
</script>

<style scoped></style>
