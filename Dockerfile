ARG API_URL=https://mini-crm.tiltshiftapps.nl/api
# build environment
FROM node:13.12.0-alpine as build
ARG API_URL
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

# Use --build-arg API_URL=https:<api-host>/api to overwrite api host definition
COPY ./src/shared/configuration.template.ts /app/src/shared/configuration.ts
RUN sed -i -r "s|__API_BASE_URL__|${API_URL}|g" /app/src/shared/configuration.ts
RUN npm run build

# production environment
FROM nginx:1.18.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
