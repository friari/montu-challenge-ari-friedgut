import { useState, useEffect, useMemo } from 'react';
import './App.css';
import {
  runGiphyQuery,
  debounce,
  savedGifsFromLocalStorage,
} from './utilities';
import { HomeIcon, HeartIcon, SearchForm, Grid } from './components';

function App() {
  const [results, setResults] = useState<Awaited<
    ReturnType<typeof runGiphyQuery>
  > | null>(null);
  const [showSaved, setShowSaved] = useState<boolean>(false);

  const fetchGiphyData = async (
    endpoint: 'trending' | 'search',
    searchTerm?: string
  ) => {
    hideSaved();
    const data = await runGiphyQuery({ endpoint, searchTerm });
    if (data) setResults(data);
  };

  const fetchGiphyTrending = () => fetchGiphyData('trending');
  const fetchGiphySearch = (searchTerm: string) =>
    fetchGiphyData('search', searchTerm);

  const searchInputHandler = debounce(async (searchTerm?: string) => {
    searchTerm
      ? await fetchGiphySearch(searchTerm)
      : await fetchGiphyTrending();
  }, 300);

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
