import React from 'react';
import Header from './Header';
import axios from 'axios';
//import logo from './logo.png'
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, Jumbotron} from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';

var server = process.env.API_URL + "bugs.php";

class ClientDash extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      modal: false,
      bugs: [],
      collapse: true
    };

    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
	};

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDetails() {
  	//unused method but could be used to toggle details of a bug card
    this.setState({ collapse: !this.state.collapse });
  }

  fetchBugs() {
  	axios.get(server, {
  		params: {
  			filter1: "creator",
  			value1: this.getCookie('user'),
  			filter2: "creator",
  			value2: this.getCookie('user'),
  		}
  	}).then((resp) => {
      this.setState({
        bugs: resp.data
      });
      console.log(this.state.bugs);
    })
    .catch((error) => console.log(error));
  }

  componentDidMount() {
  	console.log("fetching bugs");
  	this.fetchBugs();
  }

  handleSubmit(event) {
  	console.log("HANDLING SUBMIT");
  	//this.toggle()
  	//prevents the default action="" from begin called, instead we handle 
  	//the submit in this custom method
  	event.preventDefault();

  	//create an obect which contains all the form data
  	const formData = new FormData(event.target)
  	var formObject = {};
		formData.forEach(function(value, key){
		    formObject[key] = value;
		});

  	this.toggle()

  	//post the FormData object to our backend
  	fetch(server, {
  		method: 'POST',
  		headers: {
  			"Content-Type" : "application/json",
  		},
  		body: JSON.stringify({
  			cases: "add_bug",
  			data: formObject,
  		})
  	}).then(response => response.json())
      .then(data => {
      	console.log(data);
      	this.fetchBugs();
      });
  }

	render() {
		return (
			<div>
				<Header logout={true}/>
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
		          				<option>UI Glitch</option>
		          				<option>Login Issue</option>
		          				<option>Other</option>
		          			</Input>
		          		</FormGroup>
		          		<FormGroup>
		          			<Label for="bugSeverity">Severity</Label>
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
									<ListGroup key={i}>
						        <ListGroupItem>
						        	<Card>
								        <CardBody>
								          <CardTitle>{object['Name']}</CardTitle>
								          <CardText>
								          	Progess: {object['progress']}<br/>
								          	Creator: {object['creator']}<br/>
								          	Severity: {object['Severity']}<br/>
								          	Type: {object['Type']}<br/>
								          	Description: {object['Description']}<br/>
								          </CardText>
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
