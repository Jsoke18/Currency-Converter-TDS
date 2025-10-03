export interface ConversionHistory { 
    toAmount: number
    fromAmount: number
    fromCurrency: string
    toCurrency: string 
    exchangeRate: number
    timestamp: Date
    id: string
}