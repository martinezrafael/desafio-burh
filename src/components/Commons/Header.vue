<template>
  <header class="header">
    <div class="header__container">
      <a class="logo__href" href="/">
        <h1 class="logo">{{ title }}</h1>
      </a>
    </div>
  </header>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
