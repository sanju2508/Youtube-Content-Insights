import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
}