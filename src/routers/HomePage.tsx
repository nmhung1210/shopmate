import { Card } from '@material-ui/core';
import * as React from 'react';
import { CardDeck, CardGroup, Container, Jumbotron, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import JumboTronCard from '../components/CompJumboTronCard';
import CompProductCard from '../components/CompProductCard';
import PromotionCard from '../components/CompProductPromotionCard';
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
      <Container className='p-0'>
        <Jumbotron className='jumboTron'>
          <JumboTronCard />
        </Jumbotron>
        <Container className='bg-light p-4'>
          {products.promotion ? <PromotionCard product={products.promotion} /> : null}
          <Card className='my-4 border-0' style={{boxShadow: 'none'}}>
            <h2 className='text-muted m-2 ml-4'>HOT</h2>
            <CardDeck className='p-4 border-0'>
              {products.products.rows.slice(0, 4).map((product) => (
                <CompProductCard product={product} />
              ))}
            </CardDeck>
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
