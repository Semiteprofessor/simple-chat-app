FROM node:18
WORKDIR /simple
COPY package*.json index.js ./
RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]
