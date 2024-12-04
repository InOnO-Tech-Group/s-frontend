import React from 'react';

const PublishToggle = ({ isToggled, onClick, className, icons }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
        isToggled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      } ${className}`}
    >
        {isToggled}
      {icons ? icons[isToggled ? 'on' : 'off'] : null}
    </button>
  );
};

export default PublishToggle;
