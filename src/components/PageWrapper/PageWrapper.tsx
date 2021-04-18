import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import './PageWrapper.css';

export interface IPageWrapperProps {
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
      return <Loader data-testid="page-wrapper-loader" />;
    }

    if (error) {
      return (
        <ErrorMessage
          error={error}
          link={<Link to="/">Return Home</Link>}
          data-testid="page-wrapper-error"
        />
      );
    }

    return (
      <div className={`container ${className}`} data-testid="page-wrapper-root">
        <div className="container__header">
          <Link
            to={href}
            className="container__header__link link"
            data-testid="page-wrapper-link"
          >
            &larr;
          </Link>
          <h2
            className="container__header__title"
            data-testid="page-wrapper-title"
          >
            {title}
          </h2>
        </div>
        <div className="content" data-testid="page-wrapper-body">
          {children}
        </div>
      </div>
    );
  }, [isFetching, error]);

  return renderInner;
};
