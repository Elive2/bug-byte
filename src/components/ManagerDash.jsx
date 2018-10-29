import React from 'react';
import Header from './Header';
import {Row, Col, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';


class ManagerDash extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
    fetch('http://students.engr.scu.edu/~eyale/bug-byte/bugs/bugs.php')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

	render() {
		return (
			<div>
				<Header/>
				<Row>
					<Col xs="6">
						<Jumbotron>
							{//this.state
							}
								<Card>
									<CardBody>
										<CardTitle>
											Example bug 1
										</CardTitle>
										<CardText>
											Assign me to a developer
										</CardText>
									</CardBody>
								</Card>
						</Jumbotron>
					</Col>
					<Col xs="6">
						<Jumbotron>
							<h1>Sam</h1>
						</Jumbotron>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ManagerDash;