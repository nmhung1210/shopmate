import { Card } from '@material-ui/core';
import * as React from 'react';
import { CardDeck, CardGroup, Container, Jumbotron, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import JumboTron from '../components/JumboTron';
import ProductCard from '../components/ProductCard';
import PromotionCard from '../components/ProductPromotionCard';
import { actionGetProducts } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';

export interface IHomePageProps {
  products: IProductState;
}
class HomePage extends React.Component<IHomePageProps> {
  constructor (props: IHomePageProps) {
    super(props);
  }
  public componentWillMount () {
    const { dispatch } = this.props as any;
    dispatch(actionGetProducts());
  }
  public render () {
    const props = this.props as IHomePageProps;
    const products = props.products;
    return (
      <Container>
        <JumboTron />
        {products.promotion ? <PromotionCard product={products.promotion} /> : null}
        <Card style={{marginTop: '1rem', padding: '1rem'}}>
          <Container>
            <h2 className='text-muted'>HOT</h2>
            <CardDeck>
              {products.products.rows.slice(0, 3).map((product) => (
                <ProductCard product={product} />
              ))}
            </CardDeck>
          </Container>
        </Card>
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
