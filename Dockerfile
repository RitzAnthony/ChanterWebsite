FROM node:8 
MAINTAINER Anthony Ritz <anthony.ritz@students.hevs.ch>
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies in the DOCKERIMAGE
COPY package*.json ./
RUN npm install
RUN npm install i18n
# Bundle app source INSTALL SOURCE CODE IN DOCKERIMAGE
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
