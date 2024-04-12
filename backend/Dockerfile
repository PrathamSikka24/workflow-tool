# Use the official Node.js 20 image.
FROM node:20-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Your application runs inside /app/src
CMD ["node", "src/app.mjs"]
