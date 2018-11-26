import axios from 'axios';
//import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

var React = require('react');
var server = process.env.API_URL + "bugs.php"

/*
  getting session cookie
*/
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

/*
  Author: Paul Jin
  Holds all the functionalities and looks of the Developer dashboard
*/

class Dev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
      progress: ""
    };
  }

  /*
    handleProgress() takes event and index as arguments. Event refers to the act of clicking on the progress button.
    Index refers to the id of the bug in the database. The function will sift through the bugs within our state array "bugs".
    It will get the bug the progress button corresponded to and then will update the progress of the bug both within the
    dashboard and our system's database.
  */
  handleProgress(event, index) {
    event.preventDefault();

    var prog;
    console.log(this.state.bugs)
    console.log(index)

    for (var key in this.state.bugs) {
      if (this.state.bugs[key].id === index) {
        if (this.state.bugs[key].progress === "Not Started") {
          prog = "In Progress";
        } else if (this.state.bugs[key].progress == "In Progress") {
          prog = "Completed";
        }
      }
    }

    axios({
      method: 'post',
      url: server,
      data: {
        cases: "update_progress",
        id: index,
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
      withCredentials: true,
      params: {
        filter1: "developer",
        value1: getCookie('user'),
        filter2: "tester",
        value2: getCookie('user')
      }
    })
    .then ((resp) => {
      this.setState({
        bugs: resp.data
      });
      console.log(this.state.bugs);
    })
    .catch((error) => console.log(error));
  }

  /*
    componentDidMount will get all of the bugs assigned to the current developer and fill in the state array "bugs"
    with the bugs in the database. It will get these bugs once this dashboard is rendered.
  */
  componentDidMount() {
    //populate bugs field with bugs reported
    axios({
      method: 'get',
      url: server,
      withCredential: true,
      params: {
        filter1: "developer",
        value1: getCookie('user'),
        filter2: "tester",
        value2: getCookie('user')
      }
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
              {bug.progress === "Completed" ? <th><Button bsSize="large" disabled>Completed</Button></th> : <th><Button key={bug.id} bsStyle="success" onClick={(ev, key) => this.handleProgress(ev, bug.id)}>Progress</Button></th>}
            </tr>)
          }
        </table>
      </div>
    );
  }
}

export default Dev;
