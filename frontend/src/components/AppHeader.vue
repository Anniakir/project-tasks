<script setup>
</script>

<template>
  <header>
    <h1>Система учёта задач</h1>
    <nav>
      <router-link to="/">Список</router-link> |
      <router-link to="/new">Создать</router-link> |
      <router-link to="/login">Вход</router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
nav a.router-link-active {
  color: #42b883;
}
</style>