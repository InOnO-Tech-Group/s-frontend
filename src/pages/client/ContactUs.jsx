import React, { useState } from 'react';
import { BiPhone } from 'react-icons/bi';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import SEO from '../../components/re-usable/SEO';
import { useToast } from '../../components/toasts/ToastManager';
import { userSendMessage } from '../../redux/slices/messagesSlices';
import Button from '../../components/re-usable/Button';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.comment.trim()) newErrors.comment = 'Comment is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const { addToast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (validateForm()) {
      setSubmitting(true);
      try {
        const response = await userSendMessage(formData);
        if (response.status === 201) {
          addToast(
            'success',
            response.message ||
              'Your message is sent successfully, we will reach out to you very soon',
            3000
          );
        } else {
          addToast('error', response.message || 'Unkonw error occured', 3000);
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          comment: '',
        });
        setErrors({});
      } catch (error) {
        addToast(
          'error',
          error.message || 'Unknown error occrured while sending the message',
          3000
        );
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <SEO title="Contact Us - ES Gishoma" />
      <div className="bg-gray-100 min-h-screen py-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 text-sm">We're here to assist you!</p>
        </header>

        <main className="container mx-auto px-4 lg:max-w-6xl flex flex-col lg:flex-row gap-6">
          <section className="flex-1 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Get in Touch
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <FaLocationArrow
                  className="text-primary text-xl mr-4"
                  aria-label="Location Icon"
                />
                <div>
                  <p className="text-gray-700 font-medium">Location</p>
                  <p className="text-gray-600 text-sm">Rusizi, Gishoma</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-start">
                  <BiPhone
                    className="text-primary text-xl mr-4"
                    aria-label="Phone Icon"
                  />
                  <div>
                    <p className="text-gray-700 font-medium">Phone</p>
                    <p className="text-gray-600 text-sm">+250781234567</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-start">
                  <BiPhone
                    className="text-primary text-xl mr-4"
                    aria-label="Email Icon"
                  />
                  <div>
                    <p className="text-gray-700 font-medium">Email</p>
                    <p className="text-gray-600 text-sm">example@example.com</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-700 font-medium mb-2">Follow Us</p>
                <div className="flex gap-3">
                  <Link to="#" aria-label="Facebook">
                    <FaFacebook className="text-primary text-xl hover:text-gray-700" />
                  </Link>
                  <Link to="#" aria-label="Twitter">
                    <FaTwitter className="text-primary text-xl hover:text-gray-700" />
                  </Link>
                  <Link to="#" aria-label="Instagram">
                    <FaInstagram className="text-primary text-xl hover:text-gray-700" />
                  </Link>
                  <Link to="#" aria-label="LinkedIn">
                    <FaLinkedin className="text-primary text-xl hover:text-gray-700" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 pl-0 lg:max-w-4xl mt-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Find us with Google Maps
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.6545230381857!2d28.933193173121808!3d-2.617843238527408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c28f7bbee09661%3A0xffc476214e8371ec!2sES%20GISHOMA%20SCHOOL!5e0!3m2!1sen!2srw!4v1733916741789!5m2!1sen!2srw"
                style={{ border: '0', width: '100%' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          <section className="flex-1 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Contact
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              We respond as soon as possible!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-600 font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter John"
                    className={`w-full p-2 text-sm border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring focus:ring-primary`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-600 font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Doe"
                    className={`w-full p-2 text-sm border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring focus:ring-primary`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    className={`w-full p-2 text-sm border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring focus:ring-primary`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-600 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+250123456789"
                    className={`w-full p-2 text-sm border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded focus:outline-none focus:ring focus:ring-primary`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-gray-600 font-medium"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Your message here"
                  className={`w-full p-2 text-sm border ${
                    errors.comment ? 'border-red-500' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring focus:ring-primary`}
                ></textarea>
                {errors.comment && (
                  <p className="text-red-500 text-xs">{errors.comment}</p>
                )}
              </div>
              <Button
                title={
                  submitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send message'
                  )
                }
                disabled={submitting}
                className={`w-full py-2 ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              />
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactUs;
