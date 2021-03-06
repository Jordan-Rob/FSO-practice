import React from 'react';
import PropType from 'prop-types'

const LoginForm = ({
    handleLogin,
    usernameChange,
    passwordChange,
    username,
    password
}) => {
    return (
    <form onSubmit = { handleLogin }>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={usernameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={passwordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
    )
}

LoginForm.propTypes = {
  handleLogin:PropType.func.isRequired,
  usernameChange:PropType.func.isRequired,
  passwordChange:PropType.func.isRequired,
  username:PropType.string.isRequired,
  password:PropType.string.isRequired
}


export default LoginForm

