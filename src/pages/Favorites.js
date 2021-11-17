import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorited: [],
      load: false,
    };
  }

  componentDidMount = () => {
    getFavoriteSongs().then((data) => {
      this.setState({ favorited: [...data], load: true });
    });
  }

  render() {
    const { favorited, load } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {load && (favorited.map((music) => (<MusicCard
          key={ music }
          trackId={ music }
        />)))}
      </div>
    );
  }
}

export default Favorites;
