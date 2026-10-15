# API-контракт. Система учёта рабочего времени и задач сотрудников проектной организации

Базовый путь: `/api/tasks`

Все запросы — в формате JSON. Сервер отвечает JSON. Коды ответов:
- `200` — успех (данные возвращены)
- `201` — создано (новая запись)
- `400` — ошибка валидации (неверные поля)
- `404` — запись не найдена
- `409` — конфликт (недопустимая смена статуса)

---

## Сводная таблица запросов

| Метод и путь | Тело | Успех | Возможная ошибка |
|--------------|------|-------|------------------|
| `GET /api/tasks` | — | `200`, массив задач или `[]` | — |
| `GET /api/tasks/{id}` | — | `200`, объект задачи | `404` |
| `POST /api/tasks` | `title`, `projectId`, `description` | `201`, `id`, `number`, `status: "New"` | `400` |
| `PATCH /api/tasks/{id}/assignee` | `assigneeUserId` | `200`, обновлённая задача | `404` |
| `PATCH /api/tasks/{id}/status` | `status` | `200`, обновлённая задача | `404`, `409` |

**Принципы:**
- При создании клиент **не присылает** `id`, `number`, `status` и `assigneeUserId` — их определяет сервер.
- Назначение исполнителя и смена статуса — **разные действия**, поэтому два разных `PATCH`.
- Метода `DELETE` нет. Отмена задачи — это смена статуса на `Cancelled`, а не удаление строки.
- Путь создания — `POST /api/tasks`, а не `/api/tasks/create`.

---

## Примеры JSON

### 1. Создание задачи — `POST /api/tasks`

**Запрос:**
```json
{
  "title": "Подготовить смету по проекту",
  "projectId": 3,
  "description": "Составить смету на монтажные работы по объекту"
}
```

**Успех — `201 Created`:**
```json
{
  "id": 42,
  "number": "TASK-2026-0042",
  "title": "Подготовить смету по проекту",
  "description": "Составить смету на монтажные работы по объекту",
  "status": "New",
  "projectId": 3,
  "createdByUserId": 7,
  "assigneeUserId": null,
  "actualHours": null
}
```

**Ошибка — `400 Bad Request`:**
```json
{
  "error": "validation_failed",
  "fields": {
    "title": "длина должна быть от 5 до 80 символов",
    "projectId": "проект с указанным id не существует"
  }
}
```

---

### 2. Список задач — `GET /api/tasks`

**Успех — `200 OK`:**
```json
[
  {
    "id": 42,
    "number": "TASK-2026-0042",
    "title": "Подготовить смету по проекту",
    "status": "New",
    "projectId": 3,
    "assigneeUserId": null,
    "actualHours": null
  },
  {
    "id": 43,
    "number": "TASK-2026-0043",
    "title": "Согласовать планировку",
    "status": "InProgress",
    "projectId": 3,
    "assigneeUserId": 5,
    "actualHours": null
  }
]
```

**Пустой список — тоже `200 OK`:**
```json
[]
```

---

### 3. Одна задача — `GET /api/tasks/{id}`

**Успех — `200 OK`:**
```json
{
  "id": 42,
  "number": "TASK-2026-0042",
  "title": "Подготовить смету по проекту",
  "description": "Составить смету на монтажные работы по объекту",
  "status": "InProgress",
  "projectId": 3,
  "createdByUserId": 7,
  "assigneeUserId": 5,
  "actualHours": 12
}
```

**Ошибка — `404 Not Found`:**
```json
{
  "error": "not_found",
  "message": "Задача с id=999 не найдена"
}
```

---

### 4. Назначение исполнителя — `PATCH /api/tasks/{id}/assignee`

**Запрос:**
```json
{
  "assigneeUserId": 5
}
```

**Успех — `200 OK`:**
```json
{
  "id": 42,
  "number": "TASK-2026-0042",
  "status": "New",
  "assigneeUserId": 5
}
```

**Ошибка — `404 Not Found`:**
```json
{
  "error": "not_found",
  "message": "Пользователь с id=999 не найден"
}
```

---

### 5. Смена статуса — `PATCH /api/tasks/{id}/status`

**Запрос:**
```json
{
  "status": "InProgress"
}
```

**Успех — `200 OK`:**
```json
{
  "id": 42,
  "number": "TASK-2026-0042",
  "status": "InProgress",
  "assigneeUserId": 5
}
```

**Ошибка — `409 Conflict` (например, попытка закрыть задачу, которая ещё не в работе):**
```json
{
  "error": "invalid_transition",
  "message": "Из статуса New нельзя перейти в Closed. Сначала переведите в InProgress"
}
```

---

## Допустимые переходы статусов

```
New ──────► InProgress ──────► Closed
 │              │
 │              │
 └──────────────┴──────────────► Cancelled
```

- `New` → `InProgress` — берёт в работу назначенный исполнитель
- `New` → `Cancelled` — отмена (руководитель или назначенный сотрудник)
- `InProgress` → `Closed` — завершение (только назначенный исполнитель)
- `InProgress` → `Cancelled` — отмена (назначенный сотрудник)

Прямой переход `New` → `Closed` запрещён (ошибка `409`).