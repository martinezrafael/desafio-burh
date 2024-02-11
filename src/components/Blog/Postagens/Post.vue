<template>
  <div class="post">
    <div class="post__header">
      <span class="post__user">Usuário:{{ userId }}</span>
      <span class="post__number">Post número: {{ id }}</span>
    </div>
    <div class="post__content">
      <h2 class="post__content__title">{{ title }}</h2>
      <p class="post__content___body">
        {{ body }}
      </p>
    </div>
    <DeletarPost :id="id" />
    <div class="post__comments">
      <div v-if="!showComments">
        <button class="post__coments-btn" @click="openComments">
          Ler Comentários
        </button>
      </div>
      <div v-else>
        <button @click="hideComments">Esconder comentários</button>
        <Comentario
          v-for="comment in commentsFetched[id]"
          :key="comment.id"
          :email="comment.email"
          :name="comment.name"
          :body="comment.body"
          :PostId="comment.postId"
          :id="comment.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import DeletarPost from "./DeletarPost.vue";
import Comentario from "../Comentarios/Comentario.vue";
import * as api from "../../../services/api";

const commentsFetched = ref([]);

const handleFetchComments = async (postId) => {
  try {
    const response = await api.getCommentsPost(postId);
    commentsFetched.value[postId] = response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const showComments = ref(false);

const openComments = () => {
  showComments.value = true;
};

const hideComments = () => {
  showComments.value = false;
};

const props = defineProps({
  userId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  id: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

handleFetchComments(props.id);
</script>

<style lang="scss" scoped></style>
