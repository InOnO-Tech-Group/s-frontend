import React from 'react';

const InputText = ({ name, placeholder, type, onChange, value }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  );
}

export default InputText;
