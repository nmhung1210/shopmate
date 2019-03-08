import React from 'react';
import { Button, Card, Carousel, Container, Jumbotron, Row } from 'react-bootstrap';

// This is a mad head item that focusing on proposal new hot on the site.
// TODO: Intergrate with backend to have it act like carousel series of hot things.
export default function JumboTron (props: any) {
  return (
    <Jumbotron className='jumboTron'>
      <Card>
        <Card.Body>
          <Card.Title>New Trend</Card.Title>
          <Card.Text>Scandi-cool</Card.Text>
          <Button  variant='outline-danger' className='rounded-pill' size='lg'>SHOP NOW</Button>
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}
