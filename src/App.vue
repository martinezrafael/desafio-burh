<template>
  <h1>Blog Burh</h1>
  <Posts />
</template>

<script setup>
import { ref } from "vue";
import * as api from "../src/services/api";
import Posts from "../src/components/Blog/Postagens/Posts.vue";

const user = ref(1);
const postId = ref(1);

const handleDeletePost = async (postId) => {
  try {
    await api.deletePost(postId);
    console.log("Post Excluído com sucesso");
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

handleFetchCommentsPost();
</script>

<style scoped></style>
