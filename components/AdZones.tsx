import React from 'react';

const adZones = [
    { id: 'banner_1', size: [728, 90], position: 'top' },
    { id: 'banner_2', size: [300, 250], position: 'sidebar' },
    { id: 'banner_3', size: [300, 600], position: 'sidebar' },
    { id: 'banner_4', size: [160, 600], position: 'sidebar' },
    { id: 'banner_5', size: [320, 50], position: 'bottom' },
    { id: 'banner_6', size: [468, 60], position: 'banner' },
    { id: 'banner_7', size: [300, 50], position: 'mobile' },
    { id: 'banner_8', size: [970, 250], position: 'hero' },
    { id: 'banner_9', size: [336, 280], position: 'content' },
    { id: 'banner_10', size: [1200, 628], position: 'featured' },
    { id: 'banner_11', size: [250, 250], position: 'sidebar' },
    { id: 'banner_12', size: [720, 300], position: 'mid-article' },
    { id: 'banner_13', size: [300, 100], position: 'bottom' },
    { id: 'banner_14', size: [350, 250], position: 'sidebar' },
    { id: 'banner_15', size: [336, 600], position: 'sidebar' },
    { id: 'banner_16', size: [468, 60], position: 'header' },
    { id: 'banner_17', size: [970, 90], position: 'top' },
    { id: 'banner_18', size: [320, 100], position: 'mobile' },
    { id: 'banner_19', size: [300, 600], position: 'side' },
    { id: 'banner_20', size: [970, 250], position: 'header' },
    { id: 'banner_21', size: [120, 600], position: 'sidebar' },
    { id: 'banner_22', size: [728, 90], position: 'footer' },
    { id: 'banner_23', size: [240, 400], position: 'sidebar' },
    { id: 'banner_24', size: [300, 250], position: 'mid-content' },
    { id: 'banner_25', size: [250, 250], position: 'floating' },
];

const AdZones = () => {
    return (
        <div>
            {adZones.map(ad => (
                <div key={ad.id} style={{ width: ad.size[0], height: ad.size[1] }}>
                    {/* Placeholder for ad: {ad.id} */}
                </div>
            ))}
        </div>
    );
};

export default AdZones;