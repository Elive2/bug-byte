import LoginContainer from
var React = require('react');

class Login extends React.Component {

  render() {
    return (
      <div>
        <LoginContainer history = {this.props.history} />
      </div>
    );
  }
}

export default Login;
