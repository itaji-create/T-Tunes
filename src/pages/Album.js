import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    this.state = {
      id: params.id,
      musics: [],
      load: false,
      loading: false,
      favorited: [],
      cheked: false,
    };
    this.favorites = this.favorites.bind(this);
  }

  componentDidMount = () => {
    const { id } = this.state;
    getMusics(id).then((data) => {
      this.setState({ musics: data, load: true });
    });
    getFavoriteSongs().then((data) => {
      this.setState({ favorited: [...data] });
      console.log(this.state);
    });
  }

  favorites({ target: { id, checked } }) {
    this.setState({ loading: true });
    if (checked) {
      addSong(id).then((data) => {
        this.setState({ favorited: [...data], loading: false });
      });
    } else {
      removeSong(id).then((data) => {
        this.setState({ favorited: [...data], loading: false });
      });
    }
    getFavoriteSongs().then((data) => {
      this.setState({ favorited: [...data] });
    });
  }

  render() {
    const { musics, load, loading, favorited } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        {load && (
          <>
            <p data-testid="artist-name">{ musics[0].artistName }</p>
            <p data-testid="album-name">{ musics[0].collectionName }</p>
            {musics.filter((music) => music.trackName).map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                favoriteSongs={ this.favorites }
                isChecked={
                  favorited.some((e) => parseFloat(e) === music.trackId)
                }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
