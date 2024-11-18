import React from 'react';
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import type { ChannelData } from '../types/youtube';

interface Props {
  channel: ChannelData;
}

export function ChannelHeader({ channel }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      {channel.bannerUrl && (
        <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${channel.bannerUrl})` }} />
      )}
      <div className="p-6">
        <div className="flex items-start space-x-6">
          <img
            src={channel.thumbnail}
            alt={channel.title}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{channel.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {channel.country && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {channel.country}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(channel.joinedDate).toLocaleDateString()}
              </div>
              {channel.customUrl && (
                <a
                  href={`https://youtube.com/${channel.customUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  {channel.customUrl}
                </a>
              )}
            </div>
            <p className="text-gray-700 line-clamp-2">{channel.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}