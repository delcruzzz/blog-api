# Usa una imagen oficial de Node.js (LTS recomendado)
FROM node:22 AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos esenciales del proyecto
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalar dependencias y compilar con npm
RUN npm install --omit=dev && npm run build

# ---------------------------------------

# Segunda etapa: ejecución
FROM node:22 AS runner

WORKDIR /app

# Copiar solo lo necesario desde la fase anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]
