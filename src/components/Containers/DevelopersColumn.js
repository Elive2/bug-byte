import React from 'react';
import {Jumbotron} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Card, CardTitle, CardBody, CardText} from 'reactstrap';

/*
	This will show all of the developers to the manager and the corresponding bugs that each developer is working on
*/

class DevelopersColumn extends React.Component {
	constructor(props) {
		super(props)
	}

	render () {
		return (
			<Jumbotron>
				<h3>Developers</h3>
				{this.props.devs.map((devObject, i) => {
					return (
		      	<Card key={i}>
			        <CardBody>
			          <CardTitle>{devObject['username']}</CardTitle>
			          <CardText>
			          	Assigned Bugs:
			          	<ListGroup>
				          	{this.props.bugs.map((bugObject,j) => {
				          		if (bugObject['developer'] == devObject['username']) {
					          		return (
					          			<ListGroupItem key={j}>{bugObject['Name']}</ListGroupItem>
					          		)
					          	}
					          	else {
					          		return ('')
					          	}
				          	})}
			          	</ListGroup>
			          </CardText>
			        </CardBody>
			      </Card>
					)
				})}
			</Jumbotron>
		)
	}
}

export default DevelopersColumn;
