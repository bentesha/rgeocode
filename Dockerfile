FROM node:12-alpine

ENV MYSQL_HOST localhost
ENV MYSQL_PORT 3306
ENV MYSQL_USER root
ENV MYSQL_PASSWORD password
ENV MYSQL_DATABASE mobicap_geocode

WORKDIR /app
COPY . .
RUN npm install
CMD node index.js