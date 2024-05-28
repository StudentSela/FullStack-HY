import PropTypes from "prop-types";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin} data-testid="login-form" style={{ maxWidth: '400px', 
    margin: '0 auto', 
    padding: '20px', 
    border: '1px solid #000', 
    borderRadius: '8px' }}>
      <h2>Login</h2>
      <div style={{ marginBottom: '10px' }}>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        />
      </div>
      <button type="submit" style={{ padding: '8px 16px' }}>login</button>
    </form>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;