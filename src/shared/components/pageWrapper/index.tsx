import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Loader } from '../loader';
import { ErrorMessage } from '../errorMessage';

interface IPageWrapperProps {
  href: string;
  title?: string;
  children: ReactNode;
  className?: string;
  isFetching: boolean;
  error: string;
}

export const PageWrapper = ({
  title,
  href,
  children,
  className,
  isFetching,
  error,
}: IPageWrapperProps) => {
  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage error={error} link={<Link to='/'>Return Home</Link>} />
    );
  }

  return (
    <div className={`container ${className}`}>
      <div className='container__header'>
        <Link to={href} className='container__header__link link'>
          &larr;
        </Link>
        <h2 className='container__header__title'>{title}</h2>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};
