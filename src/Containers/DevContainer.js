import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

var React = require('react');
var server = "http://students.engr.scu.edu/~eyale/bug-byte/bugs/bugs.php";

class Dev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [
        {_id: 0, title: "eCampus Down", stage: "Not Started"},
        {_id: 1, title: "Camino Down", stage: "In Progress"}
      ]
    };
  }

  handleProgress(event, index) {
    event.preventDefault();

    var stateCopy = Object.assign({}, this.state);

    if (stateCopy.bugs[index].stage === "Not Started") {
      stateCopy.bugs[index].stage = "In Progress";
    } else {
      stateCopy.bugs[index].stage = "Completed";
    }

    this.setState({
        bugs: stateCopy.bugs
    });
  }

  componentDidMount() {
    //populate bugs field with bugs reported
    axios({
      method: 'get',
      url: server + '/bugs/bugs.php',
      withCredentials: true
    })
    .then((resp) => {
      console.log(resp.data);
      if (resp.data.success) {
        console.log(resp.data.success);
        console.log("Get bugs success!");
      } else {
        console.log(resp.data.error);
        console.log("Could not obtain bugs");
      }
    })
    .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <table>
          <tr>
            <th>Bugs</th>
            <th>Progression Stage</th>
            <th>Progress</th>
          </tr>
          {this.state.bugs.map((bug, index) =>
            <tr>
              {/*<th><div key={bug._id}><Link to={`/bugs/${bug._id}`}>{bug.title}</Link></div></th>*/}
              <th>{bug.stage}</th>
              <th><Button key={bug._id} bsStyle="success" onClick={(ev, key) => this.handleProgress(ev, index)}>Progress</Button></th>
            </tr>)
          }
        </table>
      </div>
    );
  }
}

export default Dev;
