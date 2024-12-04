import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Enter text here',
  height = '12rem',
  modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  },
}) => {
  return (
    <div className={`relative ${height}`}>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme="snow"
        className="h-full rounded-lg border border-gray-300"
        modules={modules}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      />
    </div>
  );
};

export default RichTextEditor;