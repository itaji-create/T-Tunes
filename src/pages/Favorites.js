import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorited: [],
      load: false,
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    getFavoriteSongs().then((data) => {
      this.setState({ favorited: [...data], load: true, loading: false });
    });
  }

  handleChange({ target: { id } }) {
    const { favorited } = this.state;
    const idObj = favorited.find((music) => music.trackId === Number(id));
    this.setState({ loading: true });
    removeSong(idObj).then((data) => {
      this.setState({ favorited: [...data] });
    });
    getFavoriteSongs().then((data) => {
      this.setState({ favorited: [...data], loading: false });
    });
  }

  render() {
    const { favorited, load, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {load && (favorited.map((music) => (<MusicCard
          key={ music.trackId }
          trackId={ music.trackId }
          previewUrl={ music.previewUrl }
          trackName={ music.trackName }
          favoriteSongs={ this.handleChange }
          isChecked
        />)))}
      </div>
    );
  }
}

export default Favorites;
