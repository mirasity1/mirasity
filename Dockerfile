# Use Node 20 Alpine para deployment otimizado
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy apenas package.json do frontend (não do backend)
COPY package*.json ./

# Install dependencies (sem devDependencies para evitar Cypress)
RUN npm ci --omit=dev --ignore-engines

# Copy source code (excluindo backend via .dockerignore)
COPY src/ ./src/
COPY public/ ./public/
COPY tailwind.config.js ./
COPY *.json ./
COPY *.js ./
COPY *.html ./

# Build the application
RUN npm run build

# Use serve para servir arquivos estáticos
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start serving the build
CMD ["serve", "-s", "build", "-l", "3000"]