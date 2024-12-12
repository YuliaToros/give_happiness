FROM node:latest
ENV NODE_ENV production
WORKDIR /application
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm ci
EXPOSE 80
CMD ["npm", "start"]
