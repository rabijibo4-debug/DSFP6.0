@echo off
title JobPulse - Cloudflare Public Tunnel
echo ====================================================
echo        JobPulse Cloudflare Public Web Tunnel         
echo ====================================================
echo.
echo Forwarding http://127.0.0.1:8000 to a public HTTPS URL...
echo.
"%LOCALAPPDATA%\Programs\cloudflared\cloudflared.exe" tunnel --url http://127.0.0.1:8000
pause
