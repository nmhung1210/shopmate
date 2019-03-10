import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CDN_ROOT } from '../configs';
import { IProduct } from '../models/schemas';

export interface IProductCardProps {
  product: IProduct;
}

export default function ProductCard (props: IProductCardProps) {
  const { name, thumbnail, price, discounted_price } = props.product;
  const haveDiscounted = parseFloat(discounted_price) > 0;
  return (
    <Card as={Col} md='4'>
      <Card.Img src={`${CDN_ROOT}${thumbnail}`} className='p-4' />
      {haveDiscounted ? (
        <Card.ImgOverlay>
          <h4><Badge variant='danger'>HOT</Badge></h4>
        </Card.ImgOverlay>
      ) : null}
      <Card.Body className='d-flex flex-column text-center'>
        <Card.Title as='h5'>{name}</Card.Title>
        <Card.Text as='h5' className='mt-4 mb-4'>
          <span className='text-danger pr-3'>${haveDiscounted ? discounted_price : price}</span>
          {haveDiscounted ? (
            <sup>
              <del>${price}</del>
            </sup>
          ) : null}
        </Card.Text>
      </Card.Body>
      <div className='productCover position-absolute w-100 h-100  d-flex align-items-center justify-content-center'>
        <Link
          to={`/product/${props.product.product_id}`}
          className='btn btn-danger rounded-pill'>
          Buy now
        </Link>
      </div>
    </Card>
  );
}
