import React, { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './ErrorMessage.css';

export interface IErrorMessageProps {
  error: string;
  link?: ReactElement<Link>;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = memo(
  ({ error, link }) => (
    <div className="error-message">
      <span>!</span>
      <p data-testid="error-text">{error}</p>
      {link}
    </div>
  )
);
