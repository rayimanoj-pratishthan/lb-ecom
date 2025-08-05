FROM node:12

# Install LoopBack 3 CLI
RUN npm install -g loopback-cli

# Set work directory
WORKDIR /app

CMD [ "bash" ]