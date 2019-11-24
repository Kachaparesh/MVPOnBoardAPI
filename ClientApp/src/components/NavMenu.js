import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-left navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow"  color="dark" dark>
                    <Container className = " mr-0 ml-0 ">
                        <NavbarBrand className=" text-light ">React</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav mr-auto flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-light mr-2" to="/">Customers</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light mr-2" to="/product">Products</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light mr-2" to="/store">Stores</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light mr-2" to="/sale">Sales</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
