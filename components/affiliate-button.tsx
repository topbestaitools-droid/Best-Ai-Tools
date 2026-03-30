import React from 'react';

interface AffiliateButtonProps {
  toolId: string;
  toolName: string;
  affiliateUrl: string;
}

const AffiliateButton: React.FC<AffiliateButtonProps> = ({ toolId, toolName, affiliateUrl }) => {
  const handleClick = async () => {
    await fetch('/api/affiliate/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toolId,
        toolName,
        affiliateUrl,
        refTag: 'bestaitools',
        bestaitools: 'true',
      }),
    });

    window.location.href = affiliateUrl;
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try {toolName}
    </button>
  );
};

export default AffiliateButton;