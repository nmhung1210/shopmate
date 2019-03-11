import { Checkbox, FormControlLabel } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconStar from '@material-ui/icons/Star';
import IconStarBorder from '@material-ui/icons/StarBorder';
import human from 'human-time';
import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { IReview } from '../models/schemas';
interface IProductReviewEntryProps {
  review: IReview;
}

export default function CompProductReviewEntry (props: IProductReviewEntryProps) {
  const review = props.review;
  return (
    <Container className='mt-2'>
      <Row>
        <Col md={4}>
          <Rating
            readonly
            initialRating={review.rating}
            emptySymbol={<IconStarBorder className='text-warning' />}
            fullSymbol={<IconStar className='text-warning' />}
            className='mb-3'
          />
          <h4>{review.name}</h4>
          <p className='text-mute'>{human(new Date(review.created_on))}</p>
        </Col>
        <Col md={8}>
          <p>{review.review}</p>
          <p>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value='checkedH'
                  className='text-danger'
                />
              }
              label='1'
            />
          </p>
        </Col>
      </Row>
    </Container>
  );
}
