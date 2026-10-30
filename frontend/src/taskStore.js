import { ref } from 'vue'

// Единственный общий массив задач
export const items = ref([
  { id: 1, number: 'TASK-2026-0001', title: 'Подготовить смету по проекту', projectId: 2, status: 'New' },
  { id: 2, number: 'TASK-2026-0002', title: 'Согласовать планировку', projectId: 1, status: 'InProgress' }
])

// Счётчик для новых задач
let nextId = 3

// Функция добавления новой задачи в массив
export function addItem(title, projectId, description) {
  items.value.push({
    id: nextId,
    number: `TMP-${nextId}`, // Учебный номер, потом заменим на ответ от сервера
    title: title,
    projectId: projectId,
    description: description,
    status: 'New' // Всегда 'New' при создании
  })
  nextId++ 
}