import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    this.state = {
      id: params.id,
      musics: [],
      load: false,
    };
  }

  componentDidMount = () => {
    const { id } = this.state;
    getMusics(id).then((data) => {
      this.setState({ musics: data, load: true });
    });
  }

  render() {
    const { musics, load } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {load && (
          <>
            <p data-testid="artist-name">{ musics[0].artistName }</p>
            <p data-testid="album-name">{ musics[0].collectionName }</p>
            {musics.filter((music) => music.trackName).map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
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
