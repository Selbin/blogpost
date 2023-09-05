# Use the latest Node.js LTS version
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Compile the TypeScript code
RUN npx tsc

# Set the command to run when the container starts
CMD [ "npm", "./dist/server.js" ]
