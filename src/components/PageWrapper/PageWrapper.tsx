import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import './PageWrapper.css';

interface IPageWrapperProps {
  href: string;
  title?: string;
  children: ReactNode;
  className?: string;
  isFetching: boolean;
  error: string | null;
  linkCallback?: (...args: any) => void;
}

export const PageWrapper: React.FC<IPageWrapperProps> = ({
  title,
  href,
  children,
  className,
  isFetching,
  error,
}) => {
  const renderInner = useMemo(() => {
    if (isFetching) {
      return <Loader />;
    }

    if (error) {
      return (
        <ErrorMessage error={error} link={<Link to="/">Return Home</Link>} />
      );
    }

    return (
      <div className={`container ${className}`}>
        <div className="container__header">
          <Link to={href} className="container__header__link link">
            &larr;
          </Link>
          <h2 className="container__header__title">{title}</h2>
        </div>
        <div className="content">{children}</div>
      </div>
    );
  }, [isFetching, error]);

  return renderInner;
};
