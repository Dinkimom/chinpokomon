import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import { IPaginationState } from '../../types/IPaginationState';
import './Pagination.css';

interface IPaginationProps {
  count: number;
  onLoad: (limit: string, currentPage: string) => void;
}

export const Pagination = withRouter(({ count, onLoad, history }: any) => {
  const { limit = '50', currentPage = '1' } = useParams<IPaginationState>();

  const [paginationLimit, setPaginationLimit] = useState(limit);

  const handleLimitChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setPaginationLimit(value);

      history.push(`/${value}&1`);
    },
    [paginationLimit]
  );

  useEffect(() => {
    onLoad(paginationLimit, currentPage);
  }, [paginationLimit, currentPage]);

  const renderInner = useMemo(() => {
    const pages = new Array(Math.ceil(count / Number(limit)) || 0).fill('');

    return (
      <div className="pagination">
        <div className="pagination__pages">
          {pages.map((item, index) => (
            <Link
              to={`/${limit}&${index + 1}`}
              className="pagination__pages__link"
              key={index}
            >
              {index + 1}
            </Link>
          ))}
        </div>
        <div className="pagination__controls">
          <select
            name="limit"
            value={paginationLimit}
            onChange={handleLimitChange}
          >
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>
    );
  }, [paginationLimit, currentPage, count]);

  return renderInner;
});
