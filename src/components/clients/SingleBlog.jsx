import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { clientViewBlog, clientViewBlogs } from '../../redux/slices/blogSlice';
import { Link, useParams } from 'react-router-dom';
import { IoLogoTwitter, IoLogoWhatsapp } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import SEO from '../re-usable/SEO';
import ViewAllNewsButton from '../re-usable/ViewAllNewsButton';
import BlogCard from './BlogCard';

function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState([]);
  const { id } = useParams();
  const getSingleBlog = async () => {
    try {
      const response = await clientViewBlog(id);
      if (response.status === 200) {
        setSingleBlog(response.data);
        console.log('asas', response.data);
      } else {
        console.log(
          'error',
          response.message || 'Error in getting announcement'
        );
      }
    } catch (error) {
      console.log('error', error.toString() || 'Unknown error occurred');
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
        console.log(response.data);
        setPublishedBlogs(response.data);
      } else {
        console.log(
          'error',
          response.message || 'Error in getting announcement'
        );
      }
    } catch (error) {
      console.log('error', error.toString() || 'Unknown error occurred');
    }
  };
  useEffect(() => {
    getPublishedBlog();
  }, []);
  return (
    <>
      <SEO title={`${singleBlog.title} - ES Gishoma`} />
      <section className="bg-gray-100 py-10 px-4 md:px-20 items-center">
        <h2 className="font-bold capitalize text-center p-1">
          {singleBlog.title}
        </h2>
        <img
          src={singleBlog.coverImage}
          alt={singleBlog.title}
          className="w-full md:w-[70vw] md:mx-[11vw] h-[60vh] mb-4 rounded-lg "
        />
        <div className="flex w-full items-center">
          <h3 className="font-bold flex">
            <FaCalendarAlt className="text-xl" />
            {new Date(singleBlog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <div className="flex ml-auto">
            <IoLogoWhatsapp className="text-3xl mx-1 shadow border p-1" />
            <IoLogoTwitter className="text-3xl mx-1 shadow border p-1" />
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
        <h4 className="text-center text-xl md:text-3xl md:text-left font-bold mb-6">
          Latest News
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedBlogs.length > 0 ? (
            publishedBlogs.slice(0, 3).map((item) => {
              return (
                item &&
                item?._id !== singleBlog._id && (
                  <BlogCard id={item._id} title={item.title} date={item.createdAt} imageUrl={item.coverImage}/>
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
