FROM node:14.21.3 as node-14-build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Desabilitar caso utilizar a pipeline
RUN npm run build:prod

FROM nginx:alpine as angular-nginx-prod-stage

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=node-14-build /app/dist/rms-ui .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]