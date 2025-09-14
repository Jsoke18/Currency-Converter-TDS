import { useState, useEffect, useCallback } from 'react';
import { Currency } from '@/types/currency';
import { getCurrencies, convertCurrency } from '@/lib/api';

export function useCurrencies(apiKey?: string) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrencies(apiKey);
        setCurrencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
      } finally {
        setLoading(false);
      }
    }

    fetchCurrencies();
  }, [apiKey]);

  return { currencies, loading, error };
}

export function useCurrencyConversion() {
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (
    from: string,
    to: string,
    amount: number,
    apiKey?: string
  ): Promise<number | null> => {
    try {
      setConverting(true);
      setError(null);
      const result = await convertCurrency(from, to, amount, apiKey);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert currency');
      return null;
    } finally {
      setConverting(false);
    }
  }, []);

  return { convert, converting, error };
}