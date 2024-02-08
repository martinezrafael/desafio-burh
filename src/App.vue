<template>
  <h2>{{ postsCreated.title }}</h2>
  <p>{{ postsCreated.body }}</p>
  <span>{{ postsCreated.userId }}</span>

  <h1>Desafio Burh | Frontend</h1>
  <div v-for="post in postsFetched" :key="post.id">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <span>{{ post.userId }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../src/services/api";

const postsFetched = ref([]);
const postsCreated = ref([]);

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
      title: "Teste",
      body: "Teste do Rafael",
      userId: 2,
    };
    const response = await api.createPost(bodyCreate);
    postsCreated.value = response.data;
  } catch (error) {
    console.error(error.message);
  }
};

handleSubmitCreate();
handleFetchData();
</script>

<style scoped></style>
