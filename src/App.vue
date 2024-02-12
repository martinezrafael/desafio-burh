<template>
  <Header :title="'blog'" />
  <FormCriarPost />
  <Posts />
</template>

<script setup>
import Header from "../src/components/Commons/Header.vue";
import FormCriarPost from "./components/Blog/Postagens/FormCriarPost.vue";
import Posts from "../src/components/Blog/Postagens/Posts.vue";
</script>

<style scoped></style>
