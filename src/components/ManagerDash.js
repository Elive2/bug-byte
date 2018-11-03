import React from 'react';
import Header from './Header';
import BugsColumn from './Containers/BugsColumn';
import DevelopersColumn from './Containers/DevelopersColumn';
import TestersColumn from './Containers/TestersColumn';
import {Row, Col, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';
import {ListGroup, ListGroupItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

var server = process.env.API_URL + "bugs.php"

class ManagerDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      bugs: [],
      dropdownOpen: false
    };
	}

  deleteBug() {
  	console.log("deleting the bug")
  }

  componentDidMount() {
  	console.log("fetching bugs from php")
    fetch(server,
    {
    	method: 'GET'
    })
      .then(response => response.json())
      .then(data => this.setState({bugs: data}))
  }

	render() {
		return (
			<div>
				<Header/>
				<Row>
					<Col xs="4">
						<BugsColumn data={this.state.bugs}/>
					</Col>
					<Col xs="4">
						<DevelopersColumn/>
					</Col>
					<Col xs="4">
						<TestersColumn/>
					</Col>	
				</Row>
			</div>
		)
	}
}

export default ManagerDash;