$raiz = $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "       DETENIENDO POLI_GRADOS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$puertos = @(
    3000,
    3001,
    3002,
    3003,
    3004,
    3005,
    3006,
    3007,
    5173,
    5174,
    5175,
    5176,
    5177,
    5178,
    5179
)

foreach ($puerto in $puertos) {

    $conexiones = Get-NetTCPConnection `
        -LocalPort $puerto `
        -State Listen `
        -ErrorAction SilentlyContinue

    foreach ($conexion in $conexiones) {

        $pidProceso = $conexion.OwningProcess

        Write-Host "Deteniendo puerto $puerto (PID $pidProceso)..." -ForegroundColor Gray

        Stop-Process -Id $pidProceso -Force -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "Deteniendo contenedores Docker..." -ForegroundColor Cyan

Set-Location $raiz
docker compose down

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "       POLI_GRADOS DETENIDO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green