import React, { useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import NewSeviceModall from '../../components/dashboard/NewSeviceModall';

const NewsAndUpdates = () => {
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  return (
    <>
      {' '}
      <SEO title="News & Updates" />
      <div>
        <div className="flex items-center gap-2">
          <Titles title={'News and updates'} />
          <button onClick={() => setIsNewServiceModalOpen(true)}>
            New Service
          </button>
        </div>
      </div>
      <NewSeviceModall
        isOpen={isNewServiceModalOpen}
        onClose={() => setIsNewServiceModalOpen(false)}
      />
    </>
  );
};

export default NewsAndUpdates;
