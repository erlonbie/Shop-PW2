FROM node:14-alpine

WORKDIR /usr/app

RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "start"]
