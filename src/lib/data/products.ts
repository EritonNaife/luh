// lib/data/product.ts
export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  category: 'cup' | 'featured-cup' | 'silicone-mold' | 'ceramic-candle';
}

export interface WeightedProduct extends BaseProduct {
  type: 'weighted';
  weight: number;
}

export interface NonWeightedProduct extends BaseProduct {
  type: 'non-weighted';
}

export type Product = WeightedProduct | NonWeightedProduct;

export interface CartItem {
  productId: string;
  quantity: number;
}

export const products: Product[] = [
  // Cups (weighted)
  {
    id: 'cup-vanilla-220',
    name: 'Vanilla Scented Wax Candle',
    price: 18.99,
    description: 'A charming soy wax candle poured into a vintage floral teacup. Perfect for cozy evenings.',
    imageUrls: ['/images/cups/vanilla_candle1.png', '/images/cups/vanilla_candle2.png'],
    category: 'cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-rose-220',
    name: 'Rose Scented Wax Candle',
    price: 19.99,
    description: 'A delicate rose fragrance candle poured into a vintage floral teacup. Brings a fresh floral touch to any room.',
    imageUrls: ['/images/cups/rose_candle1.png', '/images/cups/rose_candle2.png'],
    category: 'cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-jasmine-220',
    name: 'Jasmine Scented Wax Candle',
    price: 20.49,
    description: 'A soothing jasmine scent in a soy wax candle poured into a vintage floral teacup. Ideal for relaxation.',
    imageUrls: ['/images/cups/jasmine_candle1.png', '/images/cups/jasmine_candle2.png'],
    category: 'cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-oceanbreeze-220',
    name: 'Ocean Breeze Scented Wax Candle',
    price: 21.99,
    description: 'A fresh ocean breeze fragrance candle poured into a vintage floral teacup. Perfect for a refreshing ambiance.',
    imageUrls: ['/images/cups/oceanbreeze_candle1.png', '/images/cups/oceanbreeze_candle2.png'],
    category: 'cup',
    type: 'weighted',
    weight: 220,
  },
  // Featured Cups (weighted)
  {
    id: 'cup-001-220',
    name: 'Vintage Teacup Candle',
    price: 18.99,
    description: 'A charming soy wax candle poured into a vintage floral teacup. Perfect for cozy evenings.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_ks7iawks7iawks7i.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-002-220',
    name: 'Modern Espresso Cup Candle',
    price: 16.49,
    description: 'A sleek candle with bold scents served in a black ceramic espresso cup.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_xnab4oxnab4oxnab.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-003-220',
    name: 'Pastel Latte Cup Candle',
    price: 17.99,
    description: 'Soft pastel colors and a creamy vanilla scent in a latte-style cup.',
    imageUrls: ['/images/cups/pastel-latte-220.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-004-220',
    name: 'Speckled Stoneware Mug Candle',
    price: 19.49,
    description: 'Earthy and calming, this candle is hand-poured in a rustic speckled stoneware mug with a sandalwood scent.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_n7mnain7mnain7mn.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-005-220',
    name: 'Clear Glass Teacup Candle',
    price: 17.25,
    description: 'A minimalistic candle with a lavender scent in a transparent glass teacup. Elegant and fragrant.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_vcendavcendavcen.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-006-220',
    name: 'Artisan Clay Cup Candle',
    price: 18.75,
    description: 'Handcrafted clay cup filled with a eucalyptus-scented soy wax blend. A natural and calming vibe.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_lfru14lfru14lfru.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  {
    id: 'cup-007-220',
    name: 'Retro Diner Mug Candle',
    price: 16.99,
    description: 'Nostalgic vibes with this retro-style diner mug candle, scented with warm cinnamon and vanilla.',
    imageUrls: ['/images/cups/Gemini_Generated_Image_yf8i73yf8i73yf8i.png'],
    category: 'featured-cup',
    type: 'weighted',
    weight: 220,
  },
  // Silicone Molds (non-weighted)
  {
    id: 'torso001',
    name: 'Torso Candle Mold',
    price: 24.99,
    description: 'A detailed silicone mold shaped like a human torso, perfect for elegant candle designs.',
    imageUrls: ['/images/silicone_prod_grid/silicone-torso.png', '/images/silicone_prod_grid/silicone_torso_candle2.jpg'],
    category: 'silicone-mold',
    type: 'non-weighted',
  },
  {
    id: 'heart001',
    name: 'Heart Candle Mold',
    price: 19.99,
    description: 'A romantic heart-shaped silicone mold, ideal for gifts and special occasions.',
    imageUrls: ['/images/silicone_prod_grid/heart_candle1.png', '/images/silicone_prod_grid/heart_candle2.jpg'],
    category: 'silicone-mold',
    type: 'non-weighted',
  },
  {
    id: 'spiral001',
    name: 'Spiral Candle Mold',
    price: 21.5,
    description: 'An artistic spiral silicone mold that creates eye-catching candle designs.',
    imageUrls: ['/images/silicone_prod_grid/silcone-spiral1.png', 'https://example.com/images/spiral-2.jpg'],
    category: 'silicone-mold',
    type: 'non-weighted',
  },
  // Ceramic Candles (non-weighted)
  {
    id: 'candle-001',
    name: 'Minimalist White Ceramic Candle',
    price: 24.99,
    description: 'A hand-poured soy candle in a matte white ceramic container. Perfect for modern home decor.',
    imageUrls: ['/images/ceramic_prod_grid/matte_white_1.png', '/images/ceramic_prod_grid/matte_white_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
  {
    id: 'candle-002',
    name: 'Rustic Earth-Tone Candle Pot',
    price: 29.99,
    description: 'Earthy tones and a natural finish define this ceramic candle, scented with sandalwood and vanilla.',
    imageUrls: ['/images/ceramic_prod_grid/Earthy_tone_1.png', '/images/ceramic_prod_grid/Earthy_tone_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
  {
    id: 'candle-003',
    name: 'Speckled Ceramic Scented Candle',
    price: 19.5,
    description: 'Speckled ceramic jar with a fresh linen scent. Reusable container after the wax burns out.',
    imageUrls: ['/images/ceramic_prod_grid/Speckled ceramic_1.png', '/images/ceramic_prod_grid/Speckled_ceramic_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
  {
    id: 'candle-004',
    name: 'Matte Black Ceramic Candle',
    price: 34.0,
    description: 'A sleek matte black ceramic candle infused with cedarwood and amber. Modern and bold.',
    imageUrls: ['/images/ceramic_prod_grid/Matte_Black_1.png', '/images/ceramic_prod_grid/Matte_Black_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
  {
    id: 'candle-005',
    name: 'Handcrafted Blue Glaze Candle',
    price: 27.75,
    description: 'Hand-thrown ceramic with a glossy blue glaze, filled with a calming lavender soy wax blend.',
    imageUrls: ['/images/ceramic_prod_grid/glossy_blue_glaze_1.png', '/images/ceramic_prod_grid/glossy_blue_glaze_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
  {
    id: 'candle-006',
    name: 'Terracotta Clay Candle Bowl',
    price: 22.5,
    description: 'Rustic terracotta ceramic bowl candle with a wood wick, giving a gentle crackling sound.',
    imageUrls: ['/images/ceramic_prod_grid/Rustic_terracotta_1.png', '/images/ceramic_prod_grid/Rustic_terracotta_2.png'],
    category: 'ceramic-candle',
    type: 'non-weighted',
  },
];