<template>
  <section class="post__create">
    <div class="post__create-container">
      <div class="post__create-cta" v-if="!postEditing">
        <h2 class="post__title">
          Faça uma publicação no seu blog agora mesmo!
        </h2>
        <p class="post__description">
          Não deixe a falta de inspiração te deter! Escreva agora mesmo para o
          seu blog. Escolha um tópico relevante, estruture suas ideias e revise
          com cuidado. Seus leitores estão esperando por você!
        </p>
        <button class="post__create-button" @click="startEditingPost">
          Escrever Publicação
        </button>
      </div>
      <div class="post__form-wrapper" v-else>
        <div>
          <h2 class="post__title">Oba! Que legal que você decidiu postar!</h2>
          <p class="post__description">
            Dica: Pense em algo que você adora, seja música, cinema,
            restaurantes ou qualquer outro assunto que te fascine. Afinal,
            escrever sobre o que gostamos faz toda a diferença!
          </p>
        </div>
        <form @submit.prevent="handleSubmit" class="post__form">
          <div class="post__form-row">
            <label class="post__form-label" for="userId">Usuário</label>
            <input
              class="post__form-textinput"
              type="text"
              id="userId"
              v-model="userId"
              required
            />
          </div>
          <div class="post__form-row">
            <label class="post__form-label" for="postTitle">Título</label>
            <input
              class="post__form-textinput"
              type="text"
              id="postTitle"
              v-model="title"
              required
            />
          </div>
          <div class="post__form-row">
            <label class="post__form-label" for="postContent">Conteúdo</label>
            <textarea
              class="post__form-textarea"
              name="content"
              id="postContent"
              v-model="body"
              required
              maxlength="200"
              placeholder="Máximo 200 caracteres"
              @input="countCharacters"
            ></textarea>
            <p class="post__form-countCarachters">
              {{ sizeText }} caracteres digitados
            </p>
          </div>
          <div class="post__form-row post__form-rowbtn">
            <button class="post__form-submit" type="submit">Publicar</button>
            <button class="post__form-cancel" @click="stopEditingPost">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../../../services/api";

const postEditing = ref(false);

const startEditingPost = () => {
  postEditing.value = true;
};

const stopEditingPost = () => {
  if (postEditing) {
    postEditing.value = false;
  }
  title.value = "";
  body.value = "";
  userId.value = "";
};

const userId = ref(null);
const title = ref("");
const body = ref("");

const sizeText = ref(0);

const countCharacters = () => {
  sizeText.value = body.value.length;
};

const postCreated = ref({});

const handleSubmit = async () => {
  try {
    const payload = {
      title: title.value,
      body: body.value,
      userId: parseInt(userId.value),
    };
    const response = await api.createPost(payload);
    postCreated.value = response;

    title.value = "";
    body.value = "";
    userId.value = "";

    postEditing.value = false;
  } catch (error) {
    console.error({ message: error.message });
  }
};
</script>

<style src="./posts.scss" lang="scss" scoped></style>
