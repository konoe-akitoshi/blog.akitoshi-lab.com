import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OGPCard = ({ url }) => {
  const [ogpData, setOgpData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOGP = async () => {
      try {
        const { data } = await axios.post('/api/fetch-ogp', { url });
        setOgpData(data);
      } catch (error) {
        console.error('Error fetching OGP:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOGP();
  }, [url]);

  if (loading) return <p>Loading OGP data...</p>;
  if (!ogpData) return <p>OGP data unavailable</p>;

  return (
    <div className="border rounded shadow p-4 mb-4">
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
        {ogpData.image && (
          <img
            src={ogpData.image}
            alt={ogpData.title || 'OGP Image'}
            className="w-20 h-20 object-cover mr-4 rounded"
          />
        )}
        <div>
          <h3 className="text-lg font-bold">{ogpData.title || 'No Title'}</h3>
          <p className="text-sm text-gray-600">{ogpData.description || 'No Description'}</p>
        </div>
      </a>
    </div>
  );
};

export default OGPCard;
