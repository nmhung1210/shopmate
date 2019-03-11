import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCustomerLogOut, actionShowDialog } from '../models/actions';
import { IRootState } from '../models/reducers';
import { ICartState } from '../models/reducers/Cart';
import { ICustomer } from '../models/schemas';

interface ITopNavBarProps extends DispatchProp {
  user: ICustomer;
  cart: ICartState;
}

function CompTopNavBar (props: ITopNavBarProps) {
  const { user, cart } = props;
  return (
    <div className='sticky-top'>
      <Navbar bg='dark text-light py-1'>
        {user.name ? (
          <h6 className='m-2'>
            Hi{`  ${user.name},  `}
            <span
              className='text-danger py-1 cursor-pointer'
              onClick={() => props.dispatch(actionCustomerLogOut())}>
              Sign out
            </span>
            {'  '}
          </h6>
        ) : (
          <h6 className='m-2'>
            Hi{'  '}
            <span
              className='text-danger py-1 cursor-pointer'
              onClick={() => props.dispatch(actionShowDialog('login', {}))}>
              Sign in
            </span>
            {'  '}
            or{'  '}
            <span
              className='text-danger p-1 cursor-pointer'
              onClick={() => props.dispatch(actionShowDialog('register', {}))}>
              Register
            </span>
          </h6>
        )}
      </Navbar>
      <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
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
                  <IconButton
                    aria-label='Cart'
                    onClick={() => {
                      props.dispatch(actionShowDialog('cart', {}));
                    }}>
                    <Badge badgeContent={Object.keys(cart.items).length} color='secondary'>
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
    </div>
  );
}

export default connect((state: IRootState) => {
  return {
    user: state.Customer,
    cart: state.Cart
  };
})(CompTopNavBar);
