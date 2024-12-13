import React, { useEffect, useState } from "react";
import SEO from "../../components/re-usable/SEO";
import BlogCard from "../../components/clients/BlogCard";
import { useToast } from "../../components/toasts/ToastManager";
import { clientViewBlogByService } from "../../redux/slices/blogSlice";
import { useParams } from "react-router-dom";
import ContentNotFound from "../../components/clients/ContentNotFound";

const ServiceBlog = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [service, setService] = useState();
  const [loading, setLoading] = useState(true);
  const { serviceId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); 
      try {
        const response = await clientViewBlogByService(serviceId);
        if (response.status === 200) {
          setData(response.blogs);
          setService(response.service);
        } else {
          addToast("error", response.message, 3000);
        }
      } catch (error) {
        addToast("error", error.message || "Unknown error occurred", 3000);
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

  return (
    <>
      <SEO title={`${service?.name} Blogs - ES Gishoma`} />
      <div className="bg-gray-100 min-h-[75vh]">
        <div className="px-4 py-10 md:px-20">
          <h1 className="text-xl sm:text-2xl font-bold capitalize text-primary mb-6">
            {service
              ? `News & Updates in ${service.name} Services`
              : "Service Updates"} 
          </h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white animate-pulse rounded-lg shadow-md p-4"
                >
                  <div className="w-[80vw] h-36 bg-gray-200 rounded mb-3"></div>
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
              <ContentNotFound/>
            )}
          </div>

          {data.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-black cursor-not-allowed"
                    : "bg-primary text-white hover:bg-gray-500"
                }`}
              >
                Previous
              </button>

              <span className="text-black font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-gray-500"
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
