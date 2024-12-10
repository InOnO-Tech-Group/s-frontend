import React, { useEffect, useState } from 'react';
import { BiLock, BiSave } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
  userUpdateProfile,
  userViewProfile,
} from '../../redux/slices/userSlice';
import { useToast } from '../../components/toasts/ToastManager';

const Profile = ({ profile, onSuccess }) => {
  const [formData, setFormData] = useState(profile);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required.';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const response = await userUpdateProfile(formData);
        if (response.status === 200) {
          onSuccess();
          addToast('success', response.message, 3000);
        } else if (response.status === 401) {
          addToast('error', 'You are not authorized!', 3000);
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          addToast('error', response.message, 3000);
        }
      } catch (error) {
        addToast('error', error.message, 3000);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      {/* Page Title */}
      <div className="max-w-lg mx-auto">
        <h1 className="text-lg font-semibold text-gray-800 mb-3">
          Profile & Settings
        </h1>
      </div>

      {/* Personal Information Section */}
      <div className="max-w-lg mx-auto bg-white shadow-sm rounded-md p-3 mb-3">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Personal Information
        </h2>
        <form className="space-y-2" noValidate>
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-gray-600 text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`w-full border ${
                errors.firstname ? 'border-red-500' : 'border-gray-300'
              } rounded-sm p-2 text-gray-800 text-sm focus:ring-1 focus:ring-blue-400`}
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <span className="text-red-500 text-xs mt-1">
                {errors.firstname}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="text-gray-600 text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`w-full border ${
                errors.lastname ? 'border-red-500' : 'border-gray-300'
              } rounded-sm p-2 text-gray-800 text-sm focus:ring-1 focus:ring-blue-400`}
              placeholder="Enter your last name"
            />
            {errors.lastname && (
              <span className="text-red-500 text-xs mt-1">
                {errors.lastname}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-600 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-sm p-2 text-gray-800 text-sm focus:ring-1 focus:ring-blue-400`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-1 px-2 rounded-sm shadow-sm transition duration-300"
            >
              <BiSave size={14} />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="max-w-lg mx-auto bg-white shadow-sm rounded-md p-3">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Security</h2>
        <Link
          to="/forgot-password"
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 font-medium text-sm transition duration-300"
        >
          <BiLock size={14} />
          <span>Reset Password</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
