<template>
  <section class="posts">
    <div class="posts__container">
      <h2 class="posts_list-title">Feed</h2>
      <div class="posts__list" v-for="post in postsFetched" :key="post.id">
        <Post
          :userId="post.userId"
          :postId="post.id"
          :postTitle="post.title"
          :postBody="post.body"
          :commentsData="commentsFetched[post.id] || []"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as api from "../../../services/api";
import Post from "./Post.vue";

const postsFetched = ref([]);
const commentsFetched = ref([]);

const handleFetchPosts = async () => {
  try {
    const response = await api.getAllPosts();
    postsFetched.value = response;
    for (const post of postsFetched.value) {
      const comments = await api.getCommentsPost(post.id);
      commentsFetched.value[post.id] = comments.data;
    }
  } catch (error) {
    console.error({ message: error.message });
  }
};

onMounted(() => {
  handleFetchPosts();
});
</script>

<style src="./posts.scss" lang="scss" scoped></style>
