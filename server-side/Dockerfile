# Используем образ линус Alpine с версией node 14
FROM node:19.5.0-alpine

# Указываем нашу рабочаю дерикторию
WORKDIR /app

# Скопировать package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшееся приложения в контейнер
COPY . .

# Устанавливаем Prisma
RUN npm install -g prisma

# Генерируем Prisma client
RUN prisma generate

# Кипируем Prisma schema
COPY prisma/schema.prisma ./prisma/

# Открыть порт в нашем контейнере
EXPOSE 5050

# Запускаем наш сервер
CMD ["npm","start"]