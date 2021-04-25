FROM node:14

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "start"]

EXPOSE 4040
