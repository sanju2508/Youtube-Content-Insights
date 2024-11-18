import { useState, useCallback } from 'react';
import { getChannelData, getChannelVideos, formatDuration } from '../services/youtube';
import type { ChannelData, VideoData, EngagementMetrics } from '../types/youtube';

export function useYouTubeData() {
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateEngagementMetrics = (videos: VideoData[]): EngagementMetrics => {
    const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
    const totalLikes = videos.reduce((sum, video) => sum + video.likes, 0);
    const totalComments = videos.reduce((sum, video) => sum + video.comments, 0);

    const avgViews = totalViews / videos.length;
    const engagementRate = ((totalLikes + totalComments) / totalViews) * 100;

    // Calculate growth rate using the first and last video
    const oldestViews = videos[videos.length - 1]?.views || 0;
    const newestViews = videos[0]?.views || 0;
    const viewsGrowthRate = ((newestViews - oldestViews) / oldestViews) * 100;

    return {
      avgViewsPerVideo: Math.round(avgViews),
      avgLikesPerVideo: Math.round(totalLikes / videos.length),
      avgCommentsPerVideo: Math.round(totalComments / videos.length),
      engagementRate,
      viewsGrowthRate,
    };
  };

  const analyzeChannel = useCallback(async (channelId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const channelResponse = await getChannelData(channelId);
      const { snippet, statistics, brandingSettings } = channelResponse;
      
      setChannelData({
        id: channelId,
        title: snippet.title,
        description: snippet.description,
        subscribers: parseInt(statistics.subscriberCount),
        views: parseInt(statistics.viewCount),
        videoCount: parseInt(statistics.videoCount),
        thumbnail: snippet.thumbnails.high.url,
        country: snippet.country,
        joinedDate: snippet.publishedAt,
        customUrl: snippet.customUrl,
        bannerUrl: brandingSettings?.image?.bannerExternalUrl,
      });

      const videosResponse = await getChannelVideos(channelId);
      const processedVideos = videosResponse.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        views: parseInt(item.statistics?.viewCount || '0'),
        likes: parseInt(item.statistics?.likeCount || '0'),
        comments: parseInt(item.statistics?.commentCount || '0'),
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        duration: formatDuration(item.contentDetails?.duration || 'PT0S'),
        tags: item.snippet.tags || [],
      }));

      setVideos(processedVideos);
      setEngagementMetrics(calculateEngagementMetrics(processedVideos));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch channel data');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    channelData,
    videos,
    engagementMetrics,
    loading,
    error,
    analyzeChannel,
  };
}