import Dev from "./Containers/DevContainer";
import Header from './Header';
import {Row, Col, Jumbotron} from 'reactstrap';
var React = require('react');

/*
  Author: Paul Jin
  Will render the functionaliaties and looks of the Developer dashboard
*/

class DevDash extends React.Component {
  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    return (
      <div>
        <Header logout={true}/>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Jumbotron>
              <Dev history={this.props.history}/>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DevDash;
