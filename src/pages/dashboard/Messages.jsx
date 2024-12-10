import React, { useState, useEffect } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { BiMessageDetail, BiCheck, BiTrash } from 'react-icons/bi';
import {
  adminDeleteMessage,
  adminGetMessages,
  adminMarkMessagesAsRead,
} from '../../redux/slices/messagesSlices';
import { useToast } from '../../components/toasts/ToastManager';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await adminGetMessages();
      console.log('RS', response);
      if (response.status === 200) {
        setMessages(response.data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('success', response.message, 3000);
      }
    } catch (error) {
      addToast('error', error.message || 'Unknown error occured', 3000);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await adminMarkMessagesAsRead(id);
      if (response.status === 200) {
        addToast('success', response.message, 3000);
        fetchMessages();
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('success', response.message, 3000);
      }
    } catch (error) {
      addToast('error', error.message, 3000);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await adminDeleteMessage(id);
      if (response.status === 200) {
        addToast('success', response.message, 3000);
        fetchMessages();
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('error', response.message, 3000);
      }
    } catch (error) {
      addToast('error', error.message, 3000);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <SEO title="Messages from Parents - ES Gishoma" />
      <div className="flex items-center gap-2 mb-6">
        <Titles title="Messages" />
      </div>

      <div
        className="bg-white p-4 shadow rounded-lg"
        style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
      >
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg w-full sm:w-1/2 lg:w-1/4 bg-gray-100 animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : messages.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {messages
              .sort((a, b) => Number(a.isRead) - Number(b.isRead)) 
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 border rounded-lg w-full sm:w-1/2 lg:w-1/4 ${
                    msg.isRead ? 'bg-gray-100' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AiOutlineUser className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-700 text-sm">
                      {msg.names}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <AiOutlineMail className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-600 text-sm">{msg.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <AiOutlinePhone className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-600 text-sm">{msg.phone}</span>
                  </div>
                  <div className="items-center gap-2 mb-2">
                    <div className="flex">
                      <BiMessageDetail className="w-6 h-6 text-blue-600" />{' '}
                      <strong className="text-blue-600 ml-2">Message</strong>
                    </div>
                    <span className="text-gray-600 text-sm">{msg.message}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {!msg.isRead && (
                      <button
                        onClick={() => markAsRead(msg._id)}
                        className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                      >
                        <BiCheck className="w-4 h-4" />
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      <BiTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
