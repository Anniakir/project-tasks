<script setup>
import { ref } from 'vue'

// Какой экран показываем сейчас: 'list' | 'new' | 'login'
const screen = ref('list')

// Тестовые данные — как будто пришли с сервера
const items = [
  { id: 1, number: 'TASK-2026-0001', title: 'Подготовить смету по проекту', projectId: 2, status: 'New' },
  { id: 2, number: 'TASK-2026-0002', title: 'Согласовать планировку', projectId: 1, status: 'InProgress' }
]

// Человеческие подписи для статусов
const statusLabels = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Выполнена',
  Cancelled: 'Отменена'
}
</script>

<template>
  <header>
    <h1>Система учёта задач</h1>
    <nav>
      <button type="button" @click="screen = 'list'">Список</button>
      <button type="button" @click="screen = 'new'">Создать</button>
      <button type="button" @click="screen = 'login'">Вход</button>
    </nav>
  </header>

  <main>

    <section v-if="screen === 'list'">
      <h2>Задачи</h2>
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
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.number }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.projectId }}</td>
            <td>{{ statusLabels[item.status] }}</td>
          </tr>
        </tbody>
      </table>
    </section>


    <section v-else-if="screen === 'new'">
      <h2>Новая задача</h2>
      <form @submit.prevent>
        <div>
          <label for="title">Тема, 5–80 символов</label>
          <input id="title" name="title" autofocus />
        </div>

        <div>
          <label for="projectId">Номер проекта</label>
          <input id="projectId" name="projectId" type="number" />
        </div>

        <div>
          <label for="description">Описание, 10–500 символов</label>
          <textarea id="description" name="description"></textarea>
        </div>

        <button type="submit">Создать</button>
      </form>
    </section>


    <section v-else-if="screen === 'login'">
      <h2>Вход в систему</h2>
      <form @submit.prevent>
        <div>
          <label for="login">Логин</label>
          <input id="login" name="login" autocomplete="username" />
        </div>

        <div>
          <label for="password">Пароль</label>
          <input id="password" name="password" type="password" autocomplete="current-password" />
        </div>

        <button type="submit">Войти</button>
      </form>
    </section>
  </main>
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

nav button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

main {
  padding: 1rem;
}

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

form div {
  margin-bottom: 0.8rem;
}

label {
  display: block;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  max-width: 400px;
  padding: 0.4rem;
  font-size: 1rem;
}

textarea {
  min-height: 80px;
}

button[type="submit"] {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>