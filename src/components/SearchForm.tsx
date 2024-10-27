import React from 'react';
import '../styles/SearchForm.css';

type SearchFormProps = React.HTMLProps<HTMLFormElement> & {
  searchFunction: (searchTerm: string) => void;
};

const SearchForm = ({ searchFunction, ...props }: SearchFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchFunction(e.target.value);
  };

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
