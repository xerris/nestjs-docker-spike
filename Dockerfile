FROM node:alpine AS development

WORKDIR /usr/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
