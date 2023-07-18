# Stage 1
FROM node:16.13 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular-ci /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD nginx -g "daemon off;"
