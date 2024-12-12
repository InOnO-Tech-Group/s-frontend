import React, { useEffect, useState } from 'react';
import SEO from '../../components/re-usable/SEO';
import BlogCard from '../../components/clients/BlogCard';
import { useToast } from '../../components/toasts/ToastManager';
import { clientViewBlogByService } from '../../redux/slices/blogSlice';
import { useParams } from 'react-router-dom';

const ServiceBlog = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [service, setService] = useState();
  const [loading, setLoading] = useState(true);
  const { serviceId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await clientViewBlogByService(serviceId);
        if (response.status === 200) {
          setData(response.blogs);
          setService(response.service);
        } else {
          addToast('error', response.message, 3000);
        }
      } catch (error) {
        addToast('error', error.message || 'Unknown error occurred', 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [serviceId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <SEO title={`${service?.name} Blogs - ES Gishoma`} />
      <div className="bg-gray-300 pt-4 pb-6">
        <div className="max-w-screen-lg mx-auto px-4 lg:w-[80%]">
          <h1 className="text-xl sm:text-2xl font-bold text-center my-6">
            {service ? `News & Updates in ${service.name}` : 'Loading...'}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white animate-pulse rounded-lg shadow-md p-4"
                >
                  <div className="h-36 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : currentItems && currentItems.length > 0 ? (
              currentItems.map((blog, index) => (
                <BlogCard
                  key={index}
                  id={blog._id}
                  title={blog.title}
                  date={blog.createdAt}
                  imageUrl={blog.coverImage}
                />
              ))
            ) : (
              <div className="col-span-2 sm:col-span-3 lg:col-span-4 text-center text-gray-700 bg-white p-6 rounded shadow-lg">
                <p className="text-lg font-semibold">No Blogs Found</p>
                <p className="text-sm text-gray-500">
                  Stay tuned for updates. New content will be available soon!
                </p>
              </div>
            )}
          </div>

          {data.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === number
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceBlog;
