import React from 'react';
import logo from './logo.png'
import '../index.css'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class Header extends React.Component{
	constructor(props) {
	  super(props);

	  this.toggle = this.toggle.bind(this);
	  this.state = {
	    dropdownOpen: false
	  };
	}

	toggle() {
	  this.setState({
	    dropdownOpen: !this.state.dropdownOpen
	  });
	  console.log("toggle")
	}
	render() {
		return (
			<header>
				<Row>
					<Col>
						<img className="logo" src={logo}/>
						<h2 className="name">Bug<br/>Byte </h2>
					</Col>
					<Col xs="6">
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="profile">
			        <DropdownToggle caret>
			          Profile
			        </DropdownToggle>
			        <DropdownMenu>
			          <DropdownItem>Log Out</DropdownItem>
			          <DropdownItem divider />
			          <DropdownItem>Switch Users</DropdownItem>
			        </DropdownMenu>
      			</Dropdown>
					</Col>
				</Row>
			</header>
		)
	}
}

export default Header