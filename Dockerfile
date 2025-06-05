# Stage 1: Build the application
# Use a specific Node.js 22.x Alpine image for a smaller final image size.
# node:22.14.0-alpine ensures we meet the >=22.14.0 requirement.
FROM node:22.14.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
# We copy these first to leverage Docker's build cache.
# If these files don't change, Docker won't re-run 'yarn install'.
COPY package.json ./
COPY yarn.lock ./

# Install ALL project dependencies (including devDependencies) for the build stage.
# --immutable ensures the lockfile is respected strictly.
RUN yarn install --immutable

# Copy the rest of the application source code
COPY . .

# Build the TypeScript project into JavaScript
# This command runs `tsc` as defined in your package.json scripts.
RUN yarn build

# Stage 2: Create the production-ready image
# Use a minimal Node.js runtime image for the final deployment.
# This keeps the image size small by only including necessary runtime files.
FROM node:22.14.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the final image.
# These are needed for yarn to correctly execute the 'start' script.
COPY package.json ./
COPY yarn.lock ./

# Install ONLY production dependencies for the final, lightweight image.
RUN yarn install --production --frozen-lockfile

# Copy the compiled JavaScript code from the builder stage.
COPY --from=builder /app/dist ./dist

# Expose the port your Express application listens on.
# It's good practice to use an environment variable for the port (e.g., PORT).
# Dokploy will usually provide a PORT environment variable.
EXPOSE 3000

# Define the command to run your application.
# This uses the `start` script defined in your package.json.
CMD ["yarn", "start"]
