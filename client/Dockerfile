# 1. Этап: сборка
FROM node:20-alpine AS builder
WORKDIR /app

# Установим build-time переменную окружения
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Копируем файлы
COPY package*.json ./
COPY vite.config.* ./
COPY tsconfig.* ./
COPY . .

RUN npm install
RUN npm run build

# 2. Этап: запуск
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
