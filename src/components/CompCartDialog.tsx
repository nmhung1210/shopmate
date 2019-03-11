import { CircularProgress } from '@material-ui/core';
import { withSnackbar, withSnackbarProps } from 'notistack';
import { FormEvent } from 'react';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Media } from 'react-bootstrap';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import api from '../apis/webApi';
import { CDN_ROOT } from '../configs';
import {
  actionCartCheckout,
  actionHideDialog,
  actionRemoveCartItem,
  actionShowDialog,
  actionUpdateCartItemQuantity
} from '../models/actions';
import { IRootState } from '../models/reducers';
import { ICartState } from '../models/reducers/Cart';
import { IDialogProps } from '../models/reducers/Dialogs';
import { ICustomer } from '../models/schemas';
import CompColorPicker from './CompColorPicker';
import CompQuantityInput from './CompQuantityInput';
import CompSizePicker from './CompSizePicker';

interface ICartDialogProps extends DispatchProp, IDialogProps, withSnackbarProps {
  cart: ICartState;
  user: ICustomer;
}

function CompCartDialog (props: ICartDialogProps) {
  const {
    cart: { items, total }
  } = props;
  return (
    <Modal
      size='lg'
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={() => {
        props.dispatch(actionHideDialog('cart'));
      }}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          <h3>{Object.keys(items).length} Items In Your Cart</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-4'>
        <Container>
          <Row className='border-bottom text-muted p-2'>
            <Col as='h6' md={6}>
              Item
            </Col>
            <Col as='h6' md={1}>
              Size
            </Col>
            <Col as='h6' md={1}>
              Color
            </Col>
            <Col as='h6' md={3}>
              Quantity
            </Col>
            <Col as='h6' md={1}>
              Price
            </Col>
          </Row>
          {Object.keys(items).map((itemId) => {
            const item = items[itemId];
            return (
              <Row className='text-muted p-2 my-4'>
                <Col md={6}>
                  <Media>
                    <img
                      width={96}
                      height={96}
                      className='mr-3'
                      src={`${CDN_ROOT}${item.product.image}`}
                      alt={item.product.name}
                    />
                    <Media.Body>
                      <h6>{item.product.name}</h6>
                      <span
                        className='text-muted cursor-pointer'
                        onClick={() => {
                          props.dispatch(actionRemoveCartItem(itemId));
                        }}>
                        <span className='text-danger px-2'>X</span> Remove
                      </span>
                    </Media.Body>
                  </Media>
                </Col>
                <Col md={1}>
                  <CompSizePicker
                    sizes={item.attributes
                      .filter((s) => s.attribute_name === 'Size')
                      .map((a) => a.attribute_value)}
                  />
                </Col>
                <Col md={1} className='pt-2'>
                  <CompColorPicker
                    colors={item.attributes
                      .filter((s) => s.attribute_name === 'Color')
                      .map((a) => a.attribute_value)}
                  />
                </Col>
                <Col md={3}>
                  <CompQuantityInput
                    value={item.quantity}
                    onChange={(val) => {
                      props.dispatch(actionUpdateCartItemQuantity(itemId, val));
                    }}
                  />
                </Col>
                <Col as='h6' md={1}>
                  ${item.subtotal.toFixed(2)}
                </Col>
              </Row>
            );
          })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container className='d-flex justify-content-between'>
          <Button
            variant='outline-danger'
            size='lg'
            className='rounded-pill'
            onClick={() => {
              props.dispatch(actionHideDialog('cart'));
            }}>
            Back To Shop
          </Button>
          <Button
            variant='danger'
            size='lg'
            className='rounded-pill'
            disabled={!Object.keys(props.cart.items).length}
            onClick={() => {
              if (!props.user.name) {
                props.dispatch(actionShowDialog('login', {}));
              }
              props.dispatch(actionHideDialog('cart'));
              api.loginChain.then(() => {
                props.dispatch(actionCartCheckout());
                props.enqueueSnackbar(
                  <span>
                    Your order <strong>#{Date.now()}</strong> was created successfully!
                  </span>,
                  { variant: 'success' }
                );
              });
            }}>
            Check Out
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default connect((state: IRootState) => {
  const { show = false, message = '', error = '', requesting = false } =
    state.Dialogs.cart || {};
  return { show, message, error, requesting, cart: state.Cart, user: state.Customer };
})(withSnackbar(CompCartDialog));
