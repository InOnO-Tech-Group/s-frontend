import React from 'react';
import Header from '../../components/clients/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/clients/Footer';

const ClientsLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientsLayout;
