//criar um formulario para que o usuário crie um post //secao de formulario

<template>
  <section class="post__create">
    <div class="post__create-container">
      <div class="post__create-cta" v-if="!postEditing">
        <h2 class="post__title">
          Faça uma publicação no seu blog agora mesmo!
        </h2>
        <p class="post__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          tempora iste praesentium. Dolor veniam recusandae animi dicta quam
          quos ex? Sit officia architecto cupiditate esse reprehenderit quo
          dolorum autem voluptatem.
        </p>
        <button class="post__create-button" @click="startEditingPost">
          Escrever Publicação
        </button>
      </div>
      <div class="post__form-wrapper" v-else>
        <h2 class="post__title">Oba! Que legal que você decidiu postar!</h2>
        <p class="post__description">
          Dica: Escreva sobre algo que você gosta muito! Música, Cinema,
          Restaurantes, etc.
        </p>
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
            ></textarea>
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
};

const userId = ref(null);
const title = ref("");
const body = ref("");

const postCreated = ref({});

const handleSubmit = async () => {
  try {
    const payload = {
      title: title.value,
      body: body.value,
      userId: userId.value,
    };
    const response = await api.createPost(payload);
    postCreated.value = response.data;

    title.value = "";
    body.value = "";
    userId.value = "";

    console.log(postCreated.value);
  } catch (error) {
    console.error({ message: error.message });
  }
};
</script>

<style scoped>
.post__create {
  background-image: url("../../../assets/image/bg/bg-intro.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  margin-bottom: 40px;
  padding: 40px 0px;
  width: 100%;
}

.post__create-container {
  max-width: 90%;
  margin: auto;
}

.post__title {
  font-family: "Poppins", sans-serif;
  line-height: 1.2;
  margin-bottom: 12px;
  font-size: 32px;
  max-width: 600px;
}

.post__description {
  font-size: 20px;
  line-height: 1.5;
  max-width: 600px;
  margin-bottom: 12px;
}

.post__create-button {
  background-image: linear-gradient(
    180deg,
    rgba(119, 54, 255, 1),
    rgba(81, 0, 252, 1)
  );
  cursor: pointer;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 1px #ddd;
  color: #f9eeff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 24px 32px;

  transition: all ease-in-out 0.3s;
}

.post__create-button:hover {
  background-image: linear-gradient(
    90deg,
    rgba(49, 16, 120, 1),
    rgba(81, 0, 252, 1)
  );
  cursor: pointer;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 1px #ddd;
  color: #f9eeff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 24px 32px;
}

.post__form {
  width: 100%;
}

.post__form-row {
  margin-bottom: 12px;
  width: 100%;
}

.post__form-label {
  font-size: 18px;
  margin-bottom: 4px;
  display: block;
}

.post__form-textinput {
  border: 1px solid #cbb3ff;
  border-radius: 8px;
  height: 52px;
  padding: 8px;
  width: 100%;
}

.post__form-textinput:focus,
.post__form-textarea:focus {
  background: #cbb3ff;
}

.post__form-textarea {
  border: 1px solid #cbb3ff;
  border-radius: 8px;
  height: 120px;
  padding: 8px;
  width: 100%;
}

.post__form-submit {
  background-color: rgba(119, 54, 255, 1);
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 1px #ddd;
  color: #f9eeff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 4px;
  padding: 24px 32px;
  width: 100%;
}

.post__form-cancel {
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 1px #ddd;
  color: #414141;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 24px 32px;
  width: 100%;
}

@media screen and (min-width: 800px) {
  .post__create {
    height: 100vh;
  }

  .post__form-rowbtn {
    display: flex;
    gap: 20px;
  }
}
</style>
