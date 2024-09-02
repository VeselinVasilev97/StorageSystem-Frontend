# Step 1: Build the React app
FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build files to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx.conf file
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
