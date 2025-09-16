# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package.json package-lock.json* .npmrc* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Build
COPY . .
RUN npm run build

# ---- Production stage (nginx) ----
FROM nginx:alpine AS production

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
