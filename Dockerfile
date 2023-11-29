# Use Node.js v18
FROM node:18

# Create app directory
WORKDIR /src/index

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 3001

CMD [ "node", "app.js" ]