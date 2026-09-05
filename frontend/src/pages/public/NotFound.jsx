import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '60vh' }}>
      <h1 className="text-4xl font-bold text-primary-navy mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to TrainCast
      </Link>
    </div>
  );
};

export default NotFound;
