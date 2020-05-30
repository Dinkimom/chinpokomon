import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface IErrorMessageProps {
  error: string;
  link?: ReactElement<Link>;
}

export const ErrorMessage = ({ error, link }: IErrorMessageProps) => (
  <div className='error-message'>
    <span>!</span>
    <p>{error}</p>
    {link}
  </div>
);
