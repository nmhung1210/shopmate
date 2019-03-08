import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { CDN_ROOT } from '../configs';
import { IProduct } from '../models/schemas';

export interface IProductPromotionCardProps {
  product: IProduct;
}

export default function ProductPromotionCard (props: IProductPromotionCardProps) {
  const { name, description, thumbnail } = props.product;
  return (
    <Card className='contentCard'>
      <Container>
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
            <Button variant='danger'>Buy now</Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
