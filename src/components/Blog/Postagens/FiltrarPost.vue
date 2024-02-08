<template>
  <div>
    <input @change="handleChange" />
    <div v-for="post in postsFiltered" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import * as api from "../../../services/api";

const postsFiltered = ref([]);

const props = defineProps({
  userId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
});

const handleChange = async () => {
  try {
    const response = await api.filterUserPosts(props.userId);
    postsFiltered.value = response.data;
  } catch (error) {
    console.error(error.message);
  }
};
</script>
