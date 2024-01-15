FROM node:21

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json index.js db.js ./
RUN npm install
COPY src/ ./src

EXPOSE 8080
CMD [ "npm", "start"]