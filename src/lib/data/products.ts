export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    reviews: number;
    imageUrl: string;
  }
  
  export const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Lavender Dream Candle',
      price: 18.00,
      description: 'Relaxing scent of fresh lavender fields.',
      reviews: 123,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png', // We'll need to put images in /static
    },
    {
      id: '2',
      name: 'Ocean Breeze Candle',
      price: 20.00,
      description: 'Invigorating blend of sea salt and fresh air.',
      reviews: 34,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png',
    },
    {
      id: '3',
      name: 'Vanilla Classic Candle',
      price: 16.00,
      description: 'Sweet and comforting pure vanilla.',
      reviews: 3,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png',
    },
    {
      id: '3',
      name: 'Vanilla Classic Candle',
      price: 16.00,
      description: 'Sweet and comforting pure vanilla.',
      reviews: 3,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png',
    },
    {
      id: '3',
      name: 'Vanilla Classic Candle',
      price: 16.00,
      description: 'Sweet and comforting pure vanilla.',
      reviews: 3,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png',
    },
    {
      id: '3',
      name: 'Vanilla Classic Candle',
      price: 16.00,
      description: 'Sweet and comforting pure vanilla.',
      reviews: 3,
      imageUrl: 'images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png',
    }
  ];