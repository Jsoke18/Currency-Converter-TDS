'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Currency } from '@/types/currency';
import { ChevronDown, Search } from 'lucide-react';

interface CurrencySelectorProps {
  currencies: Currency[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function CurrencySelector({
  currencies,
  value,
  onValueChange,
  placeholder,
  disabled = false,
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedCurrency = currencies.find(c => c.short_code === value);
  
  const filteredCurrencies = useMemo(() => {
    if (!search) return currencies;
    
    const searchLower = search.toLowerCase();
    
    return currencies.filter(currency => {
      return currency.short_code.toLowerCase().includes(searchLower) ||
        currency.name.toLowerCase().includes(searchLower) ||
        currency.symbol.toLowerCase().includes(searchLower);
    });
  }, [currencies, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currencyCode: string) => {
    onValueChange(currencyCode);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="w-full h-9 flex items-center justify-between px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selectedCurrency ? (
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{selectedCurrency.short_code}</span>
            <span className="font-bold text-blue-600">{selectedCurrency.symbol}</span>
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="flex items-center border-b border-gray-100 px-3 py-2">
            <Search className="mr-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by currency code, name, or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm"
              autoFocus
            />
          </div>

          <div className="max-h-[300px] overflow-auto">
            {filteredCurrencies.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No currencies found.
              </div>
            ) : (
              filteredCurrencies.map((currency) => {
                return (
                  <div
                    key={currency.id}
                    className="flex items-center space-x-3 px-3 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => handleSelect(currency.short_code)}
                  >
                    <span className="font-bold text-lg text-blue-600 w-8 text-center flex-shrink-0">
                      {currency.symbol}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900">
                        {currency.short_code}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {currency.name}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}