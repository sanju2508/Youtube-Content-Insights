const API_KEY = 'AIzaSyAreWmd7c8bKoCQ4v-Df_NJMjOVew32pjs';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function getChannelData(channelId: string) {
  const response = await fetch(
    `${BASE_URL}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
  );
  const data = await response.json();
  
  if (!data.items?.length) {
    throw new Error('Channel not found');
  }
  
  return data.items[0];
}

export async function getChannelVideos(channelId: string) {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${API_KEY}`
  );
  const data = await response.json();
  
  if (!data.items?.length) {
    return [];
  }

  // Get detailed video statistics
  const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
  const statsResponse = await fetch(
    `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
  );
  const statsData = await statsResponse.json();

  return data.items.map((item: any, index: number) => ({
    ...item,
    statistics: statsData.items[index]?.statistics || {},
    contentDetails: statsData.items[index]?.contentDetails || {},
  }));
}

export async function getSimilarChannels(query: string) {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&type=channel&q=${query}&maxResults=10&key=${API_KEY}`
  );
  const data = await response.json();
  return data.items || [];
}

export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  const parts = [];
  if (hours) parts.push(hours.padStart(2, '0'));
  parts.push((minutes || '0').padStart(2, '0'));
  parts.push((seconds || '0').padStart(2, '0'));
  
  return parts.join(':');
}