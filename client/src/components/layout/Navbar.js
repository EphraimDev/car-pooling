import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import AuthContext from '../../context/auth/authContext';

const NavBar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser } = authContext;

  const onLogout = () => {
    logoutUser();
}

  const authLinks = (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <NavLink href='/profile'>Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='#!' onClick={onLogout}>Sign out</NavLink>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <NavLink href='/login'>Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/register'>Register</NavLink>
      </NavItem>
    </Nav>
  );

  return (
    <div>
      <Navbar className="rt-navbar" color='light' light expand='md'>
        <NavbarBrand href='/'>{ title }</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {isAuthenticated ? authLinks : guestLinks}
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired
};

NavBar.defaultProps = {
  title: 'CarpoolNG'
};

export default NavBar;
