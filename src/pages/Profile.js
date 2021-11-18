import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      load: false,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ userName: user, loading: false, load: true });
      console.log(this.state);
    });
  }

  render() {
    const { loading, load, userName: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        {load && (
          <div>
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <img data-testid="profile-image" src={ image } alt={ `imagem de ${name}` } />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
