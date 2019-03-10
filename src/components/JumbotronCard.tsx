import React from 'react';
import { Button, Card, Carousel, Container, Jumbotron, Row } from 'react-bootstrap';

// This is a mad head item that focusing on proposal new hot on the site.
// TODO: Intergrate with backend to have it act like carousel series of hot things.
export default function JumboTronCard (props: any) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>New Trend</Card.Title>
        <Card.Text>Scandi-cool</Card.Text>
        <Button variant='danger' className='rounded-pill' size='lg'>
          SHOP NOW
        </Button>
      </Card.Body>
    </Card>
  );
}
