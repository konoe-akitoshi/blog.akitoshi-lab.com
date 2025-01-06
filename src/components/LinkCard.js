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
      <div className="alert alert-danger" role="alert">
        <a href={url} target="_blank" rel="nofollow noopener" className="text-danger card-link">
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
      className="text-decoration-none text-dark"
    >
      <div className="card mb-3">
        <div className="row g-0 align-items-stretch">
          <div className="col-md-4">
            {meta?.image && (
              <img
                src={meta.image}
                className="img-fluid rounded-start h-100"
                alt={meta.title || 'サムネイル'}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5
                className="card-title"
                style={{
                  color: '#333', // 目に優しい黒っぽい色
                  fontWeight: 'bold',
                }}
              >
                {meta?.title || 'リンクのタイトル'}
              </h5>
              <p className="card-text">
                <small className="text-body-secondary">{url}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

LinkCard.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LinkCard;
