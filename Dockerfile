# Use official node image
FROM node:18-alpine AS build

ENV PORT=4002

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Use official nginx image
FROM nginx:1.21.1

COPY --from=build /app/build /app
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
