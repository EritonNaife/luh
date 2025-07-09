
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  weight: number;
}

export interface Mold{
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
}

export const cups: Product[] = [
  
    {
      id: 'cup-001-220',
      name: 'Vintage Teacup Candle',
      price: 18.99,
      description: 'A charming soy wax candle poured into a vintage floral teacup. Perfect for cozy evenings.',
      imageUrl: '/images/cups/Gemini_Generated_Image_ks7iawks7iawks7i.png',
      weight: 220
    },

    {
      id: 'cup-001-320',
      name: 'Vintage Teacup Candle',
      price: 23.99,
      description: 'A charming soy wax candle poured into a vintage floral teacup. Perfect for cozy evenings.',
      imageUrl: '/images/cups/Gemini_Generated_Image_ks7iawks7iawks7i.png',
      weight: 320
    },

    {
      id: 'cup-002-220',
      name: 'Modern Espresso Cup Candle',
      price: 16.49,
      description: 'A sleek candle with bold scents served in a black ceramic espresso cup.',
      imageUrl: '/images/cups/Gemini_Generated_Image_xnab4oxnab4oxnab.png',
      weight: 220
    },

    {
      id: 'cup-002-320',
      name: 'Modern Espresso Cup Candle',
      price: 21.49,
      description: 'A sleek candle with bold scents served in a black ceramic espresso cup.',
      imageUrl: '/images/cups/Gemini_Generated_Image_xnab4oxnab4oxnab.png',
      weight: 320
    },

    {

      id: 'cup-003-220',
      name: 'Pastel Latte Cup Candle',
      price: 17.99,
      description: 'Soft pastel colors and a creamy vanilla scent in a latte-style cup.',
      imageUrl: '/images/cups/pastel-latte-220.png',
      weight: 220
    },

    {
      id: 'cup-003-320',
      name: 'Pastel Latte Cup Candle',
      price: 22.99,
      description: 'Soft pastel colors and a creamy vanilla scent in a latte-style cup.',
      imageUrl: '/images/cups/pastel-latte-220.jpg',
      weight: 320
    },

    {
      id: 'cup-004-220',
      name: 'Speckled Stoneware Mug Candle',
      price: 19.49,
      description: 'Earthy and calming, this candle is hand-poured in a rustic speckled stoneware mug with a sandalwood scent.',
      imageUrl: '/images/cups/Gemini_Generated_Image_n7mnain7mnain7mn.png',
      weight: 220
    },

    {
      id: 'cup-004-320',
      name: 'Speckled Stoneware Mug Candle',
      price: 24.49,
      description: 'Earthy and calming, this candle is hand-poured in a rustic speckled stoneware mug with a sandalwood scent.',
      imageUrl: '/images/cups/Gemini_Generated_Image_n7mnain7mnain7mn.png',
      weight: 320
    },

    {
      id: 'cup-005-220',
      name: 'Clear Glass Teacup Candle',
      price: 17.25,
      description: 'A minimalistic candle with a lavender scent in a transparent glass teacup. Elegant and fragrant.',
      imageUrl: '/images/cups/Gemini_Generated_Image_vcendavcendavcen.png',
      weight: 220
    },
    
    {
      id: 'cup-005-320',
      name: 'Clear Glass Teacup Candle',
      price: 22.25,
      description: 'A minimalistic candle with a lavender scent in a transparent glass teacup. Elegant and fragrant.',
      imageUrl: '/images/cups/Gemini_Generated_Image_vcendavcendavcen.png',
      weight: 320
    },

    {
      id: 'cup-006-220',
      name: 'Artisan Clay Cup Candle',
      price: 18.75,
      description: 'Handcrafted clay cup filled with a eucalyptus-scented soy wax blend. A natural and calming vibe.',
      imageUrl: '/images/cups/Gemini_Generated_Image_lfru14lfru14lfru.png',
      weight: 220
    },

    {
      id: 'cup-006-320',
      name: 'Artisan Clay Cup Candle',
      price: 23.75,
      description: 'Handcrafted clay cup filled with a eucalyptus-scented soy wax blend. A natural and calming vibe.',
      imageUrl: '/images/cups/Gemini_Generated_Image_lfru14lfru14lfru.png',
      weight: 320
    },

    {
      id: 'cup-007-220',
      name: 'Retro Diner Mug Candle',
      price: 16.99,
      description: 'Nostalgic vibes with this retro-style diner mug candle, scented with warm cinnamon and vanilla.',
      imageUrl: '/images/retro-diner-220.jpg',
      weight: 220
    },

    {
      id: 'cup-007-320',
      name: 'Retro Diner Mug Candle',
      price: 21.99,
      description: 'Nostalgic vibes with this retro-style diner mug candle, scented with warm cinnamon and vanilla.',
      imageUrl: '/images/cups/Gemini_Generated_Image_yf8i73yf8i73yf8i.png',
      weight: 320
    }
];


export const featuredCups: Product[] = [

    {
      id: 'cup-001-220',
      name: 'Vintage Teacup Candle',
      price: 18.99,
      description: 'A charming soy wax candle poured into a vintage floral teacup. Perfect for cozy evenings.',
      imageUrl: '/images/cups/Gemini_Generated_Image_ks7iawks7iawks7i.png',
      weight: 220
    },

    {
      id: 'cup-002-220',
      name: 'Modern Espresso Cup Candle',
      price: 16.49,
      description: 'A sleek candle with bold scents served in a black ceramic espresso cup.',
      imageUrl: '/images/cups/Gemini_Generated_Image_xnab4oxnab4oxnab.png',
      weight: 220
    },

    {

      id: 'cup-003-220',
      name: 'Pastel Latte Cup Candle',
      price: 17.99,
      description: 'Soft pastel colors and a creamy vanilla scent in a latte-style cup.',
      imageUrl: '/images/cups/pastel-latte-220.png',
      weight: 220
    },

    {
      id: 'cup-004-220',
      name: 'Speckled Stoneware Mug Candle',
      price: 19.49,
      description: 'Earthy and calming, this candle is hand-poured in a rustic speckled stoneware mug with a sandalwood scent.',
      imageUrl: '/images/cups/Gemini_Generated_Image_n7mnain7mnain7mn.png',
      weight: 220
    },

    {
      id: 'cup-005-220',
      name: 'Clear Glass Teacup Candle',
      price: 17.25,
      description: 'A minimalistic candle with a lavender scent in a transparent glass teacup. Elegant and fragrant.',
      imageUrl: '/images/cups/Gemini_Generated_Image_vcendavcendavcen.png',
      weight: 220
    },

    {
      id: 'cup-006-220',
      name: 'Artisan Clay Cup Candle',
      price: 18.75,
      description: 'Handcrafted clay cup filled with a eucalyptus-scented soy wax blend. A natural and calming vibe.',
      imageUrl: '/images/cups/Gemini_Generated_Image_lfru14lfru14lfru.png',
      weight: 220
    },

    {
      id: 'cup-007-220',
      name: 'Retro Diner Mug Candle',
      price: 16.99,
      description: 'Nostalgic vibes with this retro-style diner mug candle, scented with warm cinnamon and vanilla.',
      imageUrl: '/images/cups/Gemini_Generated_Image_yf8i73yf8i73yf8i.png',
      weight: 220
    }
];

export const siliconeMolds: Mold[] = [
  {
    id: "torso001",
    name: "Torso Candle Mold",
    price: 24.99,
    description: "A detailed silicone mold shaped like a human torso, perfect for elegant candle designs.",
    imageUrls: [
      "/images/silicone_prod_grid/silicone-torso.png",
      "/images/silicone_prod_grid/silicone_torso_candle2.jpg"
    ]
  },
  {
    id: "heart001",
    name: "Heart Candle Mold",
    price: 19.99,
    description: "A romantic heart-shaped silicone mold, ideal for gifts and special occasions.",
    imageUrls: [
      "/images/silicone_prod_grid/heart_candle1.png",
      "/images/silicone_prod_grid/heart_candle2.jpg.jpg"
    ]
  },
  {
    id: "spiral001",
    name: "Spiral Candle Mold",
    price: 21.5,
    description: "An artistic spiral silicone mold that creates eye-catching candle designs.",
    imageUrls: [
      "/images/silicone_prod_grid/silcone-spiral1.png",
      "https://example.com/images/spiral-2.jpg"
    ]
  }
];