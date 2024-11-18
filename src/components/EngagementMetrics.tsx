import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Zap } from 'lucide-react';
import type { EngagementMetrics } from '../types/youtube';

interface Props {
  metrics: EngagementMetrics;
  recentData: Array<{ date: string; views: number; engagement: number }>;
}

export function EngagementMetrics({ metrics, recentData }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Zap className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold">Engagement Overview</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Avg. Views',
            value: metrics.avgViewsPerVideo.toLocaleString(),
            color: 'text-blue-500',
          },
          {
            label: 'Engagement Rate',
            value: `${metrics.engagementRate.toFixed(2)}%`,
            color: 'text-green-500',
          },
          {
            label: 'Avg. Likes',
            value: metrics.avgLikesPerVideo.toLocaleString(),
            color: 'text-purple-500',
          },
          {
            label: 'Growth Rate',
            value: `${metrics.viewsGrowthRate > 0 ? '+' : ''}${metrics.viewsGrowthRate.toFixed(2)}%`,
            color: metrics.viewsGrowthRate > 0 ? 'text-green-500' : 'text-red-500',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 rounded-lg p-4"
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={recentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="engagement"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}