import React from 'react';
import Header from './Header';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';
import {ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

var server = process.env.API_URL + "bugs.php"

class ManagerDash extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.assign = this.toggle.bind(this);
		this.state = {
      bugs: [],
      bobBugs: [],
      susanBugs: [],
      dropdownOpen: false
    };
	}

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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

  assignBob(user, data) {
  	console.log(user, data);
  }

	render() {
		return (
			<div>
				<Header/>
				<Row>
					<Col xs="6">
						<Jumbotron>
							<ListGroup>
							{this.state.bugs.map((object, i) => {
								return (
						        <ListGroupItem>
						        	<Card>
								        <CardBody>
								          <CardTitle>{object['Name']}</CardTitle>
								          <CardText>
								          	<Dropdown group isOpen={this.state.dropdownOpen} toggle={this.toggle} id="profile" key={i}>
											        <DropdownToggle caret>
											          Assign
											        </DropdownToggle>
											        <DropdownMenu>
											          <DropdownItem>Bob</DropdownItem>
											          <DropdownItem divider />
											          <DropdownItem>Susan</DropdownItem>
											        </DropdownMenu>
								      			</Dropdown>
								          	Creator of the world: {object['FirstName'] + object['LastName']}<br/>
								          	Severity: {object['Severity']}<br/>
								          	Description: {object['Description']}<br/>
								          </CardText>
								        </CardBody>
								      </Card>
						        </ListGroupItem>
								)
							})}
							</ListGroup>
						</Jumbotron>
					</Col>
					<Col xs="6">
						<Jumbotron>
							<ListGroup>
								<ListGroupItem>
				        	<Card>
						        <CardBody>
						          <CardTitle>Bob</CardTitle>
						          <CardText>
						          	Assigned Bugs:
						          </CardText>
						        </CardBody>
						      </Card>
				        </ListGroupItem>
				        <ListGroupItem>
				        	<Card>
						        <CardBody>
						          <CardTitle>Susan</CardTitle>
						          <CardText>
						          	Assigned Bugs:
						          </CardText>
						        </CardBody>
						      </Card>
				        </ListGroupItem>
			        </ListGroup>
						</Jumbotron>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ManagerDash;