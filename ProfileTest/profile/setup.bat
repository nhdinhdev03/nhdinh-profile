@echo off
echo ========================================
echo    NHDINH PORTFOLIO - SETUP SCRIPT
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found! Installing dependencies...
echo.

call npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo      INSTALLATION COMPLETED!
echo ========================================
echo.
echo To start the development server:
echo   npm start
echo.
echo To build for production:
echo   npm run build
echo.
echo Website will run at: http://localhost:3000
echo.
pause
