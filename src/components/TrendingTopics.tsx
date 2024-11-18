import React from 'react';
import { TrendingUp, ArrowUp } from 'lucide-react';
import type { TrendingTopic } from '../types/youtube';

interface Props {
  topics: TrendingTopic[];
}

export function TrendingTopics({ topics }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-indigo-500 mr-2" />
        <h2 className="text-2xl font-bold">Trending Topics</h2>
      </div>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div
            key={topic.topic}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{topic.topic}</h3>
              <span className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                {topic.avgViews.toLocaleString()} views
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{topic.count} videos</span>
              <span>{topic.avgEngagement}% engagement</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}