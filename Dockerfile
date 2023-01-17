FROM node:16-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=base /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /var/cache/nginx/*
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
