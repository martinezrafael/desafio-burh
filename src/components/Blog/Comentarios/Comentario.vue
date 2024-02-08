<template>
  <div class="comment">
    <div class="comment__header">
      <span>{{ PostId }}</span>
      <span>{{ id }}</span>
      <span class="post__user">Email:{{ email }}</span>
    </div>
    <div class="comment__content">
      <h2 class="post__content__title">{{ name }}</h2>
      <p class="post__content___body">
        {{ body }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  PostId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  id: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
});
</script>
