<template>
  <section class="post__create">
    <div class="post__create__wrapper" v-if="!creatingPost">
      <h2 class="post__create___title">Crie seu post agora mesmo</h2>
      <button class="post__create___btn" @click="createPost">
        Criar um Post
      </button>
    </div>
    <div v-else>
      <form class="post__create___form" @submit.prevent="handleSubmit">
        <div>
          <label for="postUserId">Id do Usuário</label>
          <input id="postUserId" type="text" v-model="postUserId" />
        </div>
        <div>
          <label for="postTitle">Título</label>
          <input id="postTitle" type="text" v-model="postTitle" />
        </div>
        <div>
          <label for="postBody">Conteúdo</label>
          <textarea name="postBody" id="postBody" v-model="postBody"></textarea>
        </div>
        <button type="submit">Criar Post</button>
        <button @click="cancelEditPost">Cancelar</button>
      </form>
      <div v-if="postsCreated.length > 0">
        <postCreated
          v-for="post in postsCreated"
          :key="post.id"
          :userId="post.userId"
          :id="post.id"
          :title="post.title"
          :body="post.body"
        />
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
