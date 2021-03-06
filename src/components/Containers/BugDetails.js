import React from 'react';
import {Card, CardBody, Collapse, Button, Table} from 'reactstrap';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import Report from 'bv-react-data-report';
import '../../index.css'

/*
	Author: Eli Yale

	This shows all the details associated with a particular bug when the manager clicks on the bug in the bugsColumn
	It also contains the buttons to assign and delete
*/

class BugDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
			historyModal: false,
		}
	}

	toggleCollapse(bugID) {
  	this.state.collapse = !this.state.collapse;
  	this.forceUpdate();
  }

  toggleHistoryModal() {
    this.setState({
      historyModal: !this.state.historyModal
    });
    //this.configureReport();
  }

	render() {
		var historyJson = "{" + this.props.details['history'] + "}";
		var historyArray = [];
		historyArray.push(JSON.parse(historyJson));
		return (
			<div>
				<Modal size="lg" isOpen={this.state.historyModal} className="historyReportModal">
            <ModalBody>
              <Report data={historyArray} id="historyReport"/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => this.toggleHistoryModal()}>Ok</Button>
            </ModalFooter>
          </Modal>
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
      		<Button color="warning" onClick={(event) => this.toggleHistoryModal()}>History</Button>
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
