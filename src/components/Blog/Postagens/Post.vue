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
      <button class="post__btn post__btn-edit" @click="editPost">Editar</button>
      <button class="post__btn post__btn-del" @click="deletePost">
        Deletar
      </button>
      <button class="post__btn post__btn-comments" @click="showComments">
        Ler Comentários
      </button>
    </div>
    <div class="post__comments" v-else>
      <h2 class="post__comments-title">Comentários</h2>
      <div class="post__comments-list">
        <button class="post__btn post__btn-comments" @click="hideComments">
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
            <h4 class="post__coments-name">{{ comment.title }}</h4>
            <p class="post__comments-body">
              {{ comment.body }}
            </p>
          </div>
          <div class="post__comments-footer">
            <a href="#" class="post__comments-email">
              {{ comment.email }}
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
    await api.updatePost(props.postId, payload);
    newTitle.value = "";
    newBody.value = "";
    editingPost.value = false;
  } catch (error) {
    console.error({ message: error.message });
  }
};
</script>

<style scoped>
.post {
  background: #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 1px #f5f5f5;
  margin-bottom: 24px;
  padding: 6px;
  width: 100%;
}

.post__header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 20px 0px;
}

.post__user,
.post__id,
.post__coments-id {
  background-color: #cbb3ff;
  color: #915dff;
  padding: 2px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px #915dff;
}

.post__content {
  padding: 20px 0px;
}

.post__title,
.post__comments-title,
.post__edit-title {
  color: #915dff;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
}

.post__body {
  color: #787878;
  font-size: 18px;
  line-height: 24px;
}

.post__footer {
  display: flex;
  align-content: center;
  gap: 10px;
  padding: 20px 0px;
}

.post__btn {
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
}

.post__btn-edit {
  background-color: #915dff;
  color: #e7dcff;
}

.post__btn-del {
  background-color: #cbb3ff;
  color: #915dff;
}

.post__btn-comments {
  background-color: #c9c9c9;
  color: #414141;
}

.post__coments-header {
  padding: 20px 0px;
}

.post__comments-title {
  margin-bottom: 20px;
}

.post__comments-body {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
}

.post__delete-message {
  color: green;
  margin: 12px 0;
  display: inline-block;
}

.form__edit {
  padding: 20px 0;
}

.post__edit-title {
  margin: 20px 0;
}

.form__edit-label {
  display: block;
  margin-bottom: 4px;
  font-size: 18px;
}

.form__edit-textinput,
.form__edit-textarea {
  width: 100%;
}

.form__edit-textinput:focus,
.form__edit-textarea:focus {
  background: #cbb3ff;
}

.form__edit-textinput {
  border: 1px solid #b1b0b5;
  border-radius: 8px;
  font-size: 18px;
  height: 52px;
  padding: 8px;
  width: 100%;
}

.form__edit-textarea {
  border: 1px solid #cbb3ff;
  border-radius: 8px;
  font-size: 18px;
  height: 120px;
  padding: 8px;
  width: 100%;
}

.form__edit-submit,
.form__edit-cancel {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 24px;
}

.form__edit-submit {
  background: #915dff;
  color: #e7dcff;
}

.form__edit-cancel {
  background: #cbb3ff;
  color: #915dff;
}
</style>
