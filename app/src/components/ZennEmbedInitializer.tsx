'use client';

import { useEffect } from 'react';

export function ZennEmbedInitializer() {
  useEffect(() => {
    // Zenn埋め込み要素を初期化
    import('zenn-embed-elements').then((module: any) => {
      // モジュールの構造に応じて適切な方法で関数を呼び出す
      const zennModule = module.default || module;
      
      if (typeof zennModule.activateElements === 'function') {
        zennModule.activateElements();
      } else {
        console.warn('Failed to activate Zenn embed elements.');
      }
    }).catch(error => {
      console.error('Error loading Zenn embed elements:', error);
    });
  }, []);

  return null;
}
