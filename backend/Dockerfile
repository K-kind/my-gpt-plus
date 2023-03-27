FROM node:18.15.0

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build && npm install --production

CMD [ "npm", "start"]
