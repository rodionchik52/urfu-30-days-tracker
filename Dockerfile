FROM python:3.11-slim

WORKDIR /app

# Системные пакеты для сборки и корректной работы с PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Копируем и устанавливаем зависимости Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем пакет бэкенда (с __init__.py для корректной работы относительных импортов)
COPY __init__.py database.py main.py models.py ./app/

# Копируем статику фронтенда в каталог /app/frontend
COPY index.html style.css script.js ./frontend/

EXPOSE 8000

# Запускаем FastAPI через Uvicorn как модуль app.main
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
