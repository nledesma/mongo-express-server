# latest official node image
FROM node:8.11.4

MAINTAINER Nicolas Ledesma <nicolas.angel.ledesma@gmail.com>

RUN npm install --verbose  --global nodemon
RUN mkdir -p /usr/src

WORKDIR /usr/src

EXPOSE 3000
EXPOSE 3001
EXPOSE 9229 

CMD [ "npm","run", "start-docker" ]