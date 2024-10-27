import { useState } from 'react';
import { type GifObject } from '../types/giphy.types';
import GridItem from './GridItem';
import {
  savedGifsFromLocalStorage,
  saveCurrentGif,
  checkIfSaved,
} from '../utilities';
import '../styles/Grid.css';

type GridProps = {
  data: GifObject[];
};

const Grid = ({ data }: GridProps) => {
  const [savedGifs, setSavedGifs] = useState(savedGifsFromLocalStorage());

  const handleSaveButtonClick = (currentGif: GifObject) => {
    setSavedGifs((prevSavedGifs: GifObject[]) => {
      return saveCurrentGif(prevSavedGifs, currentGif);
    });
  };

  return (
    <div className="grid">
      {data.map((gif) => (
        <GridItem
          {...gif}
          onSaveButtonClick={() => handleSaveButtonClick(gif)}
          saved={checkIfSaved(savedGifs, gif)}
          key={gif.id}
        />
      ))}
    </div>
  );
};

export default Grid;
