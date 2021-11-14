import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      collectionName,
      artworkUrl100,
      collectionId,
    } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default Card;
