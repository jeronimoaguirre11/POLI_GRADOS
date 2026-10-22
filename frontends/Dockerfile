FROM node:22-bookworm-slim AS build
WORKDIR /app
ARG APP
COPY ${APP}/package*.json ./
RUN npm ci
COPY ${APP}/ ./
ARG VITE_API_URL
ARG VITE_AUTH_APP_URL
ARG VITE_EMPRESAS_APP_URL
ARG VITE_ESTUDIANTES_APP_URL
ARG VITE_POSTULACIONES_APP_URL
ARG VITE_COORDINADORES_APP_URL
ARG VITE_DIPLOMADO_APP_URL
ARG VITE_INVESTIGACION_APP_URL
ARG VITE_DOCENTES_APP_URL
RUN npm run build

FROM nginx:alpine
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri /index.html; }
}
EOF
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80