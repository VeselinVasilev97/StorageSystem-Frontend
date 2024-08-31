# Use an official Nginx image as the base
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
