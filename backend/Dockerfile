# Use Node.js version 22 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the application port (5000 in this case)
EXPOSE 5000

# Command to run the server
CMD ["node", "server.js"]
