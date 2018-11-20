import React from 'react';
import {Button, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

var server = process.env.API_URL

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

  deleteBug(event, bugID) {
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
						return (
				      	<Card key={i}>
					        <CardBody>
					          <CardTitle>{bugObject['Name']}</CardTitle>
					          <CardText>
					          	Creator: {bugObject['creator']}<br/>
					          	Severity: {bugObject['Severity']}<br/>
					          	Description: {bugObject['Description']}<br/>
					          </CardText>
					          <Button color="danger" onClick={(ev, key) => this.deleteBug(ev, bugObject['id'])} key={i}>Delete Bug</Button>{' '}
					          <br/>
					          <br/>
					          {this.props.devs.map((devObject, j) => {
							    		return (
							    			<div key={j}>
								    			<Button color="success" onClick={(ev, key) => this.assignBug(ev, bugObject['id'], devObject['username'])} key={bugObject['id']}>{devObject['username']}</Button>
								    			<br/>
								    			<br/>
							    			</div>
							    		)
							    	})}
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

