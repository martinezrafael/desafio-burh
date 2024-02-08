<template>
  <div class="post__created">
    <div class="post__header">
      <span class="post__user">Usuário:{{ userId }}</span>
      <span class="post__number">Post número: {{ id }}</span>
    </div>
    <div class="post__content">
      <h2 class="post__content__title">{{ title }}</h2>
      <p class="post__content___body">
        {{ body }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  userId: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  id: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
</script>
