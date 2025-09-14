@echo off
echo Setting up Currency Converter
echo ===============================

echo Installing dependencies...
call npm install

echo Setting up environment configuration...

echo.
echo API key setup:
echo 1. Visit https://currencybeacon.com/register
echo 2. Get your API key from the dashboard
echo.
set /p api_key="Enter your API key (or press Enter to skip): "

echo # Currency Converter Environment Variables > .env.local
echo NEXT_PUBLIC_CURRENCY_API_BASE_URL=https://api.currencybeacon.com/v1 >> .env.local

if "%api_key%"=="" (
    echo NEXT_PUBLIC_CURRENCY_API_KEY= >> .env.local
    echo No API key provided - add it to .env.local later
) else (
    echo NEXT_PUBLIC_CURRENCY_API_KEY=%api_key% >> .env.local
    echo API key configured
)

echo.
echo Setup complete
echo Run: npm run dev
echo Open: http://localhost:3000
pause
