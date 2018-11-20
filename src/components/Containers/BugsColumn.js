import React from 'react';
import {Button, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

var server = process.env.API_URL

class BugsColumn extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggleDeleteModal.bind(this);
		this.deleteBug = this.deleteBug.bind(this);
		//this.asssignBug = this.assignBug.bind(this);
		this.state = {
			modal: false
		}
	}
  toggleDeleteModal() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.refreshBugs();
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
      	this.props.refreshDevs();
      });
  }

  render() {
		return (
			<div>
				<Jumbotron>
					<h3>Pending Bugs</h3>
					<Modal isOpen={this.state.modal}>
						<ModalBody>Bug Successfully Deleted</ModalBody>
						<ModalFooter>
							<Button onClick={() => this.toggleDeleteModal()}>Ok</Button>
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

