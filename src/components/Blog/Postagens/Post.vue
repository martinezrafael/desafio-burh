<template>
  <div class="post">
    <div class="post__header">
      <span class="post__user">Id Usuário:{{ userId }}</span>
      <span class="post__id">Post: {{ postId }}</span>
    </div>
    <div class="post__content">
      <h3 class="post__title">{{ postTitle }}</h3>
      <p class="post__body">
        {{ postBody }}
      </p>
    </div>
    <div class="post__footer" v-if="!openComments">
      <button class="post__btn post__btn-edit">Editar</button>
      <button class="post__btn post__btn-del">Deletar</button>
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

const showComments = () => {
  openComments.value = true;
  comments.value = props.commentsData;
};

const hideComments = () => {
  openComments.value = false;
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
.post__comments-title {
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
</style>
