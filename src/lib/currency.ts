import { Currency } from '@/types/currency';

export function getCurrencyName(currencies: Currency[], code: string): string {
  const currency = currencies.find(c => c.short_code === code);
  return currency?.name || code;
}


export function getCurrencySymbol(currencies: Currency[], code: string): string {
  const currency = currencies.find(c => c.short_code === code);
  return currency?.symbol || '';
}


export function formatCurrencyValue(value: number): string {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export function filterCurrencies(currencies: Currency[], searchTerm: string): Currency[] {
  if (!searchTerm) return currencies;
  
  const term = searchTerm.toLowerCase();
  return currencies.filter(currency => 
    currency.short_code.toLowerCase().includes(term) ||
    currency.name.toLowerCase().includes(term) ||
    currency.symbol.toLowerCase().includes(term)
  );
}


export function generateRatesCSV(
  rates: Record<string, number>, 
  base: string, 
  date: string,
  getCurrencyNameFn: (code: string) => string
): string {
  const headers = ['Currency Code', 'Currency Name', 'Rate', 'Base Currency', 'Date'];
  const rows = Object.entries(rates).map(([code, rate]) => 
    [code, getCurrencyNameFn(code), rate.toString(), base, date]
  );
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}


export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
