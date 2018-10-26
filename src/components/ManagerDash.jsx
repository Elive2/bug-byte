import React from 'react';
import Header from './Header';
import {Row, Col, Jumbotron} from 'reactstrap'

class ManagerDash extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<Row>
					<Col sm="12" md={{ size: 1, offset: 5 }}>
						<Jumbotron>
							Hello
						</Jumbotron>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ManagerDash