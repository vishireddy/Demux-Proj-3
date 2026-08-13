export type UserRole = 'farmer' | 'expert' | 'government';

export type GovLevel = 'state' | 'district' | 'mandal' | 'village';

export type Lang = 'en' | 'te' | 'hi';

export type CropName =
  | 'Paddy'
  | 'Cotton'
  | 'Maize'
  | 'Chilli'
  | 'Groundnut'
  | 'Tomato'
  | 'Other';

export interface Crop {
  name: CropName;
  acres: number;
  emoji: string;
}

export interface Farmer {
  id: string;
  name: string;
  mobile: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  crops: Crop[];
}

export interface WeatherData {
  location: string;
  temp: number;
  humidity: number;
  rainProbability: number;
  condition: string;
  emoji: string;
  tomorrow: {
    condition: string;
    rainProbability: number;
    emoji: string;
  };
}

export interface MandiPrice {
  crop: string;
  emoji: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  market: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  image: string;
  date: string;
  draft: boolean;
}

export interface VideoPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  videoUrl: string;
  date: string;
  draft: boolean;
}

export interface FarmerQuery {
  id: string;
  farmerName: string;
  mobile: string;
  crop: string;
  question: string;
  date: string;
  answered: boolean;
  answer?: string;
}

export interface GovUser {
  id: string;
  name: string;
  level: GovLevel;
  state: string;
  district?: string;
  mandal?: string;
  village?: string;
  password: string;
}

export interface AlertRecord {
  id: string;
  type: 'automated' | 'custom';
  region: string;
  crop?: string;
  recipients: number;
  channel: string;
  status: 'pending' | 'sending' | 'sent' | 'delivered' | 'failed';
  date: string;
  message: string;
  level: GovLevel;
}

export interface SentMessage {
  id: string;
  region: string;
  crop?: string;
  channel: 'SMS' | 'Voice' | 'IVR';
  language: Lang;
  message: string;
  recipients: number;
  status: 'pending' | 'sending' | 'sent' | 'delivered' | 'failed';
  date: string;
}
