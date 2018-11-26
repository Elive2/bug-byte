import React from 'react';
import Header from './Header';
import BugsColumn from './Containers/BugsColumn';
import DevelopersColumn from './Containers/DevelopersColumn';
import TestersColumn from './Containers/TestersColumn';
import {Row, Col, Button, Modal, ModalHeader, ModalFooter, Jumbotron} from 'reactstrap';
import Report from 'bv-react-data-report';

var server = process.env.API_URL;

/*
	Author: Eli Yale

	This will fetch all of the bugs and developers from our database and store them into the appropriate state values.
	This will then render each column of the manager dashboard and pass the state values to each one via props
*/

class ManagerDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      bugs: [],
      devs: [],
      reportModalOpen: false
    };

    this.fetchDevs = this.fetchDevs.bind(this);
    this.fetchBugs = this.fetchBugs.bind(this);
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

  toggle() {
  	this.setState({
  		reportModalOpen: !this.state.reportModalOpen,
  	})
  }

	render() {
		var historyArray = [];
		if (this.state.bugs.length > 0) {
			for (var i = 0; i < this.state.bugs.length; i++) {
				var bugInfo = {
					"BugName": this.state.bugs[i]['Name'],
					"Type": this.state.bugs[i]['Type'],
					"Developer": this.state.bugs[i]['developer'],
					"Tester": this.state.bugs[i]['tester'],
				};
				var bugInfoJson = JSON.stringify(bugInfo);
				var bugInfoJsonStripped = bugInfoJson.replace(/{/g, "").replace(/}/g, "");
				console.log(bugInfoJsonStripped);
				var reportString = '{' + bugInfoJsonStripped + "," + this.state.bugs[i]['history'] + '}';
				console.log(reportString);
				historyArray.push(JSON.parse(reportString));
				console.log(historyArray);
			}
		}

		return (
			<div>
				<Header logout={true}/>
				<Modal size="lg" isOpen={this.state.reportModalOpen} className="historyReportModal">
					<ModalHeader>
						Report
					</ModalHeader>
						<Report data={historyArray}/>
					<ModalFooter>
						<Button onClick={() => this.toggle()}>Close</Button>
					</ModalFooter>
				</Modal>
				<Row>
					<Col sm="8" md={{ size: 3, offset: 5 }}>
							<br/>
								<br/>
								<Button onClick={() => this.toggle()}>Generate Bugs Report</Button>
							<br/>
							<br/>
					</Col>
				</Row>
				<Row>
					<Col xs="4">
						<BugsColumn bugs={this.state.bugs} devs={this.state.devs} refreshBugs={() => this.fetchBugs()} refreshDevs={() => this.fetchDevs()}/>
					</Col>
					<Col xs="4">
						<DevelopersColumn devs={this.state.devs} bugs={this.state.bugs}/>
					</Col>
					<Col xs="4">
						<TestersColumn devs={this.state.devs} bugs={this.state.bugs}/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ManagerDash;
