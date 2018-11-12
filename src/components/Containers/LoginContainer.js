import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {Jumbotron, Row, Col} from 'reactstrap';
import axios from 'axios';

var server = process.env.API_URL + "bugs.php";
var React = require('react');

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  handleUserChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogin(event) {
    console.log("logging in")
    event.preventDefault();

    axios({
      method: 'post',
      url: server,
      data: {
        cases: "login",
        email: this.state.email,
        password: this.state.password
      },
      withCredentials: true
    })
    .then((resp) => {
      if (resp.data.status == "success") {
        console.log("Successfully logged in");
      } else {
        console.log("Failed to log in");
      }
    })
    .catch((error) => console.log(error));
  }

  validateEntries() {

    if (this.state.email.length > 0 && this.state.password.length > 0) {
      return true;
    } else {
      return false;
    }

  }

  render() {
    return (
      <Row>
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <Jumbotron>
            <form onSubmit = {(ev) => this.handleLogin(ev)}>
              <FormGroup controlId = "email" bsSize = "large">
                <ControlLabel>Email</ControlLabel>
                <FormControl autoFocus type = "email" value = {this.state.email} onChange = {(ev) => this.handleUserChange(ev)}/>
              </FormGroup>

              <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl value = {this.state.password} onChange = {(ev) => this.handlePassChange(ev)} type = "password"/>
              </FormGroup>

              <Button block bsSize = "large" disabled = {!this.validateEntries()} type = "submit">Login</Button>
            </form>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

export default LoginContainer;
