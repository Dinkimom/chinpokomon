import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface IPageWrapperProps {
  href: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({
  title,
  href,
  children,
  className,
}: IPageWrapperProps) => {
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
