<template>
  <section class="posts">
    <FormCriarPost />
    <div class="posts__list" v-for="post in postsFetched" :key="post.id">
      <div v-if="!updatingPost">
        <Post
          :userId="post.userId"
          :id="post.id"
          :title="post.title"
          :body="post.body"
        />
        <button class="post__edit-btn" @click="editPost(post)">
          Editar Post
        </button>
      </div>
      <div v-else-if="post.id === postBeingEdited.id">
        <span>Post número: {{ post.id }}</span>
        <input type="text" v-model="newTitle" />
        <input type="text" v-model="newBody" />
        <button class="post__edit-btn-save" @click="saveEditedPost(post)">
          Salvar
        </button>
        <button class="post__edit-btn-cancel" @click="cancelEditPost">
          Cancelar
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import * as api from "../../../services/api";
import FormCriarPost from "../Postagens/FormCriarPost.vue";
import Post from "../Postagens/Post.vue";

const postsFetched = ref([]);

const updatingPost = ref(false);
const postBeingEdited = ref(null);

const newTitle = ref("");
const newBody = ref("");

const editPost = (post) => {
  updatingPost.value = true;
  postBeingEdited.value = post;
  newTitle.value = post.title;
  newBody.value = post.body;
};

const saveEditedPost = async (post) => {
  try {
    const body = {
      title: newTitle.value,
      body: newBody.value,
      userId: post.userId,
    };
    await api.updatePost(post.id, body);
    updatingPost.value = false;
    postBeingEdited.value = null;
    newTitle.value = "";
    newBody.value = "";
    await handleFetchPosts();
  } catch (error) {
    console.error(error.message);
  }
};

const cancelEditPost = () => {
  updatingPost.value = false;
  postBeingEdited.value = null;
  newTitle.value = "";
  newBody.value = "";
};

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

<style lang="scss" scoped></style>
