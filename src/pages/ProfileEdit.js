import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      loading: true,
      user: {
        name: '',
        image: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getUser().then((userData) => {
      this.setState({ user: userData, loading: false, load: true });
      console.log(this.state);
    });
  }

  handleChange({ target: { value, id } }) {
    this.setState({ [id]: value });
    console.log(this.state);
  }

  render() {
    const { load, user: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {load && (
          <form>
            <label htmlFor="edit-input-name">
              <input
                data-testid="edit-input-name"
                id="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <label htmlFor="edit-input-email">
              <input
                data-testid="edit-input-email"
                value={ email }
                id="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              <input
                data-testid="edit-input-description"
                value={ description }
                id="description"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-image">
              <input
                data-testid="edit-input-image"
                value={ image }
                id="image"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
