import { type GiphyResponse } from '../types/giphy.types';

type RunGiphyQueryArgs = {
  endpoint: 'trending' | 'search';
  searchTerm?: string;
};

const runGiphyQuery = async ({
  endpoint,
  searchTerm,
}: RunGiphyQueryArgs): Promise<GiphyResponse | null> => {
  try {
    const giphyResponse = await fetch(
      `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&bundle=messaging_non_clips${
        endpoint === 'search' ? `&q=${searchTerm || ''}` : ''
      }`
    );
    return giphyResponse.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default runGiphyQuery;
