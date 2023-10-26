# set the base image to build from 
FROM node:alpine
ENV DEBUG=*
# set the working directory
WORKDIR /app
COPY . .
# copy package files
COPY package.json ./
COPY package-lock.json ./
# copy everything to /app directory

# install dependencies
RUN npm install
# run the app
ENTRYPOINT ["npm", "start"]