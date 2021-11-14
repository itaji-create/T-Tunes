import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: false,
      text: false,
      albuns: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.request = this.request.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ search: value });
  }

  request() {
    const { search } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(search).then((data) => {
      this.setState({ albuns: data, loading: false, text: true });
    });
  }

  render() {
    const {
      search,
      albuns,
      loading,
      text,
    } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        {!loading ? (
          <>
            <input
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ search.length < minLength }
              onClick={ this.request }
            >
              Pesquisar
            </button>
          </>
        ) : <Loading />}
        <br />
        {text && (
          albuns.length > 0 ? `Resultado de álbuns de: ${search}`
            : 'Nenhum álbum foi encontrado')}
        <div>
          {albuns.map((album) => (
            <Card
              key={ album.collectionName }
              artworkUrl100={ album.artworkUrl100 }
              collectionName={ album.collectionName }
              collectionId={ album.collectionId }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
