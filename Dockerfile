# Usa la imagen de Bun
FROM oven/bun:1.2.7 AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias y compilar
RUN bun install --frozen-lockfile && bun run build

# ---------------------------------------

# Segunda etapa
FROM oven/bun:1.2.7 AS runner

WORKDIR /app

# Copiar solo lo necesario desde la fase anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./

EXPOSE 3000

CMD ["bun", "run", "start"]
