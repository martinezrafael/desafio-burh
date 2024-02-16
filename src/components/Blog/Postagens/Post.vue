<template>
  <div class="post">
    <div class="post__header">
      <span class="post__user">Id Usuário:{{ userId }}</span>
      <span class="post__id">Post: {{ postId }}</span>
    </div>
    <div class="post__content">
      <span class="post__delete-message" v-if="!postDeleted"></span>
      <span class="post__delete-message" v-else>
        Post {{ postId }} deletado com sucesso!
      </span>
      <h3 class="post__title">{{ postTitle }}</h3>
      <p class="post__body">
        {{ postBody }}
      </p>
      <div class="post__edit" v-if="!editingPost"></div>
      <div class="post__edit" v-else>
        <h4 class="post__edit-title">Formulário de Edição</h4>
        <form @submit.prevent="handleSubmit" class="form__edit">
          <div class="form__edit-row">
            <label class="form__edit-label" for="postTitle">Título</label>
            <input
              class="form__edit-textinput"
              type="text"
              id="postTitle"
              v-model="newTitle"
              required
            />
          </div>
          <div class="form__edit-row">
            <label class="form__edit-label" for="postContent">Conteúdo</label>
            <textarea
              class="form__edit-textarea"
              name="content"
              id="postContent"
              v-model="newBody"
              required
            ></textarea>
          </div>
          <button class="form__edit-submit" @click="updatePost">
            Publicar
          </button>
          <button class="form__edit-cancel" @click="cancelEditPost">
            Cancelar
          </button>
        </form>
      </div>
    </div>
    <div class="post__footer" v-if="!openComments">
      <button class="post__btn-edit" @click="editPost">Editar</button>
      <button class="post__btn-del" @click="deletePost">Deletar</button>
      <button class="post__btn-comments" @click="showComments">
        Ler Comentários
      </button>
    </div>
    <div class="post__comments" v-else>
      <h2 class="post__comments-title">Comentários</h2>
      <div class="post__comments-list">
        <button class="post__btn-comments" @click="hideComments">
          Esconder Comentários
        </button>
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="post__comments-item"
        >
          <div class="post__coments-header">
            <span class="post__coments-id"
              >Id Comentário: {{ comment.id }}</span
            >
          </div>
          <div class="post__coments-content">
            <h4 class="post__coments-name">{{ comment.name }}</h4>
            <p class="post__comments-body">
              {{ comment.body }}
            </p>
          </div>
          <div class="post__comments-footer">
            <a
              :href="`mailto:${formatLowerCase(comment.email)}`"
              class="post__comments-email"
            >
              {{ formatLowerCase(comment.email) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import * as api from "../../../services/api";
import { formatLowerCase } from "../../../helpers/formatLowerCase";

const props = defineProps({
  userId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  postId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  commentsData: {
    type: Array,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
});

const openComments = ref(false);
const comments = ref([]);
const postDeleted = ref(false);
const editingPost = ref(false);
const newTitle = ref(props.postTitle);
const newBody = ref(props.postBody);

const showComments = () => {
  openComments.value = true;
  comments.value = props.commentsData;
};

const hideComments = () => {
  openComments.value = false;
};

const deletePost = async () => {
  try {
    await api.deletePost(props.postId);
    postDeleted.value = true;
    setTimeout(() => {
      postDeleted.value = false;
    }, 3000);
    editingPost.value = false;
  } catch (error) {
    console.error({ message: error.message });
  }
};

const editPost = () => {
  editingPost.value = true;
};

const cancelEditPost = () => {
  editingPost.value = false;
};

const updatePost = async () => {
  try {
    const payload = {
      id: props.postId,
      title: newTitle.value,
      body: newBody.value,
      userId: props.userId,
    };
    const response = await api.updatePost(props.postId, payload);
    console.log(response);
    newTitle.value = "";
    newBody.value = "";
    editingPost.value = false;
  } catch (error) {
    console.error({ message: error.message });
  }
};
</script>

<style src="./posts.scss" lang="scss" scoped></style>
