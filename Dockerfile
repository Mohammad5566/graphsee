FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else yarn install; \
    fi

# Copy project files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server
CMD ["yarn", "dev", "--host", "0.0.0.0"]
