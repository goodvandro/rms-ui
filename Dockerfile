#Create the node stage
FROM node:14.19.1 as node-14-build

WORKDIR /app

COPY . .

FROM amd64/nginx as angular-nginx-prod-stage

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=node-14-build /app/dist/rms-ui .

ENTRYPOINT [ "nginx", "-g", "daemon off;"]
