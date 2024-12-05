import React, { useEffect, useState } from 'react';
import SEO from '../re-usable/SEO';
import { CgClose } from 'react-icons/cg';
import RichTextEditor from './RichTextEditor';
import {
  adminCreateService,
  adminUpdateService,
} from '../../redux/slices/servicesSlice';
import { useToast } from '../../components/toasts/ToastManager';

const UpdateServiceModal = ({ isOpen, onClose, data }) => {
  const [name, setName] = useState(data?.name || '');
  const [description, setDescription] = useState(data?.description || '');
  const [errors, setErrors] = useState({ name, description });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
    }
  }, [data]);
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await adminUpdateService(data._id, {
          name,
          description,
        });
        if (response.status === 200) {
          addToast('success', response.message, 3000);
          onClose();
        } else {
          addToast('error', response.message, 3000);
        }
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <SEO title="Update Service - ES Gishoma" />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-semibold flex-1">Update Service</h2>
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
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter service title"
                className="w-full px-3 py-2 border rounded-md"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.name}
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
                <p
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.description}
                </p>
              )}
            </div>
            {errors.submit && (
              <p className="text-red-500 text-sm mb-4" role="alert">
                {errors.submit}
              </p>
            )}
            <div className="flex justify-between mt-6 sticky bottom-0 bg-white pt-4">
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

export default UpdateServiceModal;
