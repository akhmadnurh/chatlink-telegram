# Stage 1: Build the application
# Use a specific Node.js 22.x Alpine image for a smaller final image size.
# node:22.14.0-alpine ensures we meet the >=22.14.0 requirement.
FROM node:22.14.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# We copy these first to leverage Docker's build cache.
# If these files don't change, Docker won't re-run 'npm install'.
COPY package.json ./
# If you are using yarn, you would copy yarn.lock instead:
# COPY yarn.lock ./

# Install project dependencies.
# --omit=dev prevents devDependencies from being installed in the production image.
# If you need devDependencies for a specific runtime task, adjust this.
RUN npm install --omit=dev

# Copy the rest of the application source code
COPY . .

# Build the TypeScript project into JavaScript
# This command runs `tsc` as defined in your package.json scripts.
RUN npm run build

# Stage 2: Create the production-ready image
# Use a minimal Node.js runtime image for the final deployment.
# This keeps the image size small by only including necessary runtime files.
FROM node:22.14.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy only the necessary files from the builder stage:
# - package.json (needed for `npm start`)
# - node_modules (production dependencies)
# - dist directory (compiled JavaScript code)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port your Express application listens on.
# It's good practice to use an environment variable for the port (e.g., PORT).
# Dokploy will usually provide a PORT environment variable.
EXPOSE 3000

# Define the command to run your application.
# This uses the `start` script defined in your package.json.
CMD ["npm", "start"]