FROM node:22-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/build build/
COPY --from=build /app/package.json .

RUN npm install --production

EXPOSE 3000

CMD ["node", "build"]