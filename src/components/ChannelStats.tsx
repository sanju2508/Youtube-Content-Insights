import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, Video } from 'lucide-react';
import type { ChannelData } from '../types/youtube';

interface Props {
  data: ChannelData;
}

export function ChannelStats({ data }: Props) {
  const stats = [
    {
      label: 'Subscribers',
      value: data.subscribers.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Total Views',
      value: data.views.toLocaleString(),
      icon: Eye,
      color: 'text-green-500',
    },
    {
      label: 'Videos',
      value: data.videoCount.toLocaleString(),
      icon: Video,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Channel Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mr-4`} />
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { name: 'Views', value: data.views },
              { name: 'Subscribers', value: data.subscribers },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}