import { BiPlus } from 'react-icons/bi';
import Table from '../../components/dashboard/Table';
import NewAnnouncementForm from '../../components/dashboard/NewAnnouncementForm';
import { useState } from 'react';

const DashboardAnnouncements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };
  const announcementsData = [
    {
      id: 1,
      title: 'New Feature Launch',
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1731063105/xtwjvhq41lpi0m9lzg1z.webp',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Holiday Announcement',
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1731063105/xtwjvhq41lpi0m9lzg1z.webp',
      status: 'Inactive',
    },
  ];

  const announcementsColumns = ['#', 'Title', 'Image', 'Status'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex">
        <h2 className="text-xl font-semibold pr-4 flex-1">Announcements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center bg-primary text-white rounded px-4 py-2 font-semibold hover:opacity-80 w-full sm:w-auto"
        >
          <BiPlus className="font-bold mr-2" />
          <span>New announcement</span>
        </button>
      </div>

      <Table columns={announcementsColumns} data={announcementsData} />
      <NewAnnouncementForm isModalOpen={isModalOpen} onClose={onClose} />
    </div>
  );
};

export default DashboardAnnouncements;
