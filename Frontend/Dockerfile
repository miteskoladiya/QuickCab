FROM node:22.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

EXPOSE 5173

COPY . .

CMD ["npm", "run", "dev"]
