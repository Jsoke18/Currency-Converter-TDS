import { Currency, CurrencyResponse, ConvertResponse } from '@/types/currency';

const API_BASE_URL = 'https://api.currencybeacon.com/v1';

export async function getCurrencies(apiKey?: string): Promise<Currency[]> {
  const params = new URLSearchParams({ type: 'fiat' });
  const headers: HeadersInit = {};

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${API_BASE_URL}/currencies?${params}`, { headers });

  if (!response.ok) {
    throw new Error('Failed to fetch currencies');
  }

  const data: CurrencyResponse = await response.json();
  return data.response;
}

export async function convertCurrency(from: string, to: string, amount: number, apiKey?: string): Promise<number> {
  const params = new URLSearchParams({
    from,
    to,
    amount: amount.toString(),
  });

  const headers: HeadersInit = {};
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${API_BASE_URL}/convert?${params}`, { headers });

  if (!response.ok) {
    throw new Error('Failed to convert currency');
  }

  const data: ConvertResponse = await response.json();
  return data.response?.value || data.value || 0;
}

