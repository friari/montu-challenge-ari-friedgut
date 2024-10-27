import React, { useEffect } from 'react';
import { debounce } from '../utilities';
import '../styles/SearchForm.css';

type SearchFormProps = React.HTMLProps<HTMLFormElement> & {
  searchFunction: (searchTerm: string) => void;
  searchQuery: string;
  setSearchQuery: (newValue: string) => void;
};

const SearchForm = ({
  searchFunction,
  searchQuery,
  setSearchQuery,
  ...props
}: SearchFormProps) => {
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, 300);

  useEffect(() => {
    searchFunction(searchQuery);
  }, [searchQuery]);

  return (
    <form action="" className={`search-form ${props.className}`}>
      <input
        type="text"
        className="search-form__input"
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchForm;
