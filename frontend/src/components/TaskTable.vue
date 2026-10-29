<script setup>
// Объявляем обязательный пропс items
defineProps({
  items: { type: Array, required: true }
})

const statusLabels = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Выполнена',
  Cancelled: 'Отменена'
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Номер</th>
        <th>Тема</th>
        <th>Проект</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <!-- Таблица сама циклом выводит то, что ей передали -->
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.number }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.projectId }}</td>
        <td>{{ statusLabels[item.status] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 700px;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
</style>