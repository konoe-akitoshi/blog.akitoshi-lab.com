import React, { useEffect, useState } from 'react';

interface OGPData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const OGPCard: React.FC<{ url: string }> = ({ url }) => {
  const [ogpData, setOgpData] = useState<OGPData | null>(null);

  useEffect(() => {
    const fetchOgpData = async () => {
      try {
        const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        if (data) {
          setOgpData(data);
        }
      } catch (error) {
        console.error('Failed to fetch OGP data:', error);
      }
    };

    fetchOgpData();
  }, [url]);

  if (!ogpData) return null;

  return (
    <a href={ogpData.url} target="_blank" rel="noopener noreferrer" className="block border rounded shadow hover:shadow-lg transition-shadow">
      <div className="flex">
        {ogpData.image && (
          <div className="w-1/3">
            <img src={ogpData.image} alt={ogpData.title} className="rounded-l w-full h-full object-cover" />
          </div>
        )}
        <div className="p-4 w-2/3">
          <h2 className="text-lg font-bold">{ogpData.title}</h2>
          <p className="text-sm text-gray-500">{ogpData.description}</p>
        </div>
      </div>
    </a>
  );
};
