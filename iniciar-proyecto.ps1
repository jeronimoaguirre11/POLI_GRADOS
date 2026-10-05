$ErrorActionPreference = "Stop"

$raiz = $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "       INICIANDO POLI_GRADOS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# --------------------------------------------------
# 1. Docker / PostgreSQL
# --------------------------------------------------

Write-Host "[1/3] Verificando PostgreSQL..." -ForegroundColor Cyan

Set-Location $raiz

try {
    docker info *> $null
}
catch {
    Write-Host ""
    Write-Host "ERROR: Docker Desktop no esta ejecutandose." -ForegroundColor Red
    Write-Host "Abre Docker Desktop y vuelve a ejecutar este script." -ForegroundColor Yellow
    exit 1
}

docker compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "No se pudo iniciar PostgreSQL." -ForegroundColor Red
    exit 1
}

Write-Host "PostgreSQL listo." -ForegroundColor Green


# --------------------------------------------------
# 2. Gateway y microservicios
# --------------------------------------------------

Write-Host ""
Write-Host "[2/3] Iniciando Gateway y microservicios..." -ForegroundColor Cyan

$backends = @(
    @{ Nombre = "Gateway"; Ruta = "gateway" },
    @{ Nombre = "Auth Service"; Ruta = "services/auth-service" },
    @{ Nombre = "Empresas Service"; Ruta = "services/empresas-service" },
    @{ Nombre = "Estudiantes Service"; Ruta = "services/estudiantes-service" },
    @{ Nombre = "Postulaciones Service"; Ruta = "services/postulaciones-service" },
    @{ Nombre = "Coordinadores Service"; Ruta = "services/coordinadores-service" },
    @{ Nombre = "Diplomado Service"; Ruta = "services/diplomado-service" },
    @{ Nombre = "Docentes Service"; Ruta = "services/docentes-service" }
)

foreach ($app in $backends) {

    $ruta = Join-Path $raiz $app.Ruta

    Write-Host "  -> $($app.Nombre)" -ForegroundColor Gray

    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "`$Host.UI.RawUI.WindowTitle='POLI - $($app.Nombre)'; Set-Location '$ruta'; npm run start:dev"
    )

    Start-Sleep -Milliseconds 500
}


# --------------------------------------------------
# 3. Frontends
# --------------------------------------------------

Write-Host ""
Write-Host "[3/3] Iniciando frontends..." -ForegroundColor Cyan

$frontends = @(
    @{ Nombre = "Frontend Auth"; Ruta = "frontends/frontend-auth" },
    @{ Nombre = "Frontend Empresas"; Ruta = "frontends/frontend-empresas" },
    @{ Nombre = "Frontend Estudiantes"; Ruta = "frontends/frontend-estudiantes" },
    @{ Nombre = "Frontend Postulaciones"; Ruta = "frontends/frontend-postulaciones" },
    @{ Nombre = "Frontend Coordinadores"; Ruta = "frontends/frontend-coordinadores" },
    @{ Nombre = "Frontend Diplomado"; Ruta = "frontends/frontend-diplomado" }
)

foreach ($app in $frontends) {

    $ruta = Join-Path $raiz $app.Ruta

    Write-Host "  -> $($app.Nombre)" -ForegroundColor Gray

    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "`$Host.UI.RawUI.WindowTitle='POLI - $($app.Nombre)'; Set-Location '$ruta'; npm run dev"
    )

    Start-Sleep -Milliseconds 500
}


# --------------------------------------------------
# Final
# --------------------------------------------------

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "        POLI_GRADOS INICIADO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Gateway:       http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Microservicios:" -ForegroundColor Cyan
Write-Host "  Auth:          3001"
Write-Host "  Empresas:      3002"
Write-Host "  Estudiantes:   3003"
Write-Host "  Postulaciones: 3004"
Write-Host "  Coordinadores: 3005"
Write-Host "  Diplomado:     3006"
Write-Host "  Docentes:      3007"
Write-Host ""
Write-Host "Frontends:" -ForegroundColor Cyan
Write-Host "  Auth/Home:     http://localhost:5173"
Write-Host "  Empresas:      http://localhost:5174"
Write-Host "  Estudiantes:   http://localhost:5175"
Write-Host "  Postulaciones: http://localhost:5176"
Write-Host "  Coordinadores: http://localhost:5177"
Write-Host "  Diplomado:     http://localhost:5178"
Write-Host ""
Write-Host "Proyecto iniciado correctamente." -ForegroundColor Green