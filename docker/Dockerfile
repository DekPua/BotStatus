FROM node:22-alpine

WORKDIR /dekpua/bot

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start" ]