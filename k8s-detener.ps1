# Detiene POLI_GRADOS en Kubernetes sin borrar datos (base de datos y
# archivos subidos se conservan). Para volver a levantarlo: .\k8s-iniciar.ps1
#
# Para BORRAR todo (incluidos los datos):  kubectl delete namespace poli-grados

$raiz = $PSScriptRoot
Set-Location $raiz

Write-Host ""
Write-Host "Deteniendo POLI_GRADOS en Kubernetes (los datos se conservan)..." -ForegroundColor Yellow
# Se borran los Deployments y Services (se recrean con k8s-iniciar.ps1). Hay
# que borrar los Services porque Docker Desktop mantiene ocupados sus puertos
# (3000 y 5173-5181) aunque no haya pods. Los volumenes (PVC) no se tocan.
kubectl -n poli-grados delete deployment,service --all
kubectl -n poli-grados scale statefulset --all --replicas=0
Write-Host ""
Write-Host "Detenido. Los puertos 3000 y 5173-5181 quedan libres para docker compose." -ForegroundColor Green
