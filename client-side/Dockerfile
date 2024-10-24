# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Установка переменных окружения для сборки
ARG APP_ENV
ARG APP_URL
ARG APP_DOMAIN
ARG SERVER_URL

ENV APP_ENV=$APP_ENV
ENV APP_URL=$APP_URL
ENV APP_DOMAIN=$APP_DOMAIN
ENV SERVER_URL=$SERVER_URL

RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
