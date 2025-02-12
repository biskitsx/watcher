# Use a generic Node.js base image (no platform restriction)
FROM node:20-alpine as base

# Install OpenSSL and other dependencies
RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

WORKDIR /app
COPY . .

# Install Node.js dependencies and build the project
RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

CMD ["npm", "run", "start"]

# Run stage
FROM node:20-alpine as run

# Copy OpenSSL libraries from base stage
RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

WORKDIR /app
COPY --from=base /app/.next  ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

# Set the entrypoint
CMD ["npm", "run", "start"]
