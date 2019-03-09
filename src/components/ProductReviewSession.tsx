import { Checkbox, FormControlLabel } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconStar from '@material-ui/icons/Star';
import IconStarBorder from '@material-ui/icons/StarBorder';
import human from 'human-time';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { connect, DispatchProp } from 'react-redux';
import { actionPostProductReviews } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';
import { IReview } from '../models/schemas';
import ProductReviewEntry from './ProductReviewEntry';
import ProductReviewForm from './ProductReviewForm';

interface IProductViewProps extends DispatchProp {
  products: IProductState;
  productId: number;
}

function ProductReviewSession (props: IProductViewProps) {
  return (
    <Container className='bg-light pt-4'>
      <Row>
        <Col md={1} />
        <Col md={10}>
          <Container className='mt-4  mb-4'>
            <Row>
              <Col md={6}>
                <h3>Product reviews</h3>
              </Col>
            </Row>
          </Container>
          {props.products.productReviews.map((review: IReview) => (
            <ProductReviewEntry review={review} />
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={1} />
        <Col md={10}>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={1} />
        <Col md={10}>
          <Container className='mt-4  mb-4'>
            <Row>
              <Col md={6}>
                <h3 className='mt-4 mb-4'>Add review</h3>
              </Col>
            </Row>
          </Container>
          <ProductReviewForm
            defaultRating={5}
            onSubmit={(review: IReview) => {
              return props.dispatch(actionPostProductReviews(props.productId, review));
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default connect((state: IRootState) => {
  return {
    products: state.Products
  };
})(ProductReviewSession);
