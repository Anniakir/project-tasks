<script setup>
</script>

<template>
  <section>
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
</template>