import { Card, CircularProgress } from '@material-ui/core';
import React from 'react';
import { FormEvent } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { actionCustomerLogin, actionHideDialog, actionShowDialog } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IDialogProps } from '../models/reducers/Dialogs';

interface ILoginModalProps extends DispatchProp, IDialogProps {}

function CompLoginDialog (props: ILoginModalProps) {
  return (
    <Modal
      size='sm'
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={() => {
        props.dispatch(actionHideDialog('login'));
      }}>
      <Card className='text-center'>
        <Form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(e.currentTarget);
            const param = {
              email: formData.get('email') as string,
              password: formData.get('password') as string,
              remember: !!formData.get('remember')
            };
            props.dispatch(actionCustomerLogin(param.email, param.password));
            return false;
          }}>
          <Modal.Header closeButton>
            <Modal.Title className='text-center w-100'>
              <h3>Sign in</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-4'>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                disabled={!!props.requesting}
                type='email'
                name='email'
                placeholder='Enter email'
                size='lg'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                disabled={!!props.requesting}
                type='password'
                name='password'
                placeholder='Password'
                size='lg'
              />
            </Form.Group>
            <Form.Group controlId='formBasicChecbox'>
              <Form.Check
                readOnly={!!props.requesting}
                type='checkbox'
                name='remember'
                value='remember'
                label='Remember me'
              />
            </Form.Group>
            <Form.Group controlId='formErrorMessage'>
              <Form.Text className='text-danger'>{props.error}</Form.Text>
            </Form.Group>
            <Button
              size='lg'
              disabled={!!props.requesting}
              variant='danger'
              type='submit'
              className='px-4 rounded-pill'>
              {props.requesting ? (
                <CircularProgress size='1.5rem' className='text-light' />
              ) : null}{' '}
              Sign in
            </Button>
          </Modal.Body>
          <Modal.Footer className='p-1'>
            <Container className='d-flex justify-content-between p-0'>
              <Button
                variant='link'
                size='sm'
                className='text-danger'
                onClick={() => {
                  // TODO: Implement for forgot password
                }}>
                Forgot password?
              </Button>
              <Button
                variant='link'
                size='sm'
                className='text-danger'
                onClick={() => {
                  props.dispatch(actionHideDialog('login'));
                  props.dispatch(actionShowDialog('register', {}));
                }}>
                Create an account
              </Button>
            </Container>
          </Modal.Footer>
        </Form>
      </Card>
    </Modal>
  );
}

export default connect((state: IRootState) => {
  const { show = false, message = '', error = '', requesting = false } =
    state.Dialogs.login || {};
  return { show, message, error, requesting };
})(CompLoginDialog);
