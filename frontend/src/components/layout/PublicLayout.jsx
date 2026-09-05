import React from 'react';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';
import './layout.css';

export const PublicLayout = ({ children }) => {
  return (
    <>
      <PublicHeader />
      <div className="page-container public-container">
        <main className="page-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
