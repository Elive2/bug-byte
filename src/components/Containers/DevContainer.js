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

    var stateCopy = Object.assign({}, this.state);

    if (stateCopy.bugs[index].progress === "Not Started") {
      stateCopy.bugs[index].progress = "In Progress";
    } else {
      stateCopy.bugs[index].progress = "Completed";
    }

    this.setState({
        bugs: stateCopy.bugs
    });

    // axios({
    //   method: 'post',
    //   url: server,
    //   data: {
    //     progress: this.state.progress
    //   },
    //   withCredentials: true
    // })
    // .then((resp) => {
    //   console.log(resp.data);
    // })
    // .catch((error) => console.log(error));
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
              <th><Button key={bug.id} bsStyle="success" onClick={(ev, key) => this.handleProgress(ev, index)}>Progress</Button></th>
            </tr>)
          }
        </table>
      </div>
    );
  }
}

export default Dev;