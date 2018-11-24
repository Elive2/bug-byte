import React from 'react';
import {Card, CardBody, Collapse, Button, Table} from 'reactstrap';

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
	      <br/>
	      <br/>
	    	<Collapse isOpen={this.state.collapse}>
	      	<Card>
	      		<CardBody>
	          	Creator: {this.props.details['creator']}<br/>
	          	Severity: {this.props.details['Severity']}<br/>
	          	Description: {this.props.details['Description']}<br/>
	          </CardBody>
	        </Card>
	        <br/>
      		<Button color="danger" onClick={(event) => this.props.delete(event, this.props.details['id'])}>Delete Bug</Button>{' '}
			    <br/>
			    <br/>
			    <Table bordered>
			    	<thead>
			    		<tr>
			    			<th>Assign Dev</th>
			    			<th>Assign Tester</th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		{this.props.devs.map((devObject, j) => {
					  		return (
				  				<tr>
						  			<td>
						    			<Button size="sm" color="success" onClick={(event) => this.props.assign(event, this.props.details['id'], devObject['username'])}>{devObject['username']}</Button>
						  			</td>
						  			<td>
						  				<Button size="sm" color="info" onClick={(event) => this.props.tester(event, this.props.details['id'], devObject['username'])}>{devObject['username']}</Button>
						  			</td>
					  			</tr>
					  		)
					  	})}
			    	</tbody>
			  	</Table>
	   	  </Collapse>
	  	</div>

		)
	}
	
}

export default BugDetails;