FROM node:8 
MAINTAINER Anthony Ritz <anthony.ritz@students.hevs.ch>
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies in the DOCKERIMAGE
COPY package*.json ./
RUN npm install
# Bundle app source INSTALL SOURCE CODE IN DOCKERIMAGE
COPY . .
# Expose port
EXPOSE 3000
EXPOSE 27017
# Start the app
CMD [ "npm", "start" ]
