# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Генерация Prisma client
RUN npx prisma generate

# Сборка приложения NestJS
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

# Установка только production-зависимостей
COPY package*.json ./
RUN npm install --production

# Копирование собранного приложения и необходимых файлов
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Открытие порта
EXPOSE 5050

# Запуск приложения
CMD ["node", "dist/main.js"]
