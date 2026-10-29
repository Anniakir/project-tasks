<script setup>
</script>

<template>
  <section>
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
</template>