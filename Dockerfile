
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json\
COPY ./package*.json ./
RUN npm install --only=production

# Create a new user
USER node

# Copy built code from the previous stage
COPY  --chown=node:node ./src ./src
COPY  --chown=node:node ./.env ./

# Expose the port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]