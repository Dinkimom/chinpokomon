import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  memo,
  useMemo,
  useState,
} from 'react';
import './Image.css';
import noImage from './no-image.png';

export const Image: React.FC<DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = memo(({ className = '', ...other }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const renderInner = useMemo(() => {
    if (error) {
      return <img className="image--no-image" src={noImage} />;
    }

    return (
      <img
        {...other}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`image ${className} ${loading ? 'loading' : ''}`}
      />
    );
  }, [error, loading]);

  return renderInner;
});
