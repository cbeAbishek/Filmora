# Stage 1: Builder - Install dependencies and build the application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for the build)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Generate the Prisma client by providing a dummy DATABASE_URL for the build step
RUN DATABASE_URL="postgresql://neondb_owner:npg_fp1kbSD6mqZW@ep-wandering-sun-a9vc6520-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require" npx prisma generate

# Build the TypeScript project
RUN npm run build


# Stage 2: Production - Create a smaller image with only production artifacts
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the generated Prisma client from the builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the application runs on
EXPOSE 4000

# The command to start the application
CMD ["npm", "start"]
