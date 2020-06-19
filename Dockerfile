# stage: 1
FROM node:10.20.1 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN cd client/ && yarn run build

# Stage 2 - the production environment
FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
