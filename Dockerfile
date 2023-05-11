# Specify the base image
FROM node:14

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Set environment variables for MongoDB and S3 credentials
ENV MONGO_URI mongodb://mongo:27017/mydb
# ENV AWS_ACCESS_KEY_ID=<your-access-key-id>
# ENV AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
# ENV AWS_REGION=<your-s3-region>
# ENV AWS_BUCKET=<your-s3-bucket>

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
