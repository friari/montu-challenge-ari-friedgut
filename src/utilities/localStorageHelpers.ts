import { type GifObject } from '../types/giphy.types';

export const savedGifsFromLocalStorage = () => {
  const savedGifs = localStorage.getItem('favourites');
  console.log('saved gifs', savedGifs);
  if (!savedGifs) {
    localStorage.setItem('favourites', JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(savedGifs);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const checkGifIndex = (
  savedGifs: GifObject[],
  currentGif: GifObject
) => {
  return savedGifs.findIndex((gif) => gif.id === currentGif.id);
};

export const checkIfSaved = (savedGifs: GifObject[], currentGif: GifObject) => {
  return checkGifIndex(savedGifs, currentGif) !== -1;
};

export const saveCurrentGif = (
  savedGifs: GifObject[],
  currentGif: GifObject
) => {
  const updatedSavedGifs = checkIfSaved(savedGifs, currentGif)
    ? savedGifs.filter((gif) => gif.id !== currentGif.id)
    : savedGifs.concat([], [currentGif]);
  localStorage.setItem('favourites', JSON.stringify(updatedSavedGifs));
  return updatedSavedGifs;
};
