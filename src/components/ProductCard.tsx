import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { CDN_ROOT } from '../configs';
import { IProduct } from '../models/schemas';

export interface IProductCardProps {
  product: IProduct;
}

export default function ProductCard (props: IProductCardProps) {
  const { name, description, thumbnail, price } = props.product;
  return (
    <Card className='text-center'>
      <Card.Img src={`${CDN_ROOT}${thumbnail}`} className='p-4' />
      <Card.Body className='d-flex flex-column'>
        <Card.Title as='h5'>{name}</Card.Title>
        <Card.Title as='h6' className='mt-auto text-danger'>
          {price}$
        </Card.Title>
      </Card.Body>
      <div className='productCover position-absolute w-100 h-100  d-flex align-items-center justify-content-center'>
        <Button variant='danger' >Buy now</Button>
      </div>
    </Card>
  );
}
