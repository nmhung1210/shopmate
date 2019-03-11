import { Card, CircularProgress } from '@material-ui/core';
import React from 'react';
import { FormEvent } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { actionCustomerRegister, actionHideDialog, actionShowDialog } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IDialogProps } from '../models/reducers/Dialogs';

interface IRegisterModalProps extends DispatchProp, IDialogProps {}

function CompRegisterDialog(props: IRegisterModalProps) {
  return (
    <Modal
      size='sm'
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={() => {
        props.dispatch(actionHideDialog('register'));
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
              reTypePassword: formData.get('reTypePassword') as string
            };
            if (param.password !== param.reTypePassword) {
              props.dispatch(
                actionShowDialog('register', { error: 'Password does not match!' })
              );
            } else {
              props.dispatch(actionCustomerRegister(param.email, param.password));
            }
            return false;
          }}>
          <Modal.Header closeButton>
            <Modal.Title className='text-center w-100'>
              <h3>Register</h3>
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
            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                disabled={!!props.requesting}
                type='password'
                name='reTypePassword'
                placeholder='Re-type Password'
                size='lg'
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
              Register
            </Button>
          </Modal.Body>
          <Modal.Footer className='p-1'>
            <Container className='d-flex justify-content-between p-1'>
              <span>Already have an account?</span>
              <Button
                variant='link'
                size='sm'
                className='text-danger'
                onClick={() => {
                  props.dispatch(actionHideDialog('register'));
                  props.dispatch(actionShowDialog('login', {}));
                }}>
                Sign in
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
    state.Dialogs.register || {};
  return { show, message, error, requesting };
})(CompRegisterDialog);
