import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Login />
          <Search />
          <Album />
          <Favorites />
          <Profile />
          <ProfileEdit />
          <NotFound />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
