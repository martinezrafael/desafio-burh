<template>
  <button class="post__btn___delete" @click="handleDelete(id)">
    <img src="../../../assets/sass/image/icons/trash.svg" alt="" />
    Deletar Post
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import * as api from "../../../services/api";

const props = defineProps({
  id: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
});

const handleDelete = async (postId) => {
  try {
    await api.deletePost(postId);
    console.log(`Post ${postId} deletado com sucesso!`);
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style lang="scss" scoped></style>
