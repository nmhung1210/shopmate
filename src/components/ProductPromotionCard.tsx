import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CDN_ROOT } from '../configs';
import { IProduct } from '../models/schemas';

export interface IProductPromotionCardProps {
  product: IProduct;
}

export default function ProductPromotionCard (props: IProductPromotionCardProps) {
  const { name, description, thumbnail } = props.product;
  return (
    <Card className='p-4 my-2'>
      <Row>
        <Col md={4}>
          <Card.Img src={`${CDN_ROOT}${thumbnail}`} />
          <Card.ImgOverlay style={{ padding: 0 }}>
            <h2>
              <Badge variant='info'>SALE</Badge>
            </h2>
          </Card.ImgOverlay>
        </Col>
        <Col md={8}>
          <h2>{name}</h2>
          <p>{description}</p>
          <Link to={`/product/${props.product.product_id}`} className='btn btn-danger rounded-pill'>
            Buy now
          </Link>
        </Col>
      </Row>
    </Card>
  );
}
