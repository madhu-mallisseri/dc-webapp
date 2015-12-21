import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {actions as loginInfoActions} from '../redux/modules/loginInfo';

import styles from '../styles/_style.scss';

const loginInfoAction = { loginInfoActions };
export class LoginView extends React.Component {

  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount (){
      console.log('componentDidMount');
      console.log(this.props.user);
      console.log(this.context.store);
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps.user) {
      // logged in, let's show home
      this.context.history.replaceState(null, '/about');
    }
  }

  handleLogin (event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    console.log('----Login----');
    console.log(username.value);
    console.log(password.value);
    const self = this;
    this.props.dispatch(login(username.value, password.value)).then(function (response) {
      if (response.user) {
        self.props = { 'user' : response };
        console.log(self.context.store);
        // self.context.store.replaceReducer('isLoggedIn',true);
        // loginInfoActions.setLoggedIn(true);
        // self.props.dispatch(loginInfo.setLoggedIn('isLoggedIn', true));
        // self.props.setLoggedIn(true);
        self.context.history.replaceState('loggedIn', '/about');
      }
    });
    username.value = '';
    password.value = '';
  }

  render () {
    const {user, loginError} = this.props;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4'>
            <div className='panel-signin'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Please Log in</h3>
              </div>
              <form className='form-signin'>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-user'/></span>
                  <input type='text' ref='username' className='form-control' placeholder='Username' required autoFocus/>
                </div>

                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-lock'/></span>
                  <input type='password' ref='password' className='form-control' placeholder='Password' required/>
                </div>

                <div className='checkbox'>
                  <label>
                    <input type='checkbox' value='remember-me'/> Remember me
                  </label>
                </div>

                {
                  !user && loginError &&
                  <div className='alert alert-danger'>
                    {loginError.message}. Hint: use admin/password to log in.
                  </div>
                }

                <button className='btn btn-primary btn-block' onClick={this.handleLogin}><i className='fa fa-sign-in'/>{' '}Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginView.contextTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

LoginView.propTypes = {
  user: PropTypes.object,
  loginError: PropTypes.object,
  setLoggedIn: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {auth} = state;
  if (auth) {
    return {user: auth.user, loginError: auth.loginError, isLoggedIn: true};
  }

  return {user: null};
}

export default connect(mapStateToProps, loginInfoAction)(LoginView);
