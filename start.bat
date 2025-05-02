@echo off
echo Checking for Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Checking if port 3000 is in use...
netstat -ano | findstr :3000 >nul
if not errorlevel 1 (
    echo Warning: Port 3000 is already in use
    echo Please close any applications using port 3000 and try again
    pause
    exit /b 1
)

echo Installing required packages...
npm install

echo Starting server...
node server.js
pause 