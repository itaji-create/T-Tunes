import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      loading: true,
      disabled: true,
      redirect: false,
      name: '',
      image: '',
      description: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.buttonValidate = this.buttonValidate.bind(this);
  }

  componentDidMount() {
    getUser().then((data) => {
      this.setState({
        name: data.name,
        image: data.image,
        description: data.description,
        email: data.email,
        loading: false,
        load: true,
      });
      this.buttonValidate();
    });
  }

  handleChange({ target: { value, id } }) {
    this.setState({ [id]: value });
    this.buttonValidate();
  }

  updateData() {
    const { name, image, description, email } = this.state;
    const userObj = { name, image, description, email };
    this.setState({ loading: true });
    updateUser(userObj).then(this.setState({ loading: false, redirect: true }));
  }

  buttonValidate() {
    const { name, image, email, description } = this.state;
    if (name && image && email && description) this.setState({ disabled: false });
  }

  render() {
    const {
      load,
      name,
      loading,
      image,
      email,
      description,
      disabled,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && (<Loading />)}
        {load && (
          <form>
            <label htmlFor="edit-input-name">
              Nome
              <input
                data-testid="edit-input-name"
                id="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <label htmlFor="edit-input-email">
              E-mail
              <input
                type="email"
                data-testid="edit-input-email"
                value={ email }
                id="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição
              <input
                data-testid="edit-input-description"
                value={ description }
                id="description"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-image">
              Imagem Url
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
              disabled={ disabled }
              onClick={ this.updateData }
            >
              Salvar
            </button>
          </form>
        )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
