import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

// Base currency is EUR, so EUR rate is always 1.0
export const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1.0 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.86 }, // Default fallback rate
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.09 }      // Default fallback rate
];

// Exchange rates store
export const exchangeRates = writable<{ [key: string]: number }>({
  EUR: 1.0,
  GBP: 0.86,
  USD: 1.09
});

// Get initial currency from localStorage or default to EUR
const getInitialCurrency = (): Currency => {
  if (browser) {
    const stored = localStorage.getItem('selectedCurrency');
    if (stored) {
      const parsedCurrency = JSON.parse(stored);
      return currencies.find(c => c.code === parsedCurrency.code) || currencies[0];
    }
  }
  return currencies[0]; // Default to EUR
};

export const selectedCurrency = writable<Currency>(getInitialCurrency());

// Subscribe to changes and save to localStorage
if (browser) {
  selectedCurrency.subscribe(currency => {
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  });
}

// Derived store that combines selected currency with current exchange rates
export const currentCurrency = derived(
  [selectedCurrency, exchangeRates],
  ([$selectedCurrency, $exchangeRates]) => ({
    ...$selectedCurrency,
    rate: $exchangeRates[$selectedCurrency.code] || $selectedCurrency.rate
  })
);

// Function to fetch real exchange rates from European Central Bank
export async function updateExchangeRates(): Promise<void> {
  try {
    // Using ECB API since your base currency is EUR
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update rates for supported currencies
    const newRates: { [key: string]: number } = {
      EUR: 1.0, // Base currency
      GBP: data.rates.GBP || 0.86,
      USD: data.rates.USD || 1.09
    };
    
    exchangeRates.set(newRates);
    
    // Update the currencies array with new rates
    currencies.forEach(currency => {
      currency.rate = newRates[currency.code];
    });
    
    console.log('Exchange rates updated successfully:', newRates);
    
  } catch (error) {
    console.error('Failed to update exchange rates:', error);
    // Keep using fallback rates if API fails
  }
}

// Function to initialize exchange rates on app start
export async function initializeExchangeRates(): Promise<void> {
  if (browser) {
    // Check if we have cached rates from today
    const cachedRates = localStorage.getItem('exchangeRates');
    const lastUpdate = localStorage.getItem('exchangeRatesLastUpdate');
    const today = new Date().toDateString();
    
    if (cachedRates && lastUpdate === today) {
      // Use cached rates if they're from today
      exchangeRates.set(JSON.parse(cachedRates));
      console.log('Using cached exchange rates');
    } else {
      // Fetch new rates
      await updateExchangeRates();
      
      // Cache the rates
      exchangeRates.subscribe(rates => {
        localStorage.setItem('exchangeRates', JSON.stringify(rates));
        localStorage.setItem('exchangeRatesLastUpdate', today);
      });
    }
  }
}

// Helper function to format prices (prices are stored in EUR)
export function formatPrice(amountInEur: number, currency: Currency): string {
  const convertedAmount = amountInEur * currency.rate;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedAmount);
}

// Helper function to convert price from EUR to selected currency
export function convertPrice(amountInEur: number, targetCurrency: Currency): number {
  return amountInEur * targetCurrency.rate;
}
