import React from 'react';
import Header from './Header';
//import logo from './logo.png'
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, Jumbotron} from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';

//TODO
//[ ] verify posting to server works
//[ ] load bugs associated with the user into cards
var server = process.env.API_URL + "bugs.php"

class ClientDash extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      modal: false,
      bugs: []
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
  	console.log("fetching bugs")
    fetch(server,
    {
    	method: 'GET'
    })
      .then(response => response.json())
      .then(data => this.setState({bugs: data}))
  }

  handleSubmit(event) {
  	//this.toggle()
  	//prevents the default action="" from begin called, instead we handle 
  	//the submit in this custom method
  	event.preventDefault()

  	//create an obect which contains all the form data
  	const data = new FormData(event.target)
  	console.log(data)
  	this.toggle()

  	//post the FormData object to our backend
  	fetch(server, {
  		method: 'POST',
  		body: {
  			action: "form",
  			data: data
  		}
  	}).then(response => response.json())
      .then(data => console.log(data));
  }

	render() {
		return (
			<div>
				<Header/>
				<Row>
					<Col sm="12" md={{ size: 1, offset: 5 }}>
						<Button color="danger" size="lg" id="reportBug" onClick={this.toggle}>Report Bug</Button>{' '}
						<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		          <ModalHeader toggle={this.toggle}>Bug Report Form</ModalHeader>
		          <ModalBody>
		          	<Form onSubmit={this.handleSubmit}>
		          		<FormGroup>
          					<Label for="bugName">Name of bug </Label>
		          			<Input type="text" id="bugName" name="name"/>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label for="bugType">Type of bug </Label>
		          			<Input type="select" id="bugType" name="type">
		          				<option>Syntax Error</option>
		          				<option>Runtime Error</option>
		          				<option>Logic Error</option>
		          				<option>Other</option>
		          			</Input>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label for="bugSeverity"> Severity </Label>
		          			<Input type="select" id="bugSeverity" name="severity">
		          				<option>Low</option>
		          				<option>Medium</option>
		          				<option>High</option>
		          			</Input>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label for="bugDescription">Description</Label>
		          			<Input type="text" id="bugDescription" name="description"/>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label>Program</Label>
		          			<Input type="text" id="bugProgram" name="program"/>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label for="bugBrowser">Browser</Label>
		          			<Input type="select" id="bugBrowser" name="browser">
		          				<option>Chrome</option>
		          				<option>Safari</option>
		          				<option>Edge</option>
		          				<option>Opera</option>
		          			</Input>
		          		</FormGroup>
		          		<Button type="submit" color="primary">Submit</Button>{' '}
		            	<Button color="secondary" onClick={this.toggle}>Cancel</Button>	
		          	</Form>
		          </ModalBody>
		        </Modal>
					</Col>
				</Row>
				<Row>
					<Col sm="12" md={{ size: 6, offset: 3 }}>
						<Jumbotron>
							{this.state.bugs.map(function(object, i) {
								return (
									<ListGroup>
						        <ListGroupItem>
						        	<Card>
								        <CardBody>
								          <CardTitle>{object['Name']}</CardTitle>
								          <CardText>
								          	Creator: {object['FirstName'] + object['LastName']}<br/>
								          	Severity: {object['Severity']}<br/>
								          	Description: {object['Description']}<br/>
								          </CardText>
								          <Button>Details</Button>
								        </CardBody>
								      </Card>
						        </ListGroupItem>
						      </ListGroup>
								)
							})}
						</Jumbotron>
					</Col>
				</Row>
			</div>
			
		);
	}
}

export default ClientDash;
