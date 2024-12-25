import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminViewServices } from '../../redux/slices/servicesSlice';
import { useToast } from '../toasts/ToastManager';

const MenuDropDown = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const getServices = async () => {
    setIsLoading(true);
    try {
      const response = await adminViewServices();
      if (response.status === 200) {
        setServices(response.data);
      } else if (response.status === 404) {
        setServices([])
      } else {
        addToast(
          'error',
          response.message || 'Error getting the services',
          3000
        );
      }
    } catch (error) {
      addToast('error', 'Error getting the services', 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <ul className="space-y-2">
      {isLoading ? (
        <li>Loading...</li>
      ) : services.length > 0 ? (
        services.map((service, index) => (
          <li key={index}>
            <Link to={`/services/news/${service._id}`}>{service.name}</Link>
          </li>
        ))
      ) : (
        <li>No Services available</li>
      )}
    </ul>
  );
};

export default MenuDropDown;
