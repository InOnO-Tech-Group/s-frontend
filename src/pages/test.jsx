import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';

const TestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getSample = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/api/v1/test');
        setData(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getSample();
  }, []);
  return (
    <div>
      <h1>The test page</h1>
      {isLoading ? (
        'Loading'
      ) : (
        <div className='text-4xl font-bold"'>
          These are backend datas: <b>{data}</b>
          <br />
          <Link to="/" className="underline">
            Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default TestPage;
