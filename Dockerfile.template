FROM node:18-alpine as build
WORKDIR /usr/fsxa-pwa

COPY package*.json ./
RUN npm ci --silent

COPY . .

RUN npm run build

FROM node:18-alpine as production
WORKDIR /usr/fsxa-pwa

COPY --from=build /usr/fsxa-pwa/.output ./.output
COPY --from=build /usr/fsxa-pwa/package*.json ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
