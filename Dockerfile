FROM node:alpine AS capi-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

FROM nginx:alpine
COPY --from=capi-build /app/dist/capi-ui /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80


#FROM nginx:alpine
#COPY /dist/capi-ui /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d/
#EXPOSE 80