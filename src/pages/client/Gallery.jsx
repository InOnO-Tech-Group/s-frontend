import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineDownload } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useToast } from '../../components/toasts/ToastManager';
import { viewGalleryImages } from '../../redux/slices/gallerySlice';
import SEO from '../../components/re-usable/SEO';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  useEffect(() => {
    fetchGalleryImages();
  }, [currentPage]);

  const fetchGalleryImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await viewGalleryImages();
      console.log(response);
      if (response.status === 200) {
        setImages(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleRetry = () => {
    fetchGalleryImages();
  };

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  return (
    <>
      <SEO title="Gallery - ES Gishoma" />
      <div className="container mx-auto p-6 min-h-screen">
        <h1 className="text-xl sm:text-2xl font-bold capitalize text-primary mb-6">
          School Gallery
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="bg-gray-300 h-64 rounded-md"></div>
                <div className="mt-4 bg-gray-300 h-6 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">
            <p>{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500">No images uploaded yet.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={image.imageURL}
                    alt={image.caption}
                    className="w-full h-64 object-cover rounded-t-md cursor-pointer"
                    onClick={() => openModal(image)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-2">
                    <p className="text-sm font-semibold">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg hover:bg-gray-900"
                >
                  Previous
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-r-lg hover:bg-gray-900"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[1001]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative bg-black w-full h-full rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-black to-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <p className="text-lg font-semibold">{selectedImage.caption}</p>
                <div className="flex items-center space-x-4">
                  <a
                    href={selectedImage.imageURL}
                    className="text-white text-xl hover:text-gray-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <AiOutlineDownload />
                  </a>
                  <button
                    onClick={closeModal}
                    className="text-white text-xl hover:text-gray-400 transition"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center h-full pt-20 px-6">
                <motion.img
                  src={selectedImage.imageURL}
                  alt={selectedImage.caption}
                  className="object-contain max-h-full max-w-full animate__animated animate__fadeIn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
