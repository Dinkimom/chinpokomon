import React from 'react';
import './index.css';

interface IErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: IErrorMessageProps) => (
  <div className='error-message'>
    <span>!</span>
    <p>{error}</p>
  </div>
);
