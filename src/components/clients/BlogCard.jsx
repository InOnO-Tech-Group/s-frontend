import React from 'react';
import { FaSquareXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

const BlogCard = ({ id, title, date, imageUrl }) => {
  const formattedDate = date
    ? formatDistanceToNow(parseISO(date), { addSuffix: true })
    : 'No date provided';

  const blogUrl = `${window.location.origin}/news/${id}`;

  const fullImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${window.location.origin}${imageUrl}`
    : 'https://via.placeholder.com/150';

  const shareOnX = () => {
    const shareText = `Check out this article: ${title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(blogUrl)}&image=${encodeURIComponent(
      fullImageUrl
    )}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${blogUrl}\n\n${fullImageUrl}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full m-1 p-2 rounded-lg bg-gray-300">
      <Link to={`/news/${id}`}>
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt={title}
          className="w-full h-[25vh] rounded-t-lg object-cover mb-4 rounded-lg"
        />
      </Link>
      <div className="">
        <Link to={`/news/${id}`} className="font-bold text-lg">
          {title || 'Blog Title'}
        </Link>
        <div className="flex w-full items-center">
          <h3 className="text-xs">{formattedDate}</h3>
          <div className="flex ml-auto">
            <button
              onClick={shareOnX}
              className="text-3xl mx-1 shadow border p-1 hover:text-blue-500"
            >
              <FaSquareXTwitter size={16} />
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="text-3xl mx-1 shadow border p-1 hover:text-green-500"
            >
              <FaWhatsapp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
