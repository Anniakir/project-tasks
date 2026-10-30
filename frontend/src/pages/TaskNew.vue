<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addItem } from '../taskStore.js'

const router = useRouter()

// Объект формы
const form = ref({
  title: '',
  projectId: 0,
  description: ''
})

// Объект для ошибок
const errors = ref({
  title: '',
  projectId: '',
  description: ''
})

// Функция срабатывает при нажатии "Создать"
const onCreate = () => {
  // 1. Очищаем старые ошибки
  errors.value = { title: '', projectId: '', description: '' }
  let isValid = true

  // 2. Проверяем тему (5-80 символов)
  const trimmedTitle = form.value.title.trim()
  if (trimmedTitle.length < 5 || trimmedTitle.length > 80) {
    errors.value.title = 'Тема: от 5 до 80 символов'
    isValid = false
  }

  // 3. Проверяем проект (больше нуля)
  if (form.value.projectId <= 0) {
    errors.value.projectId = 'Номер проекта должен быть больше 0'
    isValid = false
  }

  // 4. Проверяем описание (10-500 символов)
  const trimmedDesc = form.value.description.trim()
  if (trimmedDesc.length < 10 || trimmedDesc.length > 500) {
    errors.value.description = 'Описание: от 10 до 500 символов'
    isValid = false
  }

  // 5. Если есть ошибки — останавливаемся
  if (!isValid) return

  // 6. Если всё ок — добавляем в массив
  addItem(trimmedTitle, form.value.projectId, trimmedDesc)

  // 7. Очищаем форму (необязательно, так как мы уходим, но для порядка)
  form.value = { title: '', projectId: 0, description: '' }

  // 8. Переходим на страницу списка
  router.push('/')
}
</script>

<template>
  <section>
    <h2>Новая задача</h2>
    
    <!-- @submit.prevent не дает странице перезагрузиться -->
    <form @submit.prevent="onCreate">
      
      <div class="form-group">
        <label for="title">Тема, 5–80 символов</label>
        <input id="title" v-model="form.title" autofocus />
        <!-- Вывод ошибки, если она есть -->
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="projectId">Номер проекта</label>
        <!-- v-model.number делает так, чтобы значение было числом, а не строкой -->
        <input id="projectId" type="number" v-model.number="form.projectId" />
        <span v-if="errors.projectId" class="error">{{ errors.projectId }}</span>
      </div>

      <div class="form-group">
        <label for="description">Описание, 10–500 символов</label>
        <textarea id="description" v-model="form.description"></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>

      <button type="submit">Создать</button>
    </form>
  </section>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
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
.error {
  color: red;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.2rem;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>