import React, { useState } from 'react';
import SEO from '../re-usable/SEO';
import { CgClose } from 'react-icons/cg';
import RichTextEditor from './RichTextEditor';
import { adminCreateService } from '../../redux/slices/servicesSlice';
import { uploadImageToCloudinary } from '../../utils/cloudinary/uploadImages';
import { useToast } from '../toasts/ToastManager';
import { useDropzone } from 'react-dropzone';
import { adminCreateBlog } from '../../redux/slices/blogSlice';

const NewBlogModal = ({ isOpen, onClose, services }) => {
  const [title, setTitle] = useState('');
  const [service, setService] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.name = 'Title is required';
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
      addToast('error', 'Failed to upload image', 3000);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await adminCreateBlog({
          title,
          service,
          description,
          coverImage,
        });
        if (response.status === 201) {
          addToast('success', response.message, 3000);
          onClose();
        } else {
          addToast('error', response.message, 3000);
        }
      } catch (error) {
        addToast('error', 'Unkown error occured', 3000);
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
      <SEO title="New Blog - ES Gishoma" />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white p-8 pt-0 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-8 pb-3 pl-0">
            <h2 className="text-2xl font-semibold flex-1">Create New Blog</h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              aria-label="Close modal"
            >
              <CgClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter service title"
                className="w-full px-3 py-2 border rounded-md"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="service"
                className="block text-lg font-medium mb-2"
              >
                Services
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                aria-invalid={errors.service ? 'true' : 'false'}
              >
                <option value="">Select a service</option>
                {services?.map((service) => (
                  <option value={service._id}>{service.name}</option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.service}
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="coverImage"
                className="block text-lg font-medium mb-2"
              >
                Cover Image
              </label>
              {coverImage ? (
                <div className="w-full bg-gray-200 rounded-md p-4">
                  <p className="text-lg text-gray-700">
                    Uploaded Image: {imageName}
                  </p>
                  <img
                    src={coverImage}
                    alt={imageName}
                    className="mt-2 w-full max-h-40 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="w-full px-3 py-2 border rounded-md border-dashed cursor-pointer"
                >
                  <input {...getInputProps()} id="coverImage" type="file" />
                  <p className="text-center text-gray-500">
                    Drag & Drop or Click to Select an Image
                  </p>
                </div>
              )}
              {uploadProgress > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">
                    Uploading: {uploadProgress}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-md">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="h-2 bg-blue-500 rounded-md"
                    ></div>
                  </div>
                </div>
              )}
              {errors.coverImage && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.coverImage}
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2"
              >
                Description
              </label>
              <RichTextEditor
                id="description"
                value={description}
                onChange={setDescription}
                placeholder="Enter service description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.description}
                </p>
              )}
            </div>
            {errors.submit && (
              <p className="text-red-500 text-sm mb-4" role="alert">
                {errors.submit}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewBlogModal;
