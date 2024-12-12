import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { clientViewBlog, clientViewBlogs } from '../../redux/slices/blogSlice';
import { useParams } from 'react-router-dom';
import { IoLogoWhatsapp } from 'react-icons/io5';
import SEO from '../re-usable/SEO';
import ViewAllNewsButton from '../re-usable/ViewAllNewsButton';
import BlogCard from './BlogCard';
import { FaXTwitter } from 'react-icons/fa6';

function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState([]);
  const { id } = useParams();
  const getSingleBlog = async () => {
    try {
      const response = await clientViewBlog(id);
      if (response.status === 200) {
        setSingleBlog(response.data);
      }
    } catch (error) {
      console.error('error', error.toString() || 'Unknown error occurred');
    }
  };
  useEffect(() => {
    getSingleBlog(id);
  }, [id]);

  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const getPublishedBlog = async () => {
    try {
      const response = await clientViewBlogs();
      if (response.status === 200) {
        setPublishedBlogs(response.data);
      }
    } catch (error) {
      console.error('error', error.toString() || 'Unknown error occurred');
    }
  };
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
    <>
      <SEO title={`${singleBlog.title} - ES Gishoma`} />
      <section className="bg-gray-100 py-10 px-4 md:px-20 items-center">
        <h4 className="text-xl font-bold capitalize p-1 text-center">
          {singleBlog.title}
        </h4>
        <img
          src={singleBlog.coverImage}
          alt={singleBlog.title}
          className="w-full md:w-[70vw] md:mx-[11vw] h-[60vh] mb-4 rounded-lg "
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
            <button className="text-3xl mx-1 shadow border p-1 cursor-pointer hover:text-green-500 text-sm">
              <IoLogoWhatsapp
                onClick={() =>
                  shareOnWhatsApp(singleBlog.title, singleBlog.coverImage)
                }
              />
            </button>
            <button className="text-3xl mx-1 shadow border p-1  cursor-pointer hover:text-blue-500 text-sm">
              <FaXTwitter
                onClick={() =>
                  shareOnX(singleBlog.title, singleBlog.coverImage)
                }
              />
            </button>
          </div>
        </div>
        <div
          key={singleBlog._id}
          className="w-full text-justify"
          dangerouslySetInnerHTML={{ __html: singleBlog.description }}
        ></div>
      </section>
      <hr />
      <section className="bg-gray-100 py-10 px-4 md:px-20">
        <h2 className="font-bold capitalize p-1">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedBlogs.length > 0 ? (
            publishedBlogs.slice(0, 3).map((item) => {
              return (
                item &&
                item?._id !== singleBlog._id && (
                  <BlogCard
                    id={item._id}
                    title={item.title}
                    date={item.createdAt}
                    imageUrl={item.coverImage}
                  />
                )
              );
            })
          ) : (
            <div>No recent news</div>
          )}
        </div>
        <ViewAllNewsButton to="/news" text="View All News" />
      </section>
    </>
  );
}

export default SingleBlog;
