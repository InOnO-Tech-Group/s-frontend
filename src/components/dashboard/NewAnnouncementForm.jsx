import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiCalendar } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

const NewAnnouncementForm = ({ isModalOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Announcement Submitted', { title, dueDate });
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex-1">
            Create New Announcement
          </h2>
          <button onClick={onClose} className="text-red-600 hover:text-red-800">
            <CgClose size={24} className='text-red'/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              Title
            </label>
            <div className="h-48">
              <ReactQuill
                value={title}
                onChange={setTitle}
                placeholder="Enter announcement title"
                theme="snow"
                className="h-full"
                modules={{
                  toolbar: [
                    [{ font: [] }],
                    [{ header: [1, 2,3,4,5, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link'],
                    ['clean'],
                  ],
                }}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="block text-lg font-medium mb-2">
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
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
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
  );
};

export default NewAnnouncementForm;
