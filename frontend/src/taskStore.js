import { ref } from 'vue'

// Единственный общий массив задач в проекте
export const items = ref([
  { id: 1, number: 'TASK-2026-0001', title: 'Подготовить смету по проекту', projectId: 2, status: 'New' },
  { id: 2, number: 'TASK-2026-0002', title: 'Согласовать планировку', projectId: 1, status: 'InProgress' }
])