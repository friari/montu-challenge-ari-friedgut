import { useState, useRef } from 'react';
import { type GifObject } from '../types/giphy.types';
import { HeartIcon } from '.';
import '../styles/GridItem.css';

interface GridItemProps extends GifObject {
  onSaveButtonClick: (gifId: string) => void;
  saved: boolean;
}

const GridItem = (props: GridItemProps) => {
  const { id, images, onSaveButtonClick, saved } = props;
  const { fixed_width_small } = images;
  const [isSaved, setIsSaved] = useState<boolean>(saved);
  const animateRef = useRef<boolean>(false);

  const handleClick = () => {
    animateRef.current = true;
    setTimeout(() => (animateRef.current = false), 200);
    setIsSaved(!isSaved);
    onSaveButtonClick(id);
  };

  return (
    <div className="grid-item">
      <img src={fixed_width_small.url} alt="" className="grid-item__image" />
      <button className="grid-item__button">
        <HeartIcon
          className={`grid-item__icon ${isSaved ? 'filled' : ''} ${
            animateRef.current ? 'animate' : ''
          }`}
          onClick={handleClick}
        />
      </button>
    </div>
  );
};

export default GridItem;
