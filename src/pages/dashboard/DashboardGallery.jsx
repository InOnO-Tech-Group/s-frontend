import React, { useEffect, useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import { BiPlus, BiTrashAlt } from 'react-icons/bi';
import { useToast } from '../../components/toasts/ToastManager';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import TableSkeleton from '../../components/dashboard/TableSkeleton';
import NewImageModal from '../../components/dashboard/NewImageModal';
import {
  deleteGalleryImage,
  viewGalleryImages,
} from '../../redux/slices/gallerySlice';

const DashboardGallery = () => {
  const [isNewImageModalOpen, setIsNewImageModalOpen] = useState(false);
  const [data, setData] = useState([]);
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
      await getGalleryImages();
    };
    fetchData();
  }, []);

  const getGalleryImages = async () => {
    setIsLoading(true);
    try {
      const response = await viewGalleryImages();
      console.log(response);
      if (response.status === 200) {
        setData(response.data.data);
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('error', response.message || 'Error getting the Gallery images', 3000);
      }
    } catch (error) {
      addToast('error', error.toString() || 'Unknown error occurred', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await deleteGalleryImage(id);
      if (response.status === 200) {
        addToast('success', 'Image deleted successfully', 3000);
        await getGalleryImages();
        setConfirmationModal({ isOpen: false, id: null });
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast('error', response.message || 'Error deleting Image', 3000);
      }
    } catch (error) {
      addToast('error', 'Error deleting Image', 3000);
    }
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = ['#', 'Image', 'Caption', 'Actions'];

  return (
    <>
      <SEO title="Gallery - ES Gishoma" />
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Titles title={'Gallery'} />
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
                setCurrentPage(1);
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
            onClick={() => setIsNewImageModalOpen(true)}
            className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
          >
            <BiPlus className="font-bold mr-2" />
            New Image
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
                <TableSkeleton rows={pageSize} columns={columns.length} />
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
                        src={row.imageURL}
                        alt={row.caption}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>

                    <td className="px-4 py-2">{row.caption}</td>
                    <td className="px-4 py-2 flex items-center">
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
      <NewImageModal
        isOpen={isNewImageModalOpen}
        onClose={() => {
          setIsNewImageModalOpen(false);
          getGalleryImages();
        }}
      />
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2">This action is irreversible.</p>
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

export default DashboardGallery;
