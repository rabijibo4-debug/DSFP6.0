# JobPulse Startup Script for PowerShell
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "       JobPulse Job Tracking & Hiring System        " -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

$python = "python"
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    if (Test-Path "C:\Program Files\QGIS 3.44.3\apps\Python312\python.exe") {
        $python = "C:\Program Files\QGIS 3.44.3\apps\Python312\python.exe"
    } else {
        Write-Error "Python executable not found. Please install Python or add it to PATH."
        exit 1
    }
}

Write-Host "Starting JobPulse on http://localhost:8000 ..." -ForegroundColor Green
Start-Process "http://localhost:8000"
& $python server.py

