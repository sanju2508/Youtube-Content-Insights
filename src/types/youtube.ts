export interface ChannelData {
  id: string;
  title: string;
  description: string;
  subscribers: number;
  views: number;
  videoCount: number;
  thumbnail: string;
  country?: string;
  joinedDate: string;
  customUrl?: string;
  bannerUrl?: string;
}

export interface VideoData {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: string;
  tags: string[];
}

export interface TrendingTopic {
  topic: string;
  count: number;
  avgViews: number;
  avgEngagement: number;
  trend: 'up' | 'down' | 'stable';
}

export interface EngagementMetrics {
  avgViewsPerVideo: number;
  avgLikesPerVideo: number;
  avgCommentsPerVideo: number;
  engagementRate: number;
  viewsGrowthRate: number;
}