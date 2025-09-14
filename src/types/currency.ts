export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface CurrencyResponse {
  response: Currency[];
}

export interface ConversionResponse {
  response: {
    date: string;
    base: string;
    rates: {
      [key: string]: number;
    };
  };
}

export interface ExchangeRatesResponse {
  response: {
    date: string;
    base: string;
    rates: {
      [key: string]: number;
    };
  };
}

export interface ConvertResponse {
  response: {
    timestamp: number;
    date: string;
    from: string;
    to: string;
    amount: number;
    value: number;
  };
  timestamp?: number;
  date?: string;
  from?: string;
  to?: string;
  amount?: number;
  value?: number;
  meta?: {
    code: number;
    disclaimer: string;
  };
}
