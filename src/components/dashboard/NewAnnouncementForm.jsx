import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiCalendar } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import SEO from '../re-usable/SEO';
import RichTextEditor from './RichTextEditor';

import { adminCreateAnnouncement } from '../../redux/slices/announcementsSlice.js';
import { useToast } from '../../components/toasts/ToastManager';

const NewAnnouncementForm = ({ isModalOpen, onClose }) => {
  const [content, setcontent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({ content: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { content: '', dueDate: '' };
    const sanitizedcontent = content.replace(/<[^>]*>/g, '').trim();

    if (!sanitizedcontent) {
      newErrors.content = 'Contents are required';
      isValid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due Date is required';
      isValid = false;
    }

    const dueDateObj = new Date(dueDate);
    const currentDate = new Date();

    if (dueDateObj < currentDate) {
      newErrors.dueDate = 'Due Date must be a future date';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await adminCreateAnnouncement({ content, dueDate });
      setLoading(false);

      if (response.status === 201) {
        addToast('success', 'Announcement created successfully', 3000);
        setcontent('');
        setDueDate('');
        setErrors({ content: '', dueDate: '' });
        onClose();
      } else {
        addToast('error', response.message || 'Unknown error occurred.', 3000);
      }
    } catch (error) {
      setLoading(false);
      addToast(
        'error',
        'An error occurred while creating the announcement. Please try again later.',
        3000
      );
      console.error('Error creating announcement:', error);
    }
  };

  const handleClose = () => {
    setcontent('');
    setDueDate('');
    setErrors({ content: '', dueDate: '' });
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <>
      <SEO title="New announcements - ES Gishoma" />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex-1">
              Create New Announcement
            </h2>
            <button
              onClick={handleClose}
              className="text-red-600 hover:text-red-800"
            >
              <CgClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Contents
              </label>
              <RichTextEditor
                value={content}
                onChange={setcontent}
                placeholder="Enter announcement contents"
              />
              {errors.content && (
                <p
                  className="text-red-500 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  {errors.content}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="dueDate"
                className="block text-lg font-medium mb-2"
              >
                <BiCalendar className="inline-block mr-2" />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.dueDate && (
                <p
                  className="text-red-500 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleClose}
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

export default NewAnnouncementForm;
