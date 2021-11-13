import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ search: value });
  }

  render() {
    const { search } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ search.length < minLength }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
