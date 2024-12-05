import React, { useEffect, useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import NewBlogModal from '../../components/dashboard/NewBlogModal';
import { BiPlus } from 'react-icons/bi';
import { adminViewServices } from '../../redux/slices/servicesSlice';
import { useToast } from '../../components/toasts/ToastManager';

const NewsAndUpdates = () => {
  const [isNewArticleModalOpen, setisNewArticleModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    getServices();
  }, []);
  const getServices = async () => {
    try {
      const response = await adminViewServices();
      if (response.status === 200) {
        setServices(response.data);
      } else {
        addToast(
          'error',
          response.message || 'Error getting the services',
          3000
        );
      }
    } catch (error) {
      addToast('error', 'Error getting the services', 3000);
    }
  };
  return (
    <>
      {' '}
      <SEO title="News & Updates - ES Gishoma" />
      <div>
        <div className="flex items-center gap-2">
          <Titles title={'Services'} />
          {/* <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              value={pageSize}
              onChange={async (e) => {
                setPageSize(Number(e.target.value));
                await getServices();
              }}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={2000}>200</option>
              <option value={250}>250</option>
            </select>
          </div> */}
          <button
            onClick={() => setisNewArticleModalOpen(true)}
            className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
          >
            <BiPlus className="font-bold mr-2" />
            New Article
          </button>
        </div>
        {/* <div className="flex items-center gap-2">
          <Titles title={'News and updates'} />
          <button onClick={() => setisNewArticleModalOpen(true)}>
            New Service
          </button>
        </div> */}
      </div>
      <NewBlogModal
        isOpen={isNewArticleModalOpen}
        onClose={() => setisNewArticleModalOpen(false)}
        services={services}
      />
    </>
  );
};

export default NewsAndUpdates;
