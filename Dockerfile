# Stage 1: Build the application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# reset and fresh install dependencies
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Create the production image
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]