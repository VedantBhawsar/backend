# Use an official Node.js runtime as the base image
FROM node:20.11.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory

# Copy the rest of the application code to the working directory
COPY . .

# Copy NGINX configuration file to desired position
COPY nginx/default.conf /etc/nginx/nginx.conf

# Install NGINX
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y nginx && \
    echo N | dpkg --configure nginx-common


# Expose the ports that the application will listen on
EXPOSE 3001 80

# Define the command to start NGINX and run the application
# Copy NGINX configuration file to desired position
# Copy NGINX configuration file to desired position
COPY nginx/default.conf /etc/nginx/nginx.conf

# Expose the ports that the application will listen on
EXPOSE 3001 80

RUN npm run build 
CMD service nginx start && npm start