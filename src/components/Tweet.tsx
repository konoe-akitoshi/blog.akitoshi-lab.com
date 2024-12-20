import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element: HTMLElement | null) => void;
      };
    };
  }
}

export const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTwitterEmbed = () => {
      if (window.twttr) {
        window.twttr.widgets.load(ref.current);
      }
    };

    loadTwitterEmbed();

    // 再試行のために監視
    const observer = new MutationObserver(() => loadTwitterEmbed());
    if (ref.current) {
      observer.observe(ref.current, { childList: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`,
      }}
    />
  );
};
