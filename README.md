# 🎓 Трекер первых 30 дней первокурсника ИРИТ-РТФ УрФУ

Веб-сервис для адаптации студентов первого курса в университетской среде. Сервис предоставляет структурированный чек-лист задач на первый месяц учёбы с интерактивным календарём, категориями и инструкциями.

![CI Pipeline](https://github.com/rodionchik52/urfu-30-days-tracker/actions/workflows/ci.yml/badge.svg)
![Docker Compose](https://img.shields.io/badge/Orchestration-Docker%20Compose-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)
![Static Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen)

---

## 🌐 Демонстрация интерфейса (Live Demo)

Статическая версия интерфейса доступна онлайн на GitHub Pages:  
👉 **[Открыть трекер первокурсника](https://rodionchik52.github.io/urfu-30-days-tracker/)**

---

## ✨ Основной функционал

* **Интерактивный чек-лист:** отслеживание прогресса адаптации по дням.
* **Фильтрация и категоризация:** сортировка задач по направлениям (*Документы*, *Учёба*, *Быт*, *Спорт*, *Люди*).
* **Сессии без авторизации:** идентификация пользователя по защищённым `httpOnly`-cookie (`UID`) с автоматическим созданием профиля в базе данных.
* **Синхронизация состояния:** сохранение статусов задач (`task_state`) и даты старта в реляционной базе данных (PostgreSQL).
* **REST API:** эндпоинты для инициализации (`/api/bootstrap`), обновления профиля и сброса прогресса.

---

## 🛠 Стек технологий

* **Frontend:** HTML5, CSS3, Vanilla JavaScript.
* **Backend:** Python 3.11, FastAPI, Uvicorn, SQLAlchemy, Pydantic, Psycopg2.
* **База данных:** PostgreSQL 15 (хранение состояния задач и профилей в формате JSONB).
* **DevOps & Инфраструктура:**
  * **Контейнеризация:** Docker (многослойная сборка на `python:3.11-slim`).
  * **Оркестрация:** Docker Compose (связка сервисов `web` и `db` с именованным томом `postgres_data`).
  * **CI/CD:** GitHub Actions (автоматическая валидация статики, кода бэкенда и сборки Docker).
  * **Контроль версий:** Git Flow (`main`, `develop`, `archive`).

---

## 👥 Роли в команде

| Роль | Зона ответственности |
|---|---|
| **Бизнес-аналитик (BA)** | Сценарии адаптации, база знаний и перечень задач по дням. |
| **Системный аналитик (SA)** | Моделирование состояний интерфейса, проектирование моделей данных (JSONB) и контрактов API. |
| **Frontend-разработчик** | Реализация адаптивного интерфейса (HTML/CSS), логика взаимодействия и вызовы API. |
| **Backend-разработчик** | Реализация REST API на FastAPI, cookie-идентификация пользователей, интеграция с PostgreSQL через SQLAlchemy. |
| **DevOps-инженер** | Архитектура репозитория, автоматизация CI/CD (GitHub Actions), контейнеризация бэкенда (Docker), оркестрация базы и веб-сервера (Docker Compose), деплой статического стенда на GitHub Pages. |

---

## 🚀 Локальный запуск (Fullstack)

Для запуска полного стека (FastAPI + PostgreSQL + статика фронтенда) требуется только установленный Docker.

### 1. Клонирование репозитория
```bash
git clone [https://github.com/rodionchik52/urfu-30-days-tracker.git](https://github.com/rodionchik52/urfu-30-days-tracker.git)
cd urfu-30-days-tracker
