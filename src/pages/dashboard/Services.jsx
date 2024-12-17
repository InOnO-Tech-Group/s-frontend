import React, { useEffect, useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import SEO from '../../components/re-usable/SEO';
import NewSeviceModall from '../../components/dashboard/NewSeviceModall';
import {
  BiCheckCircle,
  BiEdit,
  BiPlus,
  BiTrashAlt,
  BiXCircle,
} from 'react-icons/bi';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';
import { useToast } from '../../components/toasts/ToastManager';
import {
  adminDeleteService,
  adminViewServices,
} from '../../redux/slices/servicesSlice';
import TableSpinner from '../../components/dashboard/TableSpinner';
import UpdateServiceModal from '../../components/dashboard/UpdateServiceModal';
import TableSkeleton from '../../components/dashboard/TableSkeleton';

const Services = () => {
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [isUpdateServiceModalOpen, setIsUpdateServiceModalOpen] =
    useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dataToUpdate, setDataToUpdate] = useState({});
  const { addToast } = useToast();

  const getServices = async () => {
    try {
      setIsLoading(true);
      const response = await adminViewServices();
      if (response.status === 200) {
        setData(response.data);
      } else {
        addToast('error', response.message || 'Failed to fetch services', 3000);
      }
    } catch (error) {
      addToast('error', 'An error occurred while fetching services', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const deleteService = async (id) => {
    try {
      const response = await adminDeleteService(id);
      if (response.status === 200) {
        addToast('success', 'Service deleted successfully', 3000);
        await getServices();
      } else {
        addToast('error', response.message || 'Failed to delete service', 3000);
      }
    } catch (error) {
      addToast(
        'error',
        error || 'An error occurred while deleting service',
        3000
      );
    }
  };
  const columns = ['#', 'Service Name', 'Description', 'Actions'];
  return (
    <>
      {' '}
      <SEO title="Services list - ES Gishoma" />
      <div>
        <div className="flex items-center gap-2">
          <Titles title={'Services'} />
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              value={pageSize}
              onChange={async (e) => {
                setPageSize(Number(e.target.value));
                await getServices();
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
            onClick={() => setIsNewServiceModalOpen(true)}
            className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
          >
            <BiPlus className="font-bold mr-2" />
            New Service
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
                    key={rowIndex}
                    className="bg-white hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border-b">
                      {(currentPage - 1) * pageSize + rowIndex + 1}
                    </td>
                    <td className="px-4 py-2 border-b">{row.name}</td>
                    <td
                      className="px-4 py-2 border-b"
                      dangerouslySetInnerHTML={{ __html: row.description }}
                    />
                    <td className="px-4 py-2 border-b flex">
                      <button
                        onClick={() => {
                          setIsUpdateServiceModalOpen(true);
                          setDataToUpdate({
                            _id: row._id,
                            name: row.name,
                            description: row.description,
                          });
                        }}
                        className="px-3 py-1.5 text-blue-500 rounded-md hover:bg-blue-100 flex items-center gap-2"
                      >
                        <BiEdit />
                      </button>
                      <button
                        onClick={() => deleteService(row._id)}
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
      <NewSeviceModall
        isOpen={isNewServiceModalOpen}
        onClose={async () => {
          setIsNewServiceModalOpen(false);
          await getServices();
        }}
      />
      <UpdateServiceModal
        isOpen={isUpdateServiceModalOpen}
        onClose={async () => {
          setIsUpdateServiceModalOpen(false);
          await getServices();
        }}
        data={dataToUpdate}
      />
    </>
  );
};

export default Services;
