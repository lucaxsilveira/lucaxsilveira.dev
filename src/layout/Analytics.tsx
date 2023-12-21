import React from 'react';

import Script from 'next/script';

const Analytics: React.FC = () => {
  return (
    <>
      {/* GOOGLE ANALYTICS */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-10BWQGNNKE" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-10BWQGNNKE');
        `}
      </Script>
    </>
  );
};

export default Analytics;
