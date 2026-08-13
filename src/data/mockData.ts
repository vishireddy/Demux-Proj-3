import type {
  Farmer,
  CropName,
  WeatherData,
  MandiPrice,
  Blog,
  VideoPost,
  FarmerQuery,
  GovUser,
  AlertRecord,
} from '@/types';

export const cropEmojis: Record<CropName, string> = {
  Paddy: '🌾',
  Cotton: '🌱',
  Maize: '🌽',
  Chilli: '🌶️',
  Groundnut: '🥜',
  Tomato: '🍅',
  Other: '🪴',
};

export const allCrops: CropName[] = [
  'Paddy',
  'Cotton',
  'Maize',
  'Chilli',
  'Groundnut',
  'Tomato',
  'Other',
];

export const demoFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Ravi Kumar',
    mobile: '9876543210',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    village: 'Kazipet',
    crops: [
      { name: 'Chilli', acres: 1.5, emoji: '🌶️' },
      { name: 'Paddy', acres: 2, emoji: '🌾' },
    ],
  },
  {
    id: 'f2',
    name: 'Lakshmi',
    mobile: '9876543211',
    state: 'Telangana',
    district: 'Karimnagar',
    mandal: 'Karimnagar',
    village: 'Manakondur',
    crops: [{ name: 'Cotton', acres: 3, emoji: '🌱' }],
  },
  {
    id: 'f3',
    name: 'Suresh',
    mobile: '9876543212',
    state: 'Telangana',
    district: 'Nalgonda',
    mandal: 'Nalgonda',
    village: 'Chandur',
    crops: [
      { name: 'Paddy', acres: 2.5, emoji: '🌾' },
      { name: 'Maize', acres: 1, emoji: '🌽' },
    ],
  },
];

export const mockWeather: Record<string, WeatherData> = {
  Warangal: {
    location: 'Warangal',
    temp: 32,
    humidity: 68,
    rainProbability: 70,
    condition: 'Cloudy with heavy rain expected',
    emoji: '🌧️',
    tomorrow: { condition: 'Heavy rainfall expected', rainProbability: 85, emoji: '🌧️' },
  },
  Karimnagar: {
    location: 'Karimnagar',
    temp: 35,
    humidity: 45,
    rainProbability: 15,
    condition: 'Sunny and dry',
    emoji: '☀️',
    tomorrow: { condition: 'Clear skies, dry weather', rainProbability: 10, emoji: '☀️' },
  },
  Nalgonda: {
    location: 'Nalgonda',
    temp: 34,
    humidity: 52,
    rainProbability: 40,
    condition: 'Partly cloudy',
    emoji: '⛅',
    tomorrow: { condition: 'Light showers possible', rainProbability: 45, emoji: '🌦️' },
  },
};

export const mockMandiPrices: MandiPrice[] = [
  { crop: 'Chilli', emoji: '🌶️', price: 12000, unit: 'per quintal', trend: 'up', market: 'Warangal Market' },
  { crop: 'Paddy', emoji: '🌾', price: 2200, unit: 'per quintal', trend: 'stable', market: 'Warangal Market' },
  { crop: 'Cotton', emoji: '🌱', price: 7200, unit: 'per quintal', trend: 'up', market: 'Karimnagar Market' },
  { crop: 'Maize', emoji: '🌽', price: 1850, unit: 'per quintal', trend: 'down', market: 'Nalgonda Market' },
  { crop: 'Groundnut', emoji: '🥜', price: 5500, unit: 'per quintal', trend: 'stable', market: 'Nalgonda Market' },
  { crop: 'Tomato', emoji: '🍅', price: 800, unit: 'per quintal', trend: 'down', market: 'Warangal Market' },
];

export const demoGovUsers: GovUser[] = [
  {
    id: 'g_state',
    name: 'State Admin',
    level: 'state',
    state: 'Telangana',
    password: 'admin123',
  },
  {
    id: 'g_district',
    name: 'District Officer - Warangal',
    level: 'district',
    state: 'Telangana',
    district: 'Warangal',
    password: 'admin123',
  },
  {
    id: 'g_mandal',
    name: 'Mandal Officer - Hanamkonda',
    level: 'mandal',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    password: 'admin123',
  },
  {
    id: 'g_village',
    name: 'Village Officer - Kazipet',
    level: 'village',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    village: 'Kazipet',
    password: 'admin123',
  },
];

export const demoBlogs: Blog[] = [
  {
    id: 'b1',
    title: 'How to Prevent Fungal Infection in Chilli Crops',
    category: 'Pest Management',
    content:
      'Fungal infections in chilli crops are common during high humidity. Ensure proper drainage and spacing between plants. Use organic fungicides like neem oil spray every 15 days. Remove infected leaves immediately to prevent spreading.',
    author: 'Dr. Anil Reddy',
    image: 'https://images.pexels.com/photos/2296089/pexels-photo-2296089.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2026-08-10',
    draft: false,
  },
  {
    id: 'b2',
    title: 'Best Practices for Paddy Irrigation',
    category: 'Water Management',
    content:
      'Maintain water level at 2-5 cm during the vegetative stage of paddy. Avoid waterlogging. Drain the field 7-10 days before harvest. Monitor weather forecasts to adjust irrigation schedules and save water.',
    author: 'Dr. Priya Sharma',
    image: 'https://images.pexels.com/photos/2382664/pexels-photo-2382664.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2026-08-08',
    draft: false,
  },
  {
    id: 'b3',
    title: 'Cotton Pest Control: Natural Methods',
    category: 'Pest Management',
    content:
      'Use trap crops like marigold around cotton fields to attract pests away. Introduce natural predators like ladybugs. Apply neem-based pesticides during early morning hours for best results.',
    author: 'Dr. Anil Reddy',
    image: 'https://images.pexels.com/photos/60024/pexels-photo-60024.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2026-08-05',
    draft: false,
  },
];

export const demoVideos: VideoPost[] = [
  {
    id: 'v1',
    title: 'Step-by-Step: Transplanting Paddy Seedlings',
    description: 'Learn the correct technique for transplanting paddy seedlings for maximum yield.',
    category: 'Farming Techniques',
    author: 'Dr. Priya Sharma',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2026-08-09',
    draft: false,
  },
  {
    id: 'v2',
    title: 'How to Identify Early Blight in Tomato',
    description: 'Visual guide to spotting early blight symptoms and taking action quickly.',
    category: 'Disease Control',
    author: 'Dr. Anil Reddy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2026-08-06',
    draft: false,
  },
];

export const demoQueries: FarmerQuery[] = [
  {
    id: 'q1',
    farmerName: 'Ravi Kumar',
    mobile: '9876543210',
    crop: 'Chilli',
    question: 'My chilli leaves are turning yellow and curling. What should I do?',
    date: '2026-08-12',
    answered: true,
    answer:
      'This could be due to thrips pest attack or nutrient deficiency. Apply neem oil spray (5ml per litre) and ensure adequate nitrogen supply. If the problem persists, consult your local Krishi Vigyan Kendra.',
  },
  {
    id: 'q2',
    farmerName: 'Lakshmi',
    mobile: '9876543211',
    crop: 'Cotton',
    question: 'When is the right time to harvest cotton?',
    date: '2026-08-11',
    answered: false,
  },
  {
    id: 'q3',
    farmerName: 'Suresh',
    mobile: '9876543212',
    crop: 'Maize',
    question: 'How much water does maize need during the flowering stage?',
    date: '2026-08-10',
    answered: false,
  },
];

export const demoAlerts: AlertRecord[] = [
  {
    id: 'a1',
    type: 'automated',
    region: 'Warangal',
    crop: 'Paddy, Chilli',
    recipients: 8240,
    channel: 'SMS + Voice',
    status: 'delivered',
    date: '2026-08-12 09:30',
    message: 'Heavy rainfall expected in Warangal. Check drainage in paddy and chilli fields.',
    level: 'district',
  },
  {
    id: 'a2',
    type: 'automated',
    region: 'Karimnagar',
    crop: 'Cotton',
    recipients: 3120,
    channel: 'SMS',
    status: 'sent',
    date: '2026-08-11 14:00',
    message: 'Dry weather alert. Ensure adequate irrigation for cotton crops.',
    level: 'district',
  },
  {
    id: 'a3',
    type: 'custom',
    region: 'Kazipet',
    crop: 'Chilli',
    recipients: 620,
    channel: 'SMS + Voice',
    status: 'delivered',
    date: '2026-08-10 11:00',
    message: 'Mandi price update: Chilli prices rising. Consider selling this week.',
    level: 'village',
  },
];

export const knowledgeArticles = [
  {
    id: 'k1',
    title: 'Understanding Soil Health',
    emoji: '🌱',
    content:
      'Healthy soil is the foundation of good farming. Test your soil every 2-3 years. Add organic compost regularly. Rotate crops to maintain soil nutrients. Avoid overuse of chemical fertilizers.',
  },
  {
    id: 'k2',
    title: 'Water Conservation Techniques',
    emoji: '💧',
    content:
      'Use drip irrigation to save up to 60% water. Mulch your fields to reduce evaporation. Harvest rainwater in small pits. Water plants early morning or late evening to minimize loss.',
  },
  {
    id: 'k3',
    title: 'Organic Pest Control',
    emoji: '🐛',
    content:
      'Neem oil, cow urine, and buttermilk sprays are effective organic pest controls. Introduce beneficial insects like ladybugs. Plant marigold as a border crop to repel pests naturally.',
  },
  {
    id: 'k4',
    title: 'Crop Rotation Benefits',
    emoji: '🔄',
    content:
      'Rotate crops each season to prevent soil depletion and reduce pest buildup. Legumes add nitrogen to soil. Never plant the same crop family in the same field for two consecutive seasons.',
  },
  {
    id: 'k5',
    title: 'Seed Selection Guide',
    emoji: '🌰',
    content:
      'Choose certified seeds from reliable sources. Check germination rate before sowing. Store seeds in cool, dry places. Replace seeds every 2-3 seasons for best yield.',
  },
  {
    id: 'k6',
    title: 'Composting at Home',
    emoji: '♻️',
    content:
      'Create compost from kitchen waste, dry leaves, and cow dung. Turn the pile every 7 days. Compost is ready in 45-60 days. Use it as natural fertilizer to improve soil fertility.',
  },
];
