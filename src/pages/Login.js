import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
      redirect: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ userName: value });
  }

  async loadUser() {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      userName,
      loading,
      redirect,
    } = this.state;
    const minLength = 3;
    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form>
              <input
                onChange={ this.onInputChange }
                data-testid="login-name-input"
              />
              <button
                disabled={ userName.length < minLength }
                type="button"
                data-testid="login-submit-button"
                onClick={ this.loadUser }
              >
                Entrar
              </button>
              {redirect && <Redirect to="/search" />}
            </form>)}
      </div>
    );
  }
}
export default Login;
