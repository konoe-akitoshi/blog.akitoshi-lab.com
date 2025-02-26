import React from 'react';

interface ThumbnailProps {
  title: string;
  thumbnail: string;
  created_at: string;
  tags?: string[];
}

const Thumbnail: React.FC<ThumbnailProps> = ({ title, thumbnail, created_at, tags }) => (
  <div
    className="relative w-full h-72 bg-cover bg-center rounded-lg shadow-lg"
    style={{ backgroundImage: `url(${thumbnail})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <div className="flex items-center justify-between text-gray-300 text-sm">
        <span>{new Date(created_at).toLocaleDateString()}</span>
        <div className="flex gap-2">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              >
                #{tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default Thumbnail;
