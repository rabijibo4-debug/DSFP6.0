@echo off
title JobPulse - Cloudflare Public Tunnel
set "PATH=%LOCALAPPDATA%\Programs\cloudflared;%PATH%"
echo ====================================================
echo        Generating Public HTTPS URL for JobPulse     
echo ====================================================
echo.
cloudflared.exe tunnel --url http://127.0.0.1:8000
pause
