import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { type GiphyResponse } from './types/giphy.types';
import {
  runGiphySearchQuery,
  runGiphyTrendingQuery,
  savedGifsFromLocalStorage,
} from './utilities';
import { HomeIcon, HeartIcon, SearchForm, Grid } from './components';

function App() {
  const [results, setResults] = useState<GiphyResponse | null>(null);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchGiphyTrending = async () => {
    hideSaved();
    const data = await runGiphyTrendingQuery();
    if (data) setResults(data);
  };
  const fetchGiphySearch = async () => {
    hideSaved();
    const data = await runGiphySearchQuery({ searchQuery });
    if (data) setResults(data);
  };

  const searchInputHandler = async (searchTerm?: string) => {
    if (searchTerm) {
      await fetchGiphySearch();
    } else {
      await fetchGiphyTrending();
    }
  };

  const homeIconHandler = () => fetchGiphyTrending();

  const hideSaved = () => {
    if (showSaved) setShowSaved(false);
  };

  const handleFavouritesClick = () => setShowSaved(true);

  useEffect(() => {
    fetchGiphyTrending();
  }, []);

  const memoizedData = useMemo(
    () => (showSaved ? savedGifsFromLocalStorage() : results?.data),
    [results, showSaved]
  );

  return (
    <>
      <header className="header">
        <button className="header__icon" onClick={homeIconHandler}>
          <HomeIcon />
        </button>
        <SearchForm
          searchFunction={searchInputHandler}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="header__form"
        />
        <button className="header__icon" onClick={handleFavouritesClick}>
          <HeartIcon />
        </button>
      </header>
      {results?.data && <Grid data={memoizedData} />}
    </>
  );
}

export default App;
