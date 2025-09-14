import React from 'react';
import VideoLibrary from '@/components/VideoLibrary';

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <VideoLibrary />
      </div>
    </div>
  );
};

export default LibraryPage;
