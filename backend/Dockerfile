FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* .npmrc* ./
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --omit=dev; fi

# Copy source
COPY . .

# Expose port
ENV PORT=5001
EXPOSE 5001

CMD ["npm", "start"]
