import React from 'react';
import {Button, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse} from 'reactstrap';
import BugDetails from './BugDetails';

var server = process.env.API_URL

/*
	Author: Eli Yale
	
	This will show all the bugs that have been submitted to the manager
*/

class BugsColumn extends React.Component {
	constructor(props) {
		super(props);
		this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
		this.toggleAssignModal = this.toggleAssignModal.bind(this);
		this.deleteBug = this.deleteBug.bind(this);
		//this.asssignBug = this.assignBug.bind(this);
		this.state = {
			deleteModal: false,
			assignModal: false,
		}
	}
  toggleDeleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  toggleAssignModal() {
  	this.setState({
  		assignModal: !this.state.assignModal
  	});
  }

/*
	This function will delete a bug whenever the manager clicks the delete bug button. The arguments for it are
	an event which is the act of clicking the button and the bugID which is the corresponding ID of the bug in our
	database.
*/
  deleteBug(event, bugID) {
  	event.preventDefault();

  	fetch(server+'bugs.php', {
  		method: 'POST',
  		headers: {
  			"Content-Type": "application/json",
  		},
  		body: JSON.stringify({
  			cases: "delete_bug",
  			bugID: bugID,
  		})
  	}).then(response => response.json())
  	  .then(data => {
  	  	console.log(data);
  	  	this.toggleDeleteModal();
  	  	this.props.refreshBugs();
  	  })

  }

/*
	This will allow managers to click a button to assign a tester for a specific bug; the parameters are event, bugID, and devUsername.
	Event is the act of clicking on the button. The function will take the bugID and devUsername and use these variables to assign the correct bug
	to the correct tester
*/
  assignTester(event, bugID, devUsername) {
    event.preventDefault();

    fetch(server+'devs.php', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        cases: "assign_tester",
        bugID: bugID,
        devUsername: devUsername
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.toggleAssignModal();
        this.props.refreshDevs();
        this.props.refreshBugs();
      });
  }

/*
	This function will assign a bug to a developer. The arguments are event, bugID, and devUsername.
	Event refers to the act of clicking the button. The function will take the corresponding bugID and devUsername when clicked
	and access our database to find it. It will then send the correct bug to the correct developer and update fields within our
	bug database.
*/
  assignBug(event, bugID, devUsername) {
  	event.preventDefault();

  	fetch(server+'devs.php', {
  		method: 'POST',
  		headers: {
  			"Content-Type" : "application/json",
  		},
  		body: JSON.stringify({
  			cases: "assign_dev",
  			bugID: bugID,
  			devUsername: devUsername
  		})
  	}).then(response => response.json())
      .then(data => {
      	console.log(data);
      	this.toggleAssignModal();
      	this.props.refreshDevs();
      	this.props.refreshBugs();
      });
  }

  render() {
		return (
			<div>
				<Jumbotron>
					<h3>Pending Bugs</h3>
					<Modal isOpen={this.state.deleteModal}>
						<ModalBody>Bug Successfully Deleted</ModalBody>
						<ModalFooter>
							<Button onClick={() => this.toggleDeleteModal()}>Ok</Button>
						</ModalFooter>
					</Modal>
					<Modal isOpen={this.state.assignModal}>
						<ModalBody>Bug Successfully Assigned</ModalBody>
						<ModalFooter>
							<Button onClick={() => this.toggleAssignModal()}>Ok</Button>
						</ModalFooter>
					</Modal>
					{this.props.bugs.map((bugObject, i) => {
						return (bugObject['progress'] != 'Completed' &&
				      	<Card key={i}>
					        <CardBody>
					          <CardTitle>{bugObject['Name']}</CardTitle>
					          <CardText>
					          	<BugDetails details={bugObject} devs={this.props.devs} tester={(event, bug, dev) => this.assignTester(event, bug, dev)} assign={(event, bug, dev) => this.assignBug(event, bug, dev)} delete={(event, bug) => this.deleteBug(event, bug)}/>
							    	</CardText>
					        </CardBody>
					      </Card>
						)
					})}
				</Jumbotron>
			</div>
		)
	}
}

export default BugsColumn;
