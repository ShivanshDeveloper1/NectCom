import React from 'react';

export const InstagramVideos = ({ videos = [] }) => {
  if (!videos.length) return null;

  // Helper to format Instagram links to embed format
  const getEmbedUrl = (url) => {
    let cleanUrl = url.split('?')[0]; // strip query parameters
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return `${cleanUrl}embed`;
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container-custom mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Instagram Highlights
          </span>
          <h2 className="font-heading text-3xl font-bold text-gray-900 mt-2">
            Watch Us On Instagram
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <div key={vid._id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
              <iframe
                src={getEmbedUrl(vid.instagramUrl)}
                className="w-full h-[450px] rounded-xl border-0"
                scrolling="no"
                allowtransparency="true"
                allow="encrypted-media"
                title={vid.title}
              ></iframe>
              <h3 className="font-bold text-gray-800 mt-3 text-center">{vid.title}</h3>
              {vid.description && (
                <p className="text-xs text-gray-500 mt-1 text-center">{vid.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};