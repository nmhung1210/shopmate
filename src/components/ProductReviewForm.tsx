import IconStar from '@material-ui/icons/Star';
import IconStarBorder from '@material-ui/icons/StarBorder';
import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { IReview } from '../models/schemas';

interface IProductReviewFormProps {
  onSubmit: (data: IReview) => void;
  defaultRating: number;
}

export default function ProductReviewForm (props: IProductReviewFormProps) {
  let rating = props.defaultRating;
  return (
    <Container>
      <Form
        className='mt-4'
        method='get'
        onSubmit={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.currentTarget);
          const review = {
            name: formData.get('nickname') as string,
            review: formData.get('review') as string,
            rating,
            created_on: new Date().toISOString()
          };
          props.onSubmit(review);
          return false;
        }}>
        <Form.Group as={Row} controlId='formHorizontalNickname' className='mt-4'>
          <Col md={4}>
            <Form.Label column className='pl-0'>
              <h6>Choose a nickname</h6>
            </Form.Label>
          </Col>
          <Col md={6}>
            <Form.Control
              as='input'
              size='lg'
              name='nickname'
              type='text'
              placeholder=''
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalReview' className='mt-4'>
          <Col md={4}>
            <Form.Label column className='pl-0'>
              <h6>Your review</h6>
            </Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              as='textarea'
              minlength='50'
              size='lg'
              style={{ height: '10rem' }}
              placeholder=''
              name='review'
              required
            />
            <p className='text-secondary font-weight-light'>
              Your review should have at least 50 characters
            </p>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalRating' className='mt-4'>
          <Col md={4}>
            <Form.Label column className='pl-0'>
              <h6>Overall rating</h6>
            </Form.Label>
          </Col>
          <Col md={8}>
            <Rating
              initialRating={4.5}
              onChange={(val: number) => {
                rating = val;
              }}
              emptySymbol={<IconStarBorder className='text-warning' />}
              fullSymbol={<IconStar className='text-warning' />}
              className='mb-3'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalRating' className='mt-4 mb-4'>
          <Col md={4} />
          <Col md={8}>
            <Button type='submit' variant='danger' size='lg' className='rounded-pill'>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
