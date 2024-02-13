<template>
  <header class="header">
    <div class="header__container">
      <a class="logo__href" href="/">
        <h1 class="logo">{{ title }}</h1>
      </a>
      <Navigation />
    </div>
  </header>
</template>
<script setup>
import { defineProps } from "vue";
import Navigation from "./Navigation.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.header {
  background-color: #1b1b1b;
  padding: 24px 0px;
}

.header__container {
  max-width: 90%;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: "Poppins", sans-serif;
  font-size: 40px;
  font-weight: 900;
}

.logo__href {
  color: #915dff;
}
</style>
