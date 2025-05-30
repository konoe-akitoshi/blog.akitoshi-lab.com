import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LinkCard = ({ url }) => {
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const response = await fetch(`/api/meta?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeta(data);
      } catch (err) {
        console.error('Failed to fetch metadata:', err);
        setError(true);
      }
    };

    fetchMeta();
  }, [url]);

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded shadow">
        <a
          href={url}
          target="_blank"
          rel="nofollow noopener"
          className="underline text-red-700 hover:text-red-600"
        >
          リンクを開く: {url}
        </a>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow noopener"
      className="block text-gray-800 hover:text-gray-900"
    >
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded overflow-hidden mb-4">
        {meta?.image && (
          <div className="w-full md:w-1/3 h-48 md:h-auto">
            <img
              src={meta.image}
              alt={meta.title || 'サムネイル'}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-4 w-full">
          <h5 className="text-lg font-bold text-gray-900">
            {meta?.title || 'リンクのタイトル'}
          </h5>
          <p className="text-sm text-gray-600 truncate">
            {meta?.description || '説明がありません'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {url}
          </p>
        </div>
      </div>
    </a>
  );
};

LinkCard.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LinkCard;
