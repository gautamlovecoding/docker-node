# Node Application Docker Guide

This guide provides a basic Docker setup and useful commands for running a Node.js application inside a container using Docker.

## Dockerfile Overview

```dockerfile
FROM node:18  
# Use Node.js version 18 as the base image

WORKDIR /app  
# Set the working directory inside the container to /app

COPY package.json .  
# Copy package.json to the working directory in the container

RUN npm install  
# Install the dependencies from package.json

COPY . .  
# Copy the entire source code to the container

EXPOSE 3000  
# Expose port 3000 for external access

CMD ["npm", "start", "dev"]  
# Run the application with npm
```

## Docker Commands

### Build and Manage Docker Images
- **docker build -t node-app-image .**  
  Build a Docker image named `node-app-image` from the Dockerfile in the current directory.

- **docker image ls**  
  List all available Docker images.

- **docker image rm <Image Id>**  
  Remove an image by its ID.

### Run Docker Container
- **docker run -v "$(pwd)":/app -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image**  
  Run the `node-app-image` container with the following options:
  - Bind mount the current directory to `/app` for syncing files.
  - Use `-v /app/node_modules` to prevent syncing with `node_modules`.
  - Map port 3000 of the container to port 3000 on the host.
  - `-d` runs the container in detached mode.
  - `--name node-app` assigns a name to the container.

### Access Container Terminal
- **docker exec -it node-app bash**  
  Open an interactive bash session inside the `node-app` container.

### Use Read-Only Bind Mount
- **docker run -v "$(pwd)":/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image**  
  Same as above, but with read-only access to the source files (`:ro`).

### Stop and Remove Containers
- **docker stop node-app**  
  Stop the `node-app` container.

- **docker rm node-app**  
  Remove the `node-app` container.

- **docker rm node-app -fv**  
  Remove the `node-app` container along with its volumes.

### Check Logs
- **docker logs <container name>**  
  Display logs of a running container.

### Start and Stop All Containers
- **docker start <container name>**  
  Start a stopped container.

- **docker stop <container name>**  
  Stop a running container.

- **docker ps**  
  List all running containers.

- **docker ps -a**  
  List all containers, including stopped ones.

- **docker rm <container name or ID>**  
  Remove a container by name or ID.

- **docker kill <container name>**  
  Forcefully stop a running container.

## Docker Compose Commands

### Start and Stop Containers
- **docker compose up -d**  
  Start services defined in `docker-compose.yml` in detached mode.

- **docker compose down -v**  
  Stop and remove containers along with their volumes.

### Rebuild Images
- **docker compose up --build**  
  Rebuild the image when Dockerfile changes.

### Use Multiple Compose Files
- **docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d**  
  Use multiple compose files with file precedence for development purposes.

### mongo database commagd
- **mongosh -u "docker" -p "password" --authenticationDatabase "admin"** 
- **docker exec -it docker-node-mongo-1 mongosh -u "docker" -p "password" --authenticationDatabase "admin"** 
- **docker inspect <Container id or name>** 
- **docker logs docker-node-node-app-1 -f** -> explain -f 
- **docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app** -> --nodeps explain 


