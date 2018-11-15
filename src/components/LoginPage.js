import LoginContainer from './Containers/LoginContainer';
import Header from './Header';

var React = require('react');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  render() {
    return (
    	<div>
    		<Header />
	      <LoginContainer history = {this.props.history} />
      </div>
    );
  }
}

export default LoginPage;
