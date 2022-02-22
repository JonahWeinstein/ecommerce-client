
import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import NotFoundPage from './components/NotfoundPage';

const ErrorHandler = ({ children }) => {
  const location = useLocation();
  
  switch (get(location.state, 'errorStatusCode')) {
    case 401:
      
      return <NotFoundPage />;
    
    // ... cases for other types of errors
      
    default:
      return children
  }
};
export default ErrorHandler