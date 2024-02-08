<template>
  <section class="posts">
    <div class="posts__list" v-for="post in postsFetched" :key="post.id">
      <Post
        :userId="post.userId"
        :id="post.id"
        :title="post.title"
        :body="post.body"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../../../services/api";
import Post from "../Postagens/Post.vue";

const postsFetched = ref([]);

const handleFetchPosts = async () => {
  try {
    const response = await api.getAllPosts();
    postsFetched.value = response.data;
  } catch (error) {
    console.error(error.message);
  }
};

handleFetchPosts();
</script>
