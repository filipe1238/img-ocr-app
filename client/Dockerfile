# Use an official Node.js runtime as a parent image
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight, official Nginx image as a parent image for serving the React app
FROM nginx:alpine

# Copy the built React app from the build stage to the Nginx web server's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 10000

# Start the Nginx web server when the container starts
CMD ["nginx", "-g", "daemon off;"]
