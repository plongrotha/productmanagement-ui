# Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm ci

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app from build stage to nginx
COPY --from=build /app/dist/product-management-ui /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]