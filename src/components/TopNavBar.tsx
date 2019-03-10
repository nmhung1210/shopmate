import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Row
} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function TopNavBar (props: any) {
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light' sticky='top'>
      <Link to='/' className='brandName'>
        SHOPMATE
      </Link>

      <Navbar.Collapse>
        <Container>
          <Row className='justify-content-md-center'>
            <Col md='1' />
            <Col md='8'>
              <Nav className='mr-auto'>
                <Link to='/search?query_string=women' className='mainNavItem'>
                  Women
                </Link>
                <Link to='/search?query_string=men' className='mainNavItem'>
                  Men
                </Link>
                <Link to='/search?query_string=kids' className='mainNavItem'>
                  Kids
                </Link>
                <Link to='/search?query_string=shose' className='mainNavItem'>
                  Shose
                </Link>
                <Link to='/search?query_string=brands' className='mainNavItem'>
                  Brands
                </Link>
              </Nav>
            </Col>
            <Col md='3'>
              <Nav className='justify-content-end'>
                <IconButton aria-label='Search'>
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label='Cart'>
                  <Badge badgeContent={4} color='secondary'>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Nav>
            </Col>
          </Row>
        </Container>
        <Nav />
      </Navbar.Collapse>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    </Navbar>
  );
}
