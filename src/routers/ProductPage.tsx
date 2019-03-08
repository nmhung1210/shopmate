import { Card } from '@material-ui/core';
import * as React from 'react';
import { CardDeck, CardGroup, Container, Jumbotron, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import ProductCard from '../components/ProductCard';
import PromotionCard from '../components/ProductPromotionCard';
import { getProducts } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';

interface IProductPageProps extends RouteComponentProps, DispatchProp {
  products: IProductState;
}

class ProductPage extends React.Component<IProductPageProps> {
  constructor (props: IProductPageProps) {
    super(props);
  }
  public componentWillMount () {
    const { dispatch } = this.props;
    dispatch(getProducts());
  }
  public render () {
    const props = this.props as IProductPageProps;
    const products = props.products;
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    products: state.Products
  };
};

export default connect(mapStateToProps)(ProductPage);
