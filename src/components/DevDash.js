import Dev from "../Containers/DevContainer";
var React = require('react');


class DevDash extends React.Component {
  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    return (
      <div>
        <div>Dashboard</div>
        <Dev history={this.props.history}/>
      </div>
    );
  }
}

export default DevDash;
