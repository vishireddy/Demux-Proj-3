import type { CropName, WeatherData } from '@/types';

interface Recommendation {
  crop: CropName;
  emoji: string;
  advice: string;
  severity: 'good' | 'warning' | 'danger';
}

export function getRecommendations(
  weather: WeatherData,
  crops: { name: CropName; emoji: string }[]
): Recommendation[] {
  return crops.map(({ name, emoji }) => {
    const rain = weather.rainProbability;
    const temp = weather.temp;
    const humidity = weather.humidity;

    let advice = '';
    let severity: 'good' | 'warning' | 'danger' = 'good';

    if (name === 'Paddy') {
      if (rain > 70) {
        advice = 'Heavy rainfall expected. Monitor water levels in paddy fields. Ensure drainage channels are clear to prevent flooding.';
        severity = 'warning';
      } else if (rain < 20) {
        advice = 'Dry weather ahead. Ensure adequate irrigation for paddy. Maintain water level at 2–5 cm in the field.';
        severity = 'warning';
      } else {
        advice = 'Weather conditions are suitable for paddy. Continue regular irrigation and monitor for pest activity.';
        severity = 'good';
      }
    } else if (name === 'Chilli') {
      if (rain > 60 || humidity > 70) {
        advice = 'High humidity and rain can cause fungal diseases in chilli. Check drainage and apply neem oil spray as a precaution.';
        severity = 'danger';
      } else if (temp > 38) {
        advice = 'Very high temperature may cause flower drop in chilli. Provide light irrigation to cool the root zone.';
        severity = 'warning';
      } else {
        advice = 'Good conditions for chilli. Monitor for thrips and mites. Apply foliar nutrition if leaves show yellowing.';
        severity = 'good';
      }
    } else if (name === 'Cotton') {
      if (rain > 60) {
        advice = 'Heavy rain can cause boll rot in cotton. Ensure field drainage and avoid waterlogging near the base.';
        severity = 'warning';
      } else if (humidity < 40) {
        advice = 'Low humidity: watch for red spider mites in cotton. Use miticide spray if needed. Irrigate adequately.';
        severity = 'warning';
      } else {
        advice = 'Favorable weather for cotton. Check for bollworm and apply recommended pesticide if infestation is detected.';
        severity = 'good';
      }
    } else if (name === 'Maize') {
      if (rain > 70) {
        advice = 'Heavy rainfall can cause waterlogging which damages maize roots. Drain excess water immediately.';
        severity = 'danger';
      } else if (temp > 38) {
        advice = 'High temperature during silking stage can reduce maize yield. Irrigate in the evening to reduce heat stress.';
        severity = 'warning';
      } else {
        advice = 'Conditions suitable for maize. Monitor for fall armyworm. Apply nitrogen fertilizer at knee-high stage.';
        severity = 'good';
      }
    } else if (name === 'Groundnut') {
      if (rain > 65) {
        advice = 'Excess rain can cause leaf spot in groundnut. Spray mancozeb fungicide after the rain stops.';
        severity = 'warning';
      } else if (rain < 15) {
        advice = 'Dry spell: irrigate groundnut at pegging and pod filling stages for good yield.';
        severity = 'warning';
      } else {
        advice = 'Good weather for groundnut. Ensure earthing up is done for better pod development.';
        severity = 'good';
      }
    } else if (name === 'Tomato') {
      if (humidity > 75) {
        advice = 'High humidity increases risk of early blight in tomato. Apply copper fungicide and improve air circulation.';
        severity = 'danger';
      } else if (temp > 35) {
        advice = 'High temperature can cause blossom drop in tomato. Provide shade net and drip irrigate in the mornings.';
        severity = 'warning';
      } else {
        advice = 'Good growing conditions for tomato. Support plants with stakes and check for whitefly infestation.';
        severity = 'good';
      }
    } else {
      if (rain > 65) {
        advice = 'Heavy rainfall expected. Check field drainage and protect crops from waterlogging.';
        severity = 'warning';
      } else {
        advice = 'Weather looks stable. Continue regular crop monitoring and scheduled fertilization.';
        severity = 'good';
      }
    }

    return { crop: name, emoji, advice, severity };
  });
}

export function getAlerts(weather: WeatherData, crops: { name: CropName }[]): string[] {
  const alerts: string[] = [];
  if (weather.rainProbability > 70) {
    alerts.push(`Heavy rainfall expected in ${weather.location}. Check drainage on all fields.`);
  }
  if (weather.temp > 38) {
    alerts.push(`Extreme heat (${weather.temp}°C) in ${weather.location}. Irrigate crops to reduce heat stress.`);
  }
  if (weather.humidity > 75) {
    alerts.push(`Very high humidity (${weather.humidity}%). Risk of fungal diseases. Monitor crops closely.`);
  }
  if (crops.some(c => c.name === 'Chilli') && weather.rainProbability > 60) {
    alerts.push('Chilli Alert: Fungal infection risk due to high moisture. Apply neem oil spray.');
  }
  if (crops.some(c => c.name === 'Paddy') && weather.rainProbability < 15) {
    alerts.push('Paddy Alert: Dry spell ahead. Ensure fields have adequate water level.');
  }
  return alerts;
}
