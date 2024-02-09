<template>
  <section class="post__create-intro">
    <div class="post__create-wrapper" v-if="!creatingPost">
      <h2 class="post__create-title">Crie seu post agora mesmo</h2>
      <button class="post__create-btn" @click="createPost">
        Criar um Post
      </button>
    </div>
    <div class="post__create-formWrapper" v-else>
      <form class="post__create-form" @submit.prevent="handleSubmit">
        <div class="post__create-formRow">
          <label class="post__create-label" for="postUserId"
            >Id do Usuário</label
          >
          <input
            id="postUserId"
            class="post__create-input"
            type="text"
            v-model="postUserId"
            required
          />
        </div>
        <div class="post__create-formRow">
          <label class="post__create-label" for="postTitle">Título</label>
          <input
            id="postTitle"
            class="post__create-input"
            type="text"
            v-model="postTitle"
            required
          />
        </div>
        <div class="post__create-formRow">
          <label class="post__create-label" for="postBody">Conteúdo</label>
          <textarea
            id="postBody"
            class="post__create-textarea"
            v-model="postBody"
            required
          ></textarea>
        </div>
        <div class="post__create-buttons">
          <button type="submit" class="post__create-submit">Salvar</button>
          <button @click="cancelEditPost" class="post__create-cancel">
            Cancelar
          </button>
        </div>
      </form>
      <div v-if="postsCreated.length > 0" class="post__created">
        <h2 class="post__created__message">Post Criado com sucesso! 🎉</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../../../services/api";
import PostCreated from "../Postagens/PostCreated.vue";

const creatingPost = ref(false);

const createPost = () => {
  creatingPost.value = true;
};

const cancelEditPost = () => {
  creatingPost.value = false;
};

const postsCreated = ref([]);

const postUserId = ref("");
const postTitle = ref("");
const postBody = ref("");

const handleSubmit = async () => {
  try {
    const body = {
      title: postTitle.value,
      body: postBody.value,
      userId: parseInt(postUserId.value),
    };

    const response = await api.createPost(body);

    postsCreated.value.push(response.data);

    postUserId.value = "";
    postTitle.value = "";
    postBody.value = "";
  } catch (error) {
    console.error(error.message);
  }
};
</script>
