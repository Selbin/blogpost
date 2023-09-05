# Use an official Node.js runtime as the parent image
FROM node:18.15.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's source code from your host to your image filesystem
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Set environment variables
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Make port 3000 available outside of the container
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
