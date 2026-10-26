# Levanta POLI_GRADOS en el Kubernetes de Docker Desktop.
# Uso (desde la raiz del proyecto):  .\k8s-iniciar.ps1
# Guia completa: k8s/README.md

$ErrorActionPreference = "Stop"
$raiz = $PSScriptRoot
Set-Location $raiz

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   POLI_GRADOS EN KUBERNETES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Kubernetes de Docker Desktop
$contexto = (kubectl config current-context 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $contexto) {
    Write-Host "No se encontro kubectl o Kubernetes no esta activo." -ForegroundColor Red
    Write-Host "Activalo en Docker Desktop: Settings > Kubernetes > Enable Kubernetes." -ForegroundColor Yellow
    exit 1
}
if ($contexto -ne "docker-desktop") {
    Write-Host "Aviso: el contexto actual de kubectl es '$contexto', no 'docker-desktop'." -ForegroundColor Yellow
    Write-Host "Cambialo con: kubectl config use-context docker-desktop" -ForegroundColor Yellow
    exit 1
}

# 2. Secretos
$secretos = Join-Path $raiz "k8s/secretos.env"
if (-not (Test-Path $secretos)) {
    Copy-Item (Join-Path $raiz "k8s/secretos.env.example") $secretos
    Write-Host "Se creo k8s/secretos.env con valores de ejemplo. Cambialos cuando puedas." -ForegroundColor Yellow
}

# 3. Liberar puertos: docker compose usa los mismos (3000 y 5173-5181).
#    "down" solo detiene los contenedores; los datos de compose se conservan.
Write-Host ""
Write-Host "[1/4] Deteniendo docker compose (sus datos se conservan)..." -ForegroundColor Cyan
docker compose down

# 4. Imagenes
Write-Host ""
Write-Host "[2/4] Construyendo imagenes con docker compose build..." -ForegroundColor Cyan
docker compose build
if ($LASTEXITCODE -ne 0) { Write-Host "Fallo la construccion de imagenes." -ForegroundColor Red; exit 1 }

# 5. Desplegar
Write-Host ""
Write-Host "[3/4] Aplicando manifiestos (kubectl apply -k k8s)..." -ForegroundColor Cyan
kubectl apply -k k8s
if ($LASTEXITCODE -ne 0) { Write-Host "Fallo kubectl apply." -ForegroundColor Red; exit 1 }

# Si se reconstruyeron las imagenes con la misma etiqueta (latest), se
# reinician los pods para que tomen la version nueva.
kubectl -n poli-grados rollout restart deployment | Out-Null

# 6. Esperar
Write-Host ""
Write-Host "[4/4] Esperando a que todo este listo (puede tardar 1-3 minutos)..." -ForegroundColor Cyan
kubectl -n poli-grados rollout status statefulset/postgres --timeout=180s
kubectl -n poli-grados get deployment -o name | ForEach-Object {
    kubectl -n poli-grados rollout status $_ --timeout=300s
}

Write-Host ""
kubectl -n poli-grados get pods
Write-Host ""
Write-Host "Listo. Entra por http://localhost:5173" -ForegroundColor Green
Write-Host "Super administrador: el correo y la contrasena de k8s/secretos.env" -ForegroundColor Green
Write-Host "Para detener: .\k8s-detener.ps1" -ForegroundColor Gray
