import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios/axiosInstance';

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
        <div>
          These are backend datas: <b>{data}</b>
        </div>
      )}
    </div>
  );
};

export default TestPage;
