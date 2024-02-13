<template>
  <div class="nav__wrapper">
    <nav class="nav">
      <ul class="nav__list" v-for="menuItem in navItems" :key="menuItem">
        <li class="nav__list-item">
          <a :href="menuItem" class="nav__list-href">{{ menuItem }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
const navItems = ref(["Página Inicial", "Posts", "Usuários"]);
</script>

<style scoped>
.nav,
.nav__list {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav__list-item {
  font-size: 20px;
}

.nav__list-href {
  color: #fff;
  font-weight: 600;
  transition: all ease-in-out 0.3s;
}

.nav__list-href:hover {
  color: #915dff;
  text-decoration: underline;
}
</style>
