import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    getUser().then((data) => {
      const { name } = data;
      this.setState({ userName: name });
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        {!userName ? <Loading />
          : <h4 data-testid="header-user-name">{userName}</h4>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
