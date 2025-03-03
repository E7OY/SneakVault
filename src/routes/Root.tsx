import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import '../index.css';

interface RootLayoutProps {
  user: string;
}

const RootLayout: React.FC<RootLayoutProps> = () => {
  return (
    <>
      <Header/>
      <NavBar/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;