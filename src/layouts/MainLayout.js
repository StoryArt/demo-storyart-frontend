import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const MainLayout = (props) => {
    return (
        <div>
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="#home">StoryArt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/create-story">Create Stories</Link>
                    </Nav>
                    <NavDropdown className="ml-auto" title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
            <div>
                { props.children }
            </div>
        </div>
    );
};


export default MainLayout;
