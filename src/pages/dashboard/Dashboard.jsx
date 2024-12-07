import React, { useEffect, useState } from 'react';
import Titles from '../../components/dashboard/Titles';
import { GrArticle } from 'react-icons/gr';
import { MdViewStream } from 'react-icons/md';
import SEO from '../../components/re-usable/SEO';
import { useToast } from '../../components/toasts/ToastManager';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { adminGetBlogsStatistics, adminViewBlogs } from '../../redux/slices/blogSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [statisticsData, setStatisticsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [blogsCount, setblogsCount] = useState(0);
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generateYears = () => {
    const years = [];
    for (let year = 2024; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const getBlogStatistics = async (year) => {
    try {
      const response = await adminGetBlogsStatistics(year);
      if (response.status === 200) {
        setStatisticsData(response.data);
      } else if (response.status === 401) {
        addToast('error', 'You are not authorized!', 3000);
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        addToast(
          'error',
          response.message || 'Error getting the blog statistics',
          3000
        );
      }
    } catch (error) {
      addToast(
        'error',
        error.message || 'Unknown error occurred while getting blog statistics',
        3000
      );
    }
  };

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await adminViewBlogs();
      if (response.status === 200) {
        console.log(response.blogs.count);
        setblogsCount(response.blogs.length);
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

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    getBlogStatistics(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedYear(selectedYear);
  };

  const viewsPerMonth = Array(12).fill(0);

  statisticsData.forEach((data) => {
    if (data._id.month >= 1 && data._id.month <= 12) {
      viewsPerMonth[data._id.month - 1] = data.totalViews;
    }
  });

  const chartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Articles Read',
        data: viewsPerMonth,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Articles Read in ${selectedYear}`,
      },
    },
  };

  return (
    <>
      <SEO title="Dashboard - ES Gishoma" />
      <div className="dashboard-container bg-gray-100 min-h-screen">
        <Titles title="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="stat-card flex items-center p-4 bg-white shadow rounded-lg">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-700">
                Total Articles
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {blogsCount && blogsCount}
              </p>
            </div>
            <div className="text-blue-500 text-5xl">
              <GrArticle aria-label="Total Articles Icon" />
            </div>
          </div>
        </div>

        <div
          className="stat-card bg-white shadow rounded-lg mb-8"
          style={{ height: '300px', width: '50%' }}
        >
          <div className="flex justify-between items-center p-4">
            <h3 className="text-lg font-medium text-gray-700">
              Annual Articles Read
            </h3>
            <select
              name="year"
              id="year-select"
              className="border border-gray-300 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {generateYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div
            className="graph-container"
            style={{ height: '75%', width: '90%', margin: 'auto' }}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
