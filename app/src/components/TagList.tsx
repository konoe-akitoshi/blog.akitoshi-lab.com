import React from 'react';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';

interface TagListProps {
  tags?: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center mt-4 space-x-2">
      <FiTag className="text-gray-700" />
      <div className="flex flex-wrap space-x-2">
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/tags/${tag}`}
            className="text-sm text-blue-500 border border-blue-500 px-2 py-1 rounded transition-colors hover:bg-blue-500 hover:text-white"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;
