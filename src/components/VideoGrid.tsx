import React from 'react';
import { Clock, MessageCircle, ThumbsUp } from 'lucide-react';
import type { VideoData } from '../types/youtube';

interface Props {
  videos: VideoData[];
}

export function VideoGrid({ videos }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600">
              {video.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(video.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {video.likes.toLocaleString()}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {video.comments.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}