# Usa la imagen oficial de Bun
FROM oven/bun:1.2.7 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json bun.lockb tsconfig.json ./
COPY src ./src

# Instalar dependencias y compilar la app
RUN bun install --frozen-lockfile && bun run build

# --------------------------------------------

# Crear la imagen final
FROM oven/bun:1.2.7 AS runner

WORKDIR /app

# Copiar los archivos necesarios desde la fase de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./

# Copiar el archivo .env en caso de que se pase al contenedor
ARG ENV_FILE=.env
COPY ${ENV_FILE} .env

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "run", "start"]
