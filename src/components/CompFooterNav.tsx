import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default function CompFooterNav (props: any) {
  return (
    <Container className='footerNav'>
      <Row>
        <Col md={3}>
          <h5>QUESTION?</h5>
          <div>
            <div>
              <a href='/help'>Help</a>
            </div>
            <div>
              <a href='/track'>Track Order</a>
            </div>
            <div>
              <a href='/return'>Returns</a>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <h5>WHAT'S IN STORE</h5>
          <div>
            <div>
              <a href='/help'>Women</a>
            </div>
            <div>
              <a href='/track'>Men</a>
            </div>
            <div>
              <a href='/return'>Product A-Z</a>
            </div>
            <div>
              <a href='/'>Buy Gift Vouchers</a>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <h5>FOLLOW US</h5>
          <div>
            <div>
              <a href='https://facebook.com'>Facebook</a>
            </div>
            <div>
              <a href='https://twitter.com'>Twitter</a>
            </div>
            <div>
              <a href='https://youtube.com'>Youtube</a>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <p>@2019 nmhung1210</p>
        </Col>
      </Row>
    </Container>
  );
}
