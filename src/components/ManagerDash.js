import React from 'react';
import Header from './Header';
import BugsColumn from './Containers/BugsColumn';
import DevelopersColumn from './Containers/DevelopersColumn';
import TestersColumn from './Containers/TestersColumn';
import {Row, Col, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';
import {ListGroup, ListGroupItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

var server = process.env.API_URL;

class ManagerDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      bugs: [],
      devs: [],
      dropdownOpen: false
    };

    this.fetchDevs = this.fetchDevs.bind(this);
    this.fetchBugs = this.fetchBugs.bind(this);
	}

  deleteBug() {
  	console.log("deleting the bug")
  }

  componentDidMount() {
  	console.log("fetching bugs from php")
  	this.fetchBugs()
  	this.fetchDevs()
  }

  fetchDevs() {
		fetch(server+'devs.php',
		    {
		    	method: 'GET'
		    })
		      .then(response => response.json())
		      .then(data => this.setState({devs: data}))
  }

  fetchBugs() {
    fetch(server+'bugs.php',
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
						<BugsColumn bugs={this.state.bugs} devs={this.state.devs}/>
					</Col>
					<Col xs="4">
						<DevelopersColumn devs={this.state.devs} bugs={this.state.bugs}/>
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