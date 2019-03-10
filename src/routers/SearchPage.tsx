import * as React from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DispatchProp } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
import PaginationBar from '../components/PaginationBar';
import ProductCard from '../components/ProductCard';
import SizePicker from '../components/SizePicker';
import { actionGetProducts } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';
import { IProduct } from '../models/schemas';
import { arrayChunks } from '../utils';

interface ISearchPageProps extends DispatchProp {
  products: IProductState;
}
class SearchPage extends React.Component<ISearchPageProps> {
  public componentWillMount () {
    this.props.dispatch(actionGetProducts());
  }
  public render () {
    const products = this.props.products;
    const rows = arrayChunks(products.products.rows, 3);
    return (
      <Container>
        <Row>
          <Col md={3}>
            <Container className='sticky-top' style={{ top: '4rem' }}>
              <Card className='bg-light mt-4 p-4 rounded-0'>
                <Card.Title as='h6'>Filters {products.products.count} items</Card.Title>
              </Card>
              <Card className='p-4 rounded-0  d-block'>
                <Card.Title as='h6' className='text-muted'>
                  Color
                </Card.Title>
                <ColorPicker colors={['red', 'green', 'blue']} />
                <Card.Title as='h6' className='text-muted'>
                  Size
                </Card.Title>
                <SizePicker sizes={['XS', 'S', 'M', 'L', 'XL']} />

                <Button variant='danger' size='sm' className='d-block rounded-pill'>
                  Apply
                </Button>
              </Card>
            </Container>
          </Col>
          <Col md={9}>
            <Container>
              <Row>
                <Col md={12}>
                  {rows.map((items) => (
                    <CardDeck className='p-4'>
                      {items.map((product: IProduct) => (
                        <ProductCard product={product} />
                      ))}
                    </CardDeck>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container className='d-flex justify-content-end p-4'>
                    <PaginationBar
                      limit={products.limit}
                      count={products.products.count}
                      page={products.page}
                      showCount={5}
                      onPage={(page) => this.props.dispatch(actionGetProducts(page))}
                    />
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect((state: IRootState) => {
  return {
    products: state.Products
  };
})(SearchPage);
