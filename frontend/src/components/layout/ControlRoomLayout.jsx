import React from 'react';
import { GovernmentHeader } from './GovernmentHeader';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import './layout.css';

export const ControlRoomLayout = ({ children, showSidebar = true }) => {
  return (
    <>
      <GovernmentHeader />
      {showSidebar && <Sidebar />}
      <div className={`page-container ${showSidebar ? 'with-sidebar' : ''}`}>
        <main className="page-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
