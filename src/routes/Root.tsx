import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../index.css';
import { UserProvider } from '../context/userContext';


interface RootLayoutProps {
  user: string;
}

const RootLayout: React.FC<RootLayoutProps> = () => {
  return (
    <>
    <UserProvider>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
    </>
  );
};

export default RootLayout;