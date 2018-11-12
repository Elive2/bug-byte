import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

var React = require('react');
var server = process.env.API_URL + "bugs.php"

class Dev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
      progress: ""
    };
  }

  handleProgress(event, index) {
    event.preventDefault();

    var new_index = index + 1;
    var prog;

    if (this.state.bugs[index].progress === "Not Started") {
      prog = "In Progress";
    } else if (this.state.bugs[index].progress == "In Progress") {
      prog = "Completed";
    }

    axios({
      method: 'post',
      url: server,
      data: {
        cases: "update_progress",
        id: new_index,
        progress: prog
      },
      withCredentials: true
    })
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => console.log(error));

    axios({
      method: 'get',
      url: server,
      withCredentials: true
    })
    .then ((resp) => {
      this.setState({
        bugs: resp.data
      });
      console.log(this.state.bugs);
    })
    .catch((error) => console.log(error));
  }

  componentDidMount() {
    //populate bugs field with bugs reported
    axios({
      method: 'get',
      url: server,
      withCredentials: true
    })
    .then((resp) => {
      console.log(resp.data[0].progress);
      this.setState({
        bugs: resp.data
      });
      console.log(this.state.bugs);
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
            <th>Description</th>
            <th>Progression Stage</th>
            <th>Progress</th>
          </tr>
          {this.state.bugs.map((bug, index) =>
            <tr>
              <th><div key={bug.id}>{bug.Name}</div></th>
              <th>{bug.Description}</th>
              <th>{bug.progress}</th>
              {bug.progress === "Completed" ? <th><Button bsSize="large" disabled>Completed</Button></th> : <th><Button key={bug.id} bsStyle="success" onClick={(ev, key) => this.handleProgress(ev, index)}>Progress</Button></th>}
            </tr>)
          }
        </table>
      </div>
    );
  }
}

export default Dev;
