import React, { useState } from 'react';
import { Search, Youtube } from 'lucide-react';
import { ChannelHeader } from './components/ChannelHeader';
import { ChannelStats } from './components/ChannelStats';
import { VideoGrid } from './components/VideoGrid';
import { EngagementMetrics } from './components/EngagementMetrics';
import { TrendingTopics } from './components/TrendingTopics';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingState } from './components/LoadingState';
import { useYouTubeData } from './hooks/useYouTubeData';

function App() {
  const [channelId, setChannelId] = useState('');
  const { channelData, videos, engagementMetrics, loading, error, analyzeChannel } = useYouTubeData();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelId.trim()) {
      await analyzeChannel(channelId.trim());
    }
  };

  // Sample data for the engagement chart
  const recentData = videos.slice(0, 10).map((video) => ({
    date: new Date(video.publishedAt).toLocaleDateString(),
    views: video.views,
    engagement: ((video.likes + video.comments) / video.views) * 100,
  })).reverse();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Youtube className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">
                YouTube Content Insights
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleAnalyze}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="Enter YouTube Channel ID"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 shadow-md"
          >
            {loading ? 'Analyzing...' : 'Analyze Channel'}
          </button>
        </form>

        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingState />
        ) : (
          channelData && (
            <>
              <ChannelHeader channel={channelData} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <ChannelStats data={channelData} />
                </div>
                <div>
                  <TrendingTopics
                    topics={videos.slice(0, 5).map((video) => ({
                      topic: video.title,
                      count: 1,
                      avgViews: video.views,
                      avgEngagement: ((video.likes + video.comments) / video.views) * 100,
                      trend: 'up',
                    }))}
                  />
                </div>
              </div>
              {engagementMetrics && (
                <div className="mb-8">
                  <EngagementMetrics
                    metrics={engagementMetrics}
                    recentData={recentData}
                  />
                </div>
              )}
              <VideoGrid videos={videos} />
            </>
          )
        )}
      </main>
    </div>
  );
}

export default App;