import { type GiphyResponse } from '../types/giphy.types';

type RunGiphySearchQueryArgs = {
  searchQuery?: string;
};

export const runGiphySearchQuery = async ({
  searchQuery,
}: RunGiphySearchQueryArgs): Promise<GiphyResponse | null> => {
  try {
    const giphyResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&bundle=messaging_non_clips&q=${searchQuery}`
    );
    return giphyResponse.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const runGiphyTrendingQuery =
  async (): Promise<GiphyResponse | null> => {
    try {
      const giphyResponse = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${
          import.meta.env.VITE_GIPHY_API_KEY
        }&bundle=messaging_non_clips`
      );
      return giphyResponse.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };
