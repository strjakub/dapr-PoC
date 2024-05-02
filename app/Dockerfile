# Use a base Node.js image
FROM node:20

# Set the working directory in the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package.json /usr/src/app/

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . /usr/src/app/

# Expose port 3000 (the port that your Node.js application listens on)
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "server.js"]