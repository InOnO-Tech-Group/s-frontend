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

  return (
    <>
      <SEO title="Service Blog - ES Gishoma" />
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
            ) : data && data.length > 0 ? (
              data.map((blog, index) => (
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
        </div>
      </div>
    </>
  );
};

export default ServiceBlog;
