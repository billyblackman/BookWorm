import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserContext } from "../providers/UserProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navBar" color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">BookWorm</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/explore">Explore</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/collection">Collection</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/wishlist">Wishlist</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/queue">Queue</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/stats">Stats</NavLink>
                </NavItem>
              </>
            }
          </Nav>

          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
