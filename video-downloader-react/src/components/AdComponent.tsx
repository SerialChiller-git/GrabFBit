import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26693059.profitableratecpm.com/a881cfd8930b93d2768647ced314c6e0/invoke.js';
    const container = document.getElementById('container-a881cfd8930b93d2768647ced314c6e0');
    if (container) {
      container.appendChild(script);
    }
    
    // Cleanup on unmount
    return () => {
      const adContainer = document.getElementById('container-a881cfd8930b93d2768647ced314c6e0');
      if (adContainer) {
        adContainer.innerHTML = '';
      }
    };
  }, []);

  return <div id="container-a881cfd8930b93d2768647ced314c6e0"></div>;
};

export default AdComponent;
