import React from 'react';
import {Card, CardBody, Collapse, Button} from 'reactstrap';

class BugDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
		}
	}

	toggleCollapse(bugID) {
  	this.state.collapse = !this.state.collapse;
  	this.forceUpdate();
  }

	render() {
		return (
			<div>
	      <Button onClick={() => this.toggleCollapse(this.props.details['id'])}>Details</Button>
	    	<Collapse isOpen={this.state.collapse}>
	      	<Card>
	      		<CardBody>
	          	Creator: {this.props.details['creator']}<br/>
	          	Severity: {this.props.details['Severity']}<br/>
	          	Description: {this.props.details['Description']}<br/>
	          </CardBody>
	        </Card>
	        <Card>
	        	<CardBody>
	        		<Button color="danger" onClick={(event) => this.props.delete(event, this.props.details['id'])}>Delete Bug</Button>{' '}
						    <br/>
						    <br/>
						    {this.props.devs.map((devObject, j) => {
						  		return (
						  			<div key={j}>
						    			<Button color="success" onClick={(event) => this.props.assign(event, this.props.details['id'], devObject['username'])}>{devObject['username']}</Button>
						    			<br/>
						    			<br/>
						  			</div>
						  		)
						  	})}
						 </CardBody>
					</Card>
	   	  </Collapse>
	  	</div>

		)
	}
	
}

export default BugDetails;