# Currency Converter

A simple currency conversion tool built with Next.js and TypeScript for the TDS interview assessment.

## Setup

1. **Quick setup (recommended):**
   ```bash
   setup.bat
   ```
   The script will install dependencies and prompt for your API key.

2. **Manual setup:**
   **Install dependencies:**
   ```bash
   npm install
   ```

   **Environment setup:**
   Create `.env.local` with:
   ```
   NEXT_PUBLIC_CURRENCY_API_BASE_URL=https://api.currencybeacon.com/v1
   NEXT_PUBLIC_CURRENCY_API_KEY=your_api_key_here
   ```

   **Run the app:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Getting API Key

- Sign up at [currencybeacon.com](https://currencybeacon.com/register)
- Get your free API key from the dashboard
- The setup script will ask for it, or add it manually to `.env.local`

## What it does

- Select currencies from dropdown menus
- Enter an amount to convert 
- Get real-time exchange rates from CurrencyBeacon API
- Search currencies by name, code, or country

## Tech stack

- Next.js 15 with TypeScript
- Tailwind CSS for styling
- CurrencyBeacon API for exchange rates
- Custom hooks for API calls
- Framer Motion for animations
