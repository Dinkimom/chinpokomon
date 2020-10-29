import React, { HTMLAttributes } from 'react';
import './Loader.css';

export const Loader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${className} loader`} {...props}>
    <p>Loading</p>

    <div className="loader__ring">
      <span></span>
    </div>
  </div>
);
