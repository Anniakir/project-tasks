<script setup>
import { items } from '../taskStore.js'
import TaskTable from '../components/TaskTable.vue'
</script>

<template>
  <section>
    <h2>Задачи</h2>
    <!-- Передаём массив в таблицу через props -->
    <TaskTable :items="items" />
  </section>
</template>