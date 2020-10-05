import React, { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './ErrorMessage.css';

interface IErrorMessageProps {
  error: string;
  link?: ReactElement<Link>;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = memo(
  ({ error, link }) => (
    <div className="error-message">
      <span>!</span>
      <p>{error}</p>
      {link}
    </div>
  )
);
