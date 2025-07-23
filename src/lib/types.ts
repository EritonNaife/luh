// src/lib/types.ts
import type { Product } from '$lib/data/products';

export interface DeliveryData {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  region: string;
  phone: string;
}

export interface PaymentData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  nameOnCard: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    country: string;
    region: string;
    postalCode: string;
  };
  saveInfo: boolean;
  sameAsShipping: boolean;
}

export interface Order {
  id: string;
  delivery: DeliveryData;
  payment: PaymentData;
  items: (Product & { quantity: number })[];
  total: number;
  timestamp: string;
}