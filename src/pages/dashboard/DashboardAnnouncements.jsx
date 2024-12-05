import {
  BiCheckCircle,
  BiEdit,
  BiPlus,
  BiTrashAlt,
  BiXCircle,
} from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';
import TableSpinner from '../../components/dashboard/TableSpinner';
import NewAnnouncementForm from '../../components/dashboard/NewAnnouncementForm';
import SEO from '../../components/re-usable/SEO';
import Titles from '../../components/dashboard/Titles';
import {
  adminViewAnnouncements,
  adminDeleteAnnouncement,
  adminToggleUpdateAnnouncement,
} from '../../redux/slices/announcementsSlice';
import { useToast } from '../../components/toasts/ToastManager';
import UpdateAnnouncementForm from '../../components/dashboard/UpdateAnnouncementForm';
import PublishToggle from '../../components/dashboard/PublishToggle';

const DashboardAnnouncements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    id: null,
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { addToast } = useToast();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({});

  const getAnnouncements = async () => {
    setIsLoading(true);
    try {
      const response = await adminViewAnnouncements();
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized to view announcements', 3000);
        setData([]);
      } else {
        addToast('error', 'Failed to fetch announcements', 3000);
        setData([]);
      }
    } catch (error) {
      addToast('error', 'An error occurred while fetching data', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      const response = await adminDeleteAnnouncement(id);
      if (response.status === 200) {
        addToast('success', 'Announcement deleted successfully', 3000);
        getAnnouncements();
      } else {
        addToast(
          'error',
          response.message || 'Failed to delete announcement',
          3000
        );
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      addToast(
        'error',
        'An error occurred while deleting the announcement',
        3000
      );
    } finally {
      setConfirmationModal({ isOpen: false, id: null });
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmationModal({ isOpen: true, id });
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = ['#', 'Contents', 'Due date', 'Status', 'Actions'];
  const isAnnouncementPublished = (status) => {
    if (status === 'published') {
      return true;
    }
    return false;
  };

  const handleToggleClick = async (id, status) => {
    try {
      const response = await adminToggleUpdateAnnouncement(id, status);
      if (response.status === 200) {
        addToast('success', 'Announcement status updated successfully', 3000);
        getAnnouncements();
      } else {
        addToast(
          'error',
          response.message || 'Failed to update announcement status',
          3000
        );
      }
    } catch (error) {
      addToast(
        'error',
        error.message || 'Error occured while trying to toggle the status',
        3000
      );
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <SEO title="View announcements - ES Gishoma" />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <Titles title={'Announcements'} />
        <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-sm">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              getAnnouncements();
            }}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
            <option value={2000}>200</option>
            <option value={250}>250</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
        >
          <BiPlus className="font-bold mr-2" />
          <span>New announcement</span>
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
                  key={rowIndex}
                  className="bg-white hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 border-b">
                    {(currentPage - 1) * pageSize + rowIndex + 1}
                  </td>
                  <td
                    className="px-4 py-2 border-b"
                    dangerouslySetInnerHTML={{ __html: row.content }}
                  />
                  <td className="px-4 py-2 border-b">{row.dueDate}</td>
                  <td className="px-4 py-2 border-b">{row.status}</td>
                  <td className="px-4 py-2 border-b flex">
                    <button
                      onClick={() => {
                        setIsUpdateModalOpen(true);
                        setDataToUpdate({
                          _id: row._id,
                          content: row.content,
                          dueDate: row.dueDate,
                        });
                      }}
                      className="px-3 py-1.5 text-blue-500 rounded-md hover:bg-blue-100 flex items-center gap-2"
                    >
                      <BiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(row._id)}
                      className="px-3 py-1.5 text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center gap-2 ml-2"
                    >
                      <BiTrashAlt />
                    </button>
                    <PublishToggle
                      isToggled={isAnnouncementPublished(row.status)}
                      onClick={() => handleToggleClick(row._id, row.status)}
                      icons={{
                        off: <BiCheckCircle />,
                        on: <BiXCircle />,
                      }}
                      className="ml-2"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center">
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

      <NewAnnouncementForm
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          getAnnouncements();
        }}
      />
      <UpdateAnnouncementForm
        isModalOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          getAnnouncements();
        }}
        data={dataToUpdate}
      />

      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2">
              Are you sure you want to delete this announcement?
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
                onClick={() => deleteAnnouncement(confirmationModal.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAnnouncements;
