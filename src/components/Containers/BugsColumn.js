import React from 'react';
import {Button, Jumbotron} from 'reactstrap';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class BugsColumn extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		}
	}
  toggle() {
	  this.setState(prevState => ({
	    dropdownOpen: !prevState.dropdownOpen
	  }));
  }

  render() {
		return (
			<Jumbotron>
				<h3>Pending Bugs</h3>
				{this.props.data.map((object, i) => {
					return (
		      	<Card key={i}>
			        <CardBody>
			          <CardTitle>{object['Name']}</CardTitle>
			          <CardText>
			          	Creator: {object['FirstName'] + object['LastName']}<br/>
			          	Severity: {object['Severity']}<br/>
			          	Description: {object['Description']}<br/>
			          </CardText>
			          <Button color="danger" onClick={this.deleteBug} key={i}>Delete Bug</Button>{' '}
			          <ButtonDropdown group isOpen={this.state.dropdownOpen} toggle={this.toggle} id="profile">
					        <DropdownToggle caret>
					          Developer
					        </DropdownToggle>
					        <DropdownMenu>
					          <DropdownItem>Bob</DropdownItem>
					          <DropdownItem divider />
					          <DropdownItem>Susan</DropdownItem>
					        </DropdownMenu>
		      			</ButtonDropdown>
			        </CardBody>
			      </Card>
					)
				})}
			</Jumbotron>
		)
	}
}

export default BugsColumn;

