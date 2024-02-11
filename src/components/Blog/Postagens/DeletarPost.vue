<template>
  <div>
    <button class="post__delete-btn" @click="handleDelete">Deletar Post</button>
    <div v-if="postDeleted" class="post__deleted-message">
      O post {{ id }} foi deletado com sucesso!
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import * as api from "../../../services/api";

const props = defineProps({
  id: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
});

const postDeleted = ref(false);

const handleDelete = async () => {
  try {
    const confirmDelete = confirm("Tem certeza que deseja deletar o post?");
    if (confirmDelete) {
      await api.deletePost(props.id);
      postDeleted.value = true;
    } else {
      console.log("Exclusão cancelada pelo usuário.");
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style lang="scss" scoped></style>
