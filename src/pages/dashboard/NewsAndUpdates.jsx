import React, { useEffect, useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import NewBlogModal from '../../components/dashboard/NewBlogModal';
import {
  BiEdit,
  BiPlus,
  BiTrashAlt,
  BiCheckCircle,
  BiXCircle,
} from 'react-icons/bi';
import { adminViewServices } from '../../redux/slices/servicesSlice';
import { useToast } from '../../components/toasts/ToastManager';
import {
  adminViewBlogs,
  adminDeleteBlog,
  adminUpdateBlog,
} from '../../redux/slices/blogSlice';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import TableSpinner from '../../components/dashboard/TableSpinner';
import PublishToggle from '../../components/dashboard/PublishToggle';
import UpdateBlogModal from '../../components/dashboard/UpdateBlogModal';

const NewsAndUpdates = () => {
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [data, setData] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    id: null,
  });

  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      await getServices();
      await getBlogs();
    };
    fetchData();
  }, []);

  const getServices = async () => {
    try {
      const response = await adminViewServices();
      if (response.status === 200) {
        setServices(response.data);
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast(
          'error',
          response.message || 'Error getting the services',
          3000
        );
      }
    } catch (error) {
      addToast('error', 'Error getting the services', 3000);
    }
  };

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await adminViewBlogs();
      if (response.status === 200) {
        setData(response.blogs);
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('error', response.message || 'Error getting the blogs', 3000);
      }
    } catch (error) {
      addToast('error', error.toString() || 'Unknown error occurred', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (blogId) => {
    try {
      const response = await adminDeleteBlog(blogId);
      if (response.status === 200) {
        addToast('success', 'Blog deleted successfully', 3000);
        await getBlogs();
        setConfirmationModal({ isOpen: false, id: null });
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('error', response.message || 'Error deleting blog', 3000);
      }
    } catch (error) {
      addToast('error', 'Error deleting blog', 3000);
    }
  };

  const handleToggleClick = async (blogId, currentStatus) => {
    try {
      const statusToSend = 
        currentStatus === 'published' ? 'unpublished' : 'published';
      const response = await adminUpdateBlog(blogId, { status: statusToSend });
      if (response.status === 200) {
        addToast('success', 'Blog status updated successfully', 3000);
        await getBlogs();
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast(
          'error',
          response.message || 'Error updating blog status',
          3000
        );
      }
    } catch (error) {
      addToast('error', 'Error updating blog status', 3000);
    }
  };

  const isBlogPublished = (status) => {
    return status === 'published';
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    '#',
    'Image',
    'Title',
    'Description',
    'Service',
    'Status',
    'Actions',
  ];

  return (
    <>
      <SEO title="News & Updates - ES Gishoma" />
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Titles title={'Blogs & News update'} />
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              value={pageSize}
              onChange={(e) => {
                const newPageSize = Number(e.target.value);
                setPageSize(newPageSize);
                setCurrentPage(1); // Reset to first page when changing page size
              }}
              className="border px-2 py-1 rounded text-sm"
            >
              {[5, 10, 15, 20, 50, 100, 150, 200, 250].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsNewArticleModalOpen(true)}
            className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
          >
            <BiPlus className="font-bold mr-2" />
            New Article
          </button>
        </div>
        <div
          className="overflow-auto border rounded-lg shadow-sm"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="px-4 py-2 text-left border-b">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <TableSpinner size="32px" color="#4A90E2" />
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={row._id || rowIndex}
                    className="bg-white hover:bg-gray-50 transition border-b"
                  >
                    <td className="px-4 py-2">
                      {(currentPage - 1) * pageSize + rowIndex + 1}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={row.coverImage}
                        alt={row.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{row.title}</td>
                    <td
                      className="px-4 py-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          row.description.length > 30
                            ? row.description.trim().slice(0, 30) + '...'
                            : row.description,
                      }}
                    />
                    <td className="px-4 py-2">
                      {row?.service?.name || 'No Service'}
                    </td>
                    <td className="px-4 py-2">{row.status}</td>
                    <td className="px-4 py-2 flex items-center">
                      <button
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          setDataToUpdate({
                            _id: row._id,
                            title: row.title,
                            coverImage: row.coverImage,
                            description: row.description,
                            status: row.status,
                            service: row.service?._id,
                          });
                        }}
                        className="px-3 py-1.5 text-blue-500 rounded-md hover:bg-blue-100 flex items-center gap-2"
                      >
                        <BiEdit />
                      </button>

                      <PublishToggle
                        isToggled={isBlogPublished(row.status)}
                        onClick={() => handleToggleClick(row._id, row.status)}
                        icons={{
                          off: <BiCheckCircle />,
                          on: <BiXCircle />,
                        }}
                        className="ml-2"
                      />
                      <button
                        onClick={() =>
                          setConfirmationModal({ isOpen: true, id: row._id })
                        }
                        className="px-3 py-1.5 text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center gap-2 ml-2"
                      >
                        <BiTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-center"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 flex items-center gap-2"
          >
            <BsArrowLeftSquare />
            Previous
          </button>
          <span className="mx-4 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 flex items-center gap-2"
          >
            Next
            <BsArrowRightSquare />
          </button>
        </div>
      </div>
      <NewBlogModal
        isOpen={isNewArticleModalOpen}
        onClose={() => {
          setIsNewArticleModalOpen(false);
          getBlogs();
        }}
        services={services}
      />
      <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          getBlogs();
        }}
        services={services}
        blog={dataToUpdate}
      />
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2">
              Are you sure you want to delete this blog? This action is
              irreversible.
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() =>
                  setConfirmationModal({ isOpen: false, id: null })
                }
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteClick(confirmationModal.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsAndUpdates;