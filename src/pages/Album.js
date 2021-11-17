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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const { id } = this.state;
    getMusics(id).then((data) => {
      this.setState({ musics: data, loading: true });
      getFavoriteSongs().then((e) => {
        this.setState({ favorited: [...e], load: true, loading: false });
        console.log(this.state);
      });
    });
  }

  handleChange({ target: { id, checked } }) {
    this.setState({ loading: true });
    const { musics } = this.state;
    const idObj = musics.find((music) => music.trackId === Number(id));
    console.log(idObj);
    if (checked) {
      addSong(idObj).then((data) => {
        this.setState({ favorited: [...data], loading: false });
      });
    }
    if (!checked) {
      removeSong(idObj).then((data) => {
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
                favoriteSongs={ this.handleChange }
                isChecked={
                  favorited.some((e) => e.trackId === music.trackId)
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
