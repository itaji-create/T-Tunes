import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      isChecked,
      favoriteSongs,
    } = this.props;
    return (
      <div>
        <p>{trackId}</p>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ favoriteSongs }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  favoriteSongs: PropTypes.func.isRequired,
};

export default MusicCard;
