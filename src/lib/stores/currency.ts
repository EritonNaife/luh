import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

// Get initial currency from localStorage or default to USD
const getInitialCurrency = (): Currency => {
  if (browser) {
    const stored = localStorage.getItem('selectedCurrency');
    if (stored) {
      const parsedCurrency = JSON.parse(stored);
      return currencies.find(c => c.code === parsedCurrency.code) || currencies[0];
    }
  }
  return currencies[0];
};

export const selectedCurrency = writable<Currency>(getInitialCurrency());

// Subscribe to changes and save to localStorage
if (browser) {
  selectedCurrency.subscribe(currency => {
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  });
}

export function formatPrice(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(amount);
}
