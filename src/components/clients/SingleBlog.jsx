import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { clientViewBlog, clientViewBlogs } from '../../redux/slices/blogSlice';
import { useParams } from 'react-router-dom';
import { IoLogoWhatsapp } from 'react-icons/io5';
import SEO from '../re-usable/SEO';
import ViewAllNewsButton from '../re-usable/ViewAllNewsButton';
import BlogCard from './BlogCard';
import { FaXTwitter } from 'react-icons/fa6';
import ContentNotFound from './ContentNotFound';

const SingleBlog = () => {
  const [singleBlog, setSingleBlog] = useState([]);
  const [loadingSingleBlog, setLoadingSingleBlog] = useState(true);

  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loadingPublishedBlogs, setLoadingPublishedBlogs] = useState(true);

  const { id } = useParams();

  const getSingleBlog = async () => {
    setLoadingSingleBlog(true);
    try {
      const response = await clientViewBlog(id);
      if (response.status === 200) {
        setSingleBlog(response.data);
      }
    } catch (error) {
      console.error('Error:', error.toString() || 'Unknown error occurred');
    } finally {
      setLoadingSingleBlog(false);
    }
  };

  const getPublishedBlog = async () => {
    setLoadingPublishedBlogs(true);
    try {
      const response = await clientViewBlogs();
      if (response.status === 200) {
        setPublishedBlogs(response.data);
      }
    } catch (error) {
      console.error('Error:', error.toString() || 'Unknown error occurred');
    } finally {
      setLoadingPublishedBlogs(false);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [id]);

  useEffect(() => {
    getPublishedBlog();
  }, []);

  const blogUrl = `${window.location.origin}/news/${id}`;

  const shareOnX = (title, fullImageUrl) => {
    const shareText = `Check out this article: ${title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(blogUrl)}&image=${encodeURIComponent(
      fullImageUrl
    )}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = (title, fullImageUrl) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${blogUrl}\n\n${fullImageUrl}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="">
      <SEO title={`${singleBlog.title || 'Loading...'} - ES Gishoma`} />
      <section className="bg-gray-100 min-h-[70vh] py-10 px-4 md:px-20 items-center">
        <h1 className="text-xl sm:text-2xl font-bold capitalize text-primary mb-6">
          {loadingSingleBlog ? 'Loading Article...' : ''}
        </h1>
        {loadingSingleBlog ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 w-1/2 mb-4 rounded"></div>
            <div className="h-64 bg-gray-300 w-full mb-4 rounded"></div>
            <div className="h-4 bg-gray-300 w-full rounded"></div>
          </div>
        ) : singleBlog.title ? (
          <>
            <h4 className="text-xl text-primary font-bold capitalize p-1 text-center">
              {singleBlog.title}
            </h4>
            <img
              src={singleBlog.coverImage}
              alt={singleBlog.title}
              className="w-full md:w-[70vw] md:mx-[11vw] h-[60vh] mb-4 rounded-lg object-cover"
            />
            <div className="flex w-full items-center">
              <h3 className="font-bold flex">
                <FaCalendarAlt className="text-sm m-1.5" />
                {new Date(singleBlog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <div className="flex ml-auto">
                <button
                  className="text-3xl mx-1 shadow border p-1 cursor-pointer hover:text-green-500 text-sm"
                  onClick={() =>
                    shareOnWhatsApp(singleBlog.title, singleBlog.coverImage)
                  }
                >
                  <IoLogoWhatsapp />
                </button>
                <button
                  className="text-3xl mx-1 shadow border p-1 cursor-pointer hover:text-blue-500 text-sm"
                  onClick={() =>
                    shareOnX(singleBlog.title, singleBlog.coverImage)
                  }
                >
                  <FaXTwitter />
                </button>
              </div>
            </div>
            <div
              key={singleBlog._id}
              className="w-full text-justify italic"
              dangerouslySetInnerHTML={{ __html: singleBlog.description }}
            ></div>
          </>
        ) : (
          <ContentNotFound />
        )}
      </section>
      <hr />
      {singleBlog._id && (
        <section className="py-10 px-4 md:px-20">
          <h2 className="font-bold capitalize p-1">Latest News</h2>
          {loadingPublishedBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-300 h-48 w-full rounded"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedBlogs.length > 0 ? (
                publishedBlogs
                  .filter((item) => item && item._id !== singleBlog._id)
                  .slice(0, 3)
                  .map((item) => (
                    <BlogCard
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      date={item.createdAt}
                      imageUrl={item.coverImage}
                    />
                  ))
              ) : (
                <div>No recent news</div>
              )}
            </div>
          )}
          <ViewAllNewsButton to="/news" text="View All News" />
        </section>
      )}
    </div>
  );
};

export default SingleBlog;
