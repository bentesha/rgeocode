FROM node:12-alpine

ENV MYSQL_HOST localhost
ENV MYSQL_PORT 3306
ENV MYSQL_USER root
ENV MYSQL_PASSWORD password
ENV MYSQL_DATABASE rgeocode
ENV PORT 7000

WORKDIR /app
COPY . .
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
RUN npm install
CMD node index.js