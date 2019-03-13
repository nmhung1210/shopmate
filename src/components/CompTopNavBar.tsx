import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import qs from 'qs';
import React, { FormEvent, FormEventHandler, SyntheticEvent, useState } from 'react';
import { ButtonToolbar, Container, InputGroup, Nav, Navbar, Row } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
  const { search = '' } = location;
  const query = qs.parse(search.substr(1));
  const [queryString, doSearch] = useState(
    query && query.query_string ? query.query_string : ''
  );
  return (
    <div className='sticky-top'>
      {<Redirect to={`/search?query_string=${queryString}`} />}
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
              <Col md='7'>
                <Nav className='mr-auto'>
                  <Link to='/search?query_string=flower' className='mainNavItem'>
                    Women
                  </Link>
                  <Link to='/search?query_string=coat' className='mainNavItem'>
                    Men
                  </Link>
                  <Link to='/search?query_string=baby' className='mainNavItem'>
                    Kids
                  </Link>
                  <Link to='/search?query_string=shose' className='mainNavItem'>
                    Shose
                  </Link>
                  <Link to='/search?query_string=' className='mainNavItem'>
                    Brands
                  </Link>
                </Nav>
              </Col>
              <Col md='4'>
                <Nav className='justify-content-end'>
                  <Form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const formData = new FormData(e.currentTarget);
                      const searchString = formData.get('search') as string;
                      doSearch(searchString);
                      return false;
                    }}>
                    <InputGroup className='m-2'>
                      <FormControl
                        type='search'
                        name='search'
                        placeholder='Search'
                        size='sm'
                      />
                      <InputGroup.Append>
                        <InputGroup.Text className='form-control-sm'>
                          <SearchIcon />
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form>

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
