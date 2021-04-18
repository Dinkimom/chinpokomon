import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import { IPaginationState } from '../../types/IPaginationState';
import { paginator } from '../../utils/paginator';
import './Pagination.css';

interface IPaginationProps {
  count: number;
}

export const Pagination = withRouter(({ count, history }: any) => {
  const { limit = '50', currentPage = '1' } = useParams<IPaginationState>();

  const [paginationLimit, setPaginationLimit] = useState(limit);

  const handleLimitChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setPaginationLimit(value);

      history.push(`/${value}&1`);
    },
    [paginationLimit, history]
  );

  useEffect(() => {
    setPaginationLimit(limit);
  }, [limit]);

  const renderInner = useMemo(() => {
    const pagesCount = Math.floor(count / Number(limit) - 1);
    const pages = paginator(currentPage, pagesCount);

    if (count && pages.length) {
      return (
        <>
          <div className="pagination__pages">
            {pages.map((item, index) =>
              typeof item === 'number' ? (
                <Link
                  to={`/${limit}&${item}`}
                  className={`pagination__pages__link ${
                    item == Number(currentPage) ? 'current' : ''
                  }`}
                  key={index}
                >
                  {item}
                </Link>
              ) : (
                <span key={index} className="pagination__pages__link">
                  {item}
                </span>
              )
            )}
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
        </>
      );
    }

    return null;
  }, [paginationLimit, currentPage, count]);

  return <div className="pagination">{renderInner}</div>;
});
