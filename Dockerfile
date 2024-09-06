FROM node:22-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/build build/
COPY --from=build /app/package.json .

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "build"]