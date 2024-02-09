<template>
  <Header :title="'blog'" />
  <Posts />
</template>

<script setup>
import Header from "../src/components/Commons/Header.vue";
import Posts from "../src/components/Blog/Postagens/Posts.vue";
</script>

<style scoped></style>
