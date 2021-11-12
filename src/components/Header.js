import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">userName</h4>
      </header>
    );
  }
}

export default Header;
