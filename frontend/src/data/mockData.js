import ayurvm from '../../src/assets/1000285537.jpg'
import yuma from '../../src/assets/08.jpg'
export const concerns = [
  { id: 'diabetic-wellness', name: 'Diabetic Wellness', icon: 'Activity', desc: 'Blood sugar & glucose management' },
  { id: 'womens-wellness', name: "Women's Wellness", icon: 'Heart', desc: 'Hormonal & vitality balance' },
  { id: 'digestive-wellness', name: 'Digestive Wellness', icon: 'Zap', desc: 'Gut clean & metabolism boost' },
  { id: 'pain-reliever', name: 'Pain Reliever', icon: 'Shield', desc: 'Joint, muscle & back relief' },
  { id: 'cardiac-wellness', name: 'Cardiac Wellness', icon: 'HeartPulse', desc: 'Heart health & blood flow' },
  { id: 'skin-wellness', name: 'Skin Wellness', icon: 'Sun', desc: 'Natural glow & complexion' }
];

export const productCategories = [
  { name: 'Herbal Juices', slug: 'herbal-juices', count: 18, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', icon: 'GlassWater' },
  { name: 'Herbal Powders & Churna', slug: 'herbal-powders-churna', count: 24, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80', icon: 'Sparkles' },
  { name: 'Tablets & Capsules', slug: 'tablets-capsules', count: 32, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80', icon: 'Pill' },
  { name: 'Herbal Oil', slug: 'herbal-oil', count: 15, image: 'https://images.unsplash.com/photo-1608248597309-9486c9f69747?auto=format&fit=crop&w=500&q=80', icon: 'Flame' },
  { name: 'Skin Wellness', slug: 'skin-care', count: 20, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80', icon: 'Smile' },
  { name: 'Exclusive Formulations', slug: 'exclusive-formulations', count: 12, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=80', icon: 'Award' }
];

export const products = [
  {
    id: 1,
    slug: 'diabacare-herbal-juice-1000ml',
    name: 'DiabaCare Herbal Juice (1000ml)',
    category: 'Herbal Juices',
    concern: 'Diabetic Wellness',
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviews: 142,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Synergistic blend of Karela, Jamun, Gurmar, and Methi seeds to naturally balance blood sugar and support pancreatic function.',
    ingredients: ['Karela (30%)', 'Jamun (30%)', 'Gurmar (25%)', 'Methi (15%)'],
    inStock: true
  },
  {
    id: 2,
    slug: 'triphala-gut-balance-churna-250g',
    name: 'Triphala Gut Balance Churna (250g)',
    category: 'Herbal Powders & Churna',
    concern: 'Digestive Wellness',
    price: 220,
    originalPrice: 299,
    rating: 4.9,
    reviews: 210,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    description: 'Classical blend of Amla, Haritaki, and Bibhitaki to gently cleanse the bowel and remove metabolic toxins.',
    ingredients: ['Amla', 'Haritaki', 'Bibhitaki'],
    inStock: true
  },
  {
    id: 3,
    slug: 'ashwagandha-supreme-vitality-capsules-60-tabs',
    name: 'Ashwagandha Supreme Vitality Capsules (60 Tabs)',
    category: 'Tablets & Capsules',
    concern: 'Immunity Wellness',
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    reviews: 98,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    description: 'High potency root extract KSM-66 to lower cortisol, fight chronic fatigue, and boost stamina.',
    ingredients: ['Pure Ashwagandha Root Extract 500mg'],
    inStock: true
  },
  {
    id: 4,
    slug: 'maha-bhringraj-hair-growth-oil-200ml',
    name: 'Maha Bhringraj Hair Growth Oil (200ml)',
    category: 'Herbal Oil',
    concern: 'Hair Wellness',
    price: 329,
    originalPrice: 399,
    rating: 4.8,
    reviews: 176,
    isBestseller: true,
    image: ayurvm,
    description: 'Authentic Kshirpak Ayurvedic oil with Bhringraj and Brahmi to nourish roots and prevent hair fall.',
    ingredients: ['Bhringraj', 'Brahmi', 'Amla', 'Sesame Oil'],
    inStock: true
  },
  {
    id: 5,
    slug: 'kumkumadi-radiant-glow-face-serum-30ml',
    name: 'Kumkumadi Radiant Glow Face Serum (30ml)',
    category: 'Skin Wellness',
    concern: 'Skin Wellness',
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviews: 165,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'Luxurious Kashmiri Saffron and Sandalwood serum for hyperpigmentation and luminous complexion.',
    ingredients: ['Kashmiri Saffron', 'Sandalwood', 'Manjistha', 'Lotus Extract'],
    inStock: true
  },
  {
    id: 6,
    slug: 'shatavari-women-vitality-capsules-60-tabs',
    name: 'Shatavari Women Vitality Capsules (60 Tabs)',
    category: 'Tablets & Capsules',
    concern: "Women's Wellness",
    price: 399,
    originalPrice: 520,
    rating: 4.9,
    reviews: 89,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
    description: 'Empowering botanical adaptogen for female hormonal harmony and stamina.',
    ingredients: ['Shatavari Extract 500mg'],
    inStock: true
  },
  {
    id: 7,
    slug: 'orthocare-herbal-joint-pain-oil-100ml',
    name: 'Orthocare Herbal Joint Pain Oil (100ml)',
    category: 'Herbal Oil',
    concern: 'Pain Reliever',
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 115,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    description: 'Fast acting liniment with Mahanarayan Taila and Camphor for instant joint and back pain relief.',
    ingredients: ['Mahanarayan Oil', 'Wintergreen Oil', 'Camphor'],
    inStock: true
  },
  {
    id: 8,
    slug: 'arjuna-heart-guard-tablets-60-tabs',
    name: 'Arjuna Heart Guard Tablets (60 Tabs)',
    category: 'Tablets & Capsules',
    concern: 'Cardiac Wellness',
    price: 349,
    originalPrice: 450,
    rating: 4.6,
    reviews: 54,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1550572017-edf97f5a9163?auto=format&fit=crop&w=600&q=80',
    description: 'Cardioprotective Arjuna bark extract for maintaining vascular muscle tone and blood flow.',
    ingredients: ['Arjuna Bark Extract 500mg'],
    inStock: true
  }
];

export const combos = [
  {
    id: 101,
    name: 'Complete Diabetic Care Bundle',
    discountPercent: 32,
    comboPrice: 749,
    originalPrice: 1098,
    description: 'DiabaCare Herbal Juice (1000ml) + Gurmar Tablets (60 Tabs) for 30-day glucose management.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 102,
    name: 'Total Gut Detox & Digestion Pack',
    discountPercent: 31,
    comboPrice: 549,
    originalPrice: 798,
    description: 'Triphala Gut Churna (250g) + Aloe Vera Wheatgrass Juice (1000ml) for total gut renewal.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 103,
    name: 'Hair Nourishment & Growth Combo',
    discountPercent: 24,
    comboPrice: 699,
    originalPrice: 919,
    description: 'Maha Bhringraj Hair Oil (200ml) + Amla Shikakai Herbal Hair Cleanser (300ml).',
    image: yuma
  },
  {
    id: 104,
    name: 'Stress Relief & Immunity Duo',
    discountPercent: 28,
    comboPrice: 799,
    originalPrice: 1119,
    description: 'Ashwagandha Supreme Capsules (60 Tabs) + Giloy Tulsi Immunity Drops (50ml).',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80'
  }
];

export const blogs = [
  {
    id: 1,
    title: 'Understanding Doshas: Vata, Pitta, and Kapha Body Types',
    category: 'Ayurvedic Principles',
    excerpt: 'Discover your unique Ayurvedic mind-body constitution and balance your doshas naturally.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    date: 'July 15, 2026'
  },
  {
    id: 2,
    title: '5 Powerful Herbs to Regulate Blood Sugar Naturally',
    category: 'Diabetic Wellness',
    excerpt: 'Classical herbs like Gurmar, Karela, and Methi trusted for centuries for sugar balance.',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80',
    date: 'July 20, 2026'
  },
  {
    id: 3,
    title: 'The Golden Ritual of Kumkumadi: Ancient Skin Radiance',
    category: 'Skin Care',
    excerpt: 'Why Kashmiri Saffron and Sandalwood oil remain the ultimate elixir for glowing skin.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    date: 'July 22, 2026'
  },
  {
    id: 4,
    title: 'How Triphala Restores Gut Microflora & Agni',
    category: 'Digestive Health',
    excerpt: 'Learn how this famous three-fruit blend detoxifies the stomach without altering flora.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    date: 'July 24, 2026'
  }
];