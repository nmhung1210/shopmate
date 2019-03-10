import { Card } from '@material-ui/core';
import * as React from 'react';
import { CardDeck, CardGroup, Container, Jumbotron, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import JumboTronCard from '../components/JumbotronCard';
import ProductCard from '../components/ProductCard';
import PromotionCard from '../components/ProductPromotionCard';
import { actionGetProducts } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';

export interface IHomePageProps extends DispatchProp {
  products: IProductState;
}
class HomePage extends React.Component<IHomePageProps> {
  constructor (props: IHomePageProps) {
    super(props);
  }
  public componentWillMount () {
    this.props.dispatch(actionGetProducts());
  }
  public render () {
    const products = this.props.products;
    return (
      <Container className='my-4'>
        <Jumbotron className='jumboTron'>
          <JumboTronCard />
        </Jumbotron>
        <Container className='my-4'>
          {products.promotion ? <PromotionCard product={products.promotion} /> : null}
          <Card className='p-2 my-2'>
            <h2 className='text-muted m-2 ml-4'>HOT</h2>
            <Container className='justify-content-center'>
              <Row>
                <CardDeck className='p-4'>
                  {products.products.rows.slice(0, 4).map((product) => (
                    <ProductCard product={product} />
                  ))}
                </CardDeck>
              </Row>
            </Container>
          </Card>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    products: state.Products
  };
};

export default connect(mapStateToProps)(HomePage);
