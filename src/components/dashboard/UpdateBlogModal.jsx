import React, { useEffect, useState } from 'react';
import SEO from '../re-usable/SEO';
import { CgClose } from 'react-icons/cg';
import RichTextEditor from './RichTextEditor';
import { adminCreateBlog, adminUpdateBlog } from '../../redux/slices/blogSlice';
import { uploadImageToCloudinary } from '../../utils/cloudinary/uploadImages';
import { useToast } from '../toasts/ToastManager';
import { useDropzone } from 'react-dropzone';

const UpdateBlogModal = ({ isOpen, onClose, services, blog }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [service, setService] = useState(blog?.service || '');
  const [coverImage, setCoverImage] = useState(blog?.coverImage || null);
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState(blog?.description || '');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setService(blog.service || '');
      setCoverImage(blog.coverImage || null);
      setDescription(blog.description || '');
    }
  }, [blog]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!service) newErrors.service = 'Service selection is required';
    if (!coverImage) newErrors.coverImage = 'Cover image is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (file) => {
    try {
      addToast('info', 'Uploading image...', 3000);
      const onUploadProgress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      };
      const { url } = await uploadImageToCloudinary(file, onUploadProgress);
      setCoverImage(url);
      setImageName(file.name);
      addToast('success', 'Image uploaded successfully', 3000);
    } catch (error) {
      setCoverImage(null);
      setImageName('');
      addToast('error', 'Failed to upload image', 3000);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) handleImageUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await adminUpdateBlog(blog._id, {
          title,
          service,
          description,
          coverImage,
        });
        if (response.status === 200) {
          addToast('success', response.message, 3000);
          onClose();
        } else if (response.status === 401) {
          addToast(
            'error',
            'You are not authorized to perform this action',
            3000
          );
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          addToast('error', response.message, 3000);
        }
      } catch (error) {
        addToast('error', 'Unknown error occurred', 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: 'image/*',
  });

  if (!isOpen) return null;

  return (
    <>
      <SEO title="Update Blog - ES Gishoma" />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto pt-0">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 px-6 pt-6 p-3">
            <h2 className="text-2xl font-semibold">Update Blog</h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              aria-label="Close modal"
            >
              <CgClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                className={`block w-full p-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-lg font-medium mb-2"
              >
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`block w-full p-2 border ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                aria-invalid={errors.service ? 'true' : 'false'}
              >
                <option value="">Select a service</option>
                {services?.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.service}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Cover Image
              </label>
              <div className="mb-4">
                {coverImage ? (
                  <img loading="lazy"
                    src={coverImage}
                    alt="Selected cover"
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <p className="text-sm text-gray-600">No image selected</p>
                )}
              </div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed p-4 rounded cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>
                  {imageName
                    ? `Selected: ${imageName}`
                    : 'Drag & drop an image or click to select one'}
                </p>
              </div>
              {errors.coverImage && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.coverImage}
                </p>
              )}
              {uploadProgress > 0 && (
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Description
              </label>
              <RichTextEditor
                value={description}
                onChange={(value) => setDescription(value)}
                className={`${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update Blog'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateBlogModal;
