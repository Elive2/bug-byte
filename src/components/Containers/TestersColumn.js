import React from 'react';
import {Jumbotron} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Card, CardTitle, CardBody, CardText} from 'reactstrap';

class TestersColumn extends React.Component {
	constructor(props) {
		super(props)
	}

	render () {
		return (
			<Jumbotron>
				<h3>Testers</h3>
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
		)
	}
}

export default TestersColumn;

