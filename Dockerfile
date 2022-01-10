FROM nginx
LABEL name="fornt"
LABEL version="1.0"
COPY ./dist /usr/share/webapp
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80