FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=build /app/build build/

EXPOSE 3000

CMD ["node", "build"]