@echo off
title Push to GitHub - DSFP6.0
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
cd /d "%~dp0"

echo ====================================================
echo        Pushing JobPulse to GitHub (DSFP6.0)         
echo ====================================================
echo.

git branch -M main
git remote set-url origin https://github.com/rabijibo4-debug/DSFP6.0.git 2>nul || git remote add origin https://github.com/rabijibo4-debug/DSFP6.0.git

echo Committing any recent changes...
git add .
git commit -m "Update: JobPulse job tracker application" 2>nul

echo.
echo Running: git push -u origin main
echo (If prompted, complete GitHub authentication in your browser)
echo.
git push -u origin main

echo.
echo ====================================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Code pushed to https://github.com/rabijibo4-debug/DSFP6.0.git
) else (
    echo [NOTE] If authentication failed, ensure you have write access to the repository.
)
echo ====================================================
pause

