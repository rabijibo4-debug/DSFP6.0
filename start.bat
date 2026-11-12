@echo off
title JobPulse - Job Board & Applicant Tracking System
echo ====================================================
echo        JobPulse Job Tracking & Hiring System         
echo ====================================================
echo.

set PYTHON_CMD=python

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=python
) else (
    if exist "C:\Program Files\QGIS 3.44.3\apps\Python312\python.exe" (
        set PYTHON_CMD="C:\Program Files\QGIS 3.44.3\apps\Python312\python.exe"
    ) else (
        echo [ERROR] Python not found in PATH or standard location.
        pause
        exit /b 1
    )
)

echo Starting JobPulse Server on http://localhost:8000 ...
start "" http://localhost:8000
%PYTHON_CMD% server.py
pause

