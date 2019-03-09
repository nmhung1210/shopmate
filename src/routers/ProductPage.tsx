import * as React from 'react';
import { Breadcrumb, ButtonGroup } from 'react-bootstrap';
import { Card, CardGroup, Container, Jumbotron, Row } from 'react-bootstrap';
import { Button, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, RouteProps } from 'react-router';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import ProductCard from '../components/ProductCard';
import PromotionCard from '../components/ProductPromotionCard';
import { CDN_ROOT } from '../configs';

import IconStar from '@material-ui/icons/Star';
import IconStarBorder from '@material-ui/icons/StarBorder';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import human from 'human-time';
import { Media } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Interface } from 'readline';
import ColorPicker from '../components/ColorPicker';
import ProductReviewSession from '../components/ProductReviewSession';
import QuantityInput from '../components/QuantityInput';
import SizePicker from '../components/SizePicker';
import {
  actionGetProductAttributes,
  actionGetProductCategories,
  actionGetProductDetail,
  actionGetProductReviews,
  actionGetProducts
} from '../models/actions';
import { IRootState } from '../models/reducers';
import { ICategoriesState } from '../models/reducers/Categories';
import { IProductState } from '../models/reducers/Products';
import { IAttributeProductValue, IReview } from '../models/schemas';

interface IProductRouteParams {
  id: string;
}

interface IProductPageProps extends DispatchProp, RouteComponentProps<IProductRouteParams> {
  products: IProductState;
  categories: ICategoriesState;
}

interface IProductPageState {
  productImage: string;
}

class ProductPage extends React.Component<IProductPageProps, IProductPageState> {
  constructor (props: IProductPageProps) {
    super(props);
    this.state = {
      productImage: ''
    };
  }

  public componentWillReceiveProps (props: IProductPageProps) {
    const { productDetail } = props.products;
    if (productDetail) {
      this.setState({
        productImage: productDetail.image
      });
    }
  }

  public componentWillMount () {
    const {
      dispatch,
      match: { params }
    } = this.props;
    const productId = parseInt(params.id, 10);
    dispatch(actionGetProductDetail(productId));
    dispatch(actionGetProductCategories(productId));
    dispatch(actionGetProductAttributes(productId));
    dispatch(actionGetProductReviews(productId));
  }

  get availableSizes (): string[] {
    const { productAtrributes } = this.props.products;
    const availableSizes = productAtrributes
      .filter((attr: IAttributeProductValue) => attr.attribute_name === 'Size')
      .map((attr: IAttributeProductValue) => attr.attribute_value);
    return availableSizes;
  }

  get availableColors (): string[] {
    const { productAtrributes } = this.props.products;
    const availableColors = productAtrributes
      .filter((attr: IAttributeProductValue) => attr.attribute_name === 'Color')
      .map((attr: IAttributeProductValue) => attr.attribute_value);
    return availableColors;
  }

  get haveDiscounted (): boolean {
    const { productDetail } = this.props.products;
    if (!productDetail) {
      return false;
    }
    return parseFloat(productDetail.discounted_price) > 0;
  }

  public render () {
    const { productDetail } = this.props.products;
    const { productCategories } = this.props.categories;
    if (!productDetail) {
      // TODO: Return shimmer plaveholder here.
      return null;
    }
    const catName = productCategories.length ? productCategories[0].name : '';
    const { name, image, image_2, thumbnail, price, discounted_price } = productDetail;

    return (
      <Card>
        <Container>
          <Row>
            <Col md={6}>
              <Container className='p-4 w-100 h-100'>
                <div
                  className='w-100 h-100'
                  style={{
                    backgroundImage: `url(${CDN_ROOT}${this.state.productImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </Container>
            </Col>
            <Col md={6}>
              <Card.Body>
                <Breadcrumb className='mt-2 text-muted'>
                  <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                  <Breadcrumb.Item href='/'>All Categories</Breadcrumb.Item>
                  {catName ? <Breadcrumb.Item active>{catName}</Breadcrumb.Item> : null}
                </Breadcrumb>
                <Rating
                  initialRating={3.5}
                  emptySymbol={<IconStarBorder className='text-warning' />}
                  fullSymbol={<IconStar className='text-warning' />}
                  className='mb-3'
                />
                <Card.Title as='h4'>{name}</Card.Title>
                <Card.Text as='h3' className='mt-4 mb-4'>
                  <span className='text-danger pr-3'>
                    ${this.haveDiscounted ? discounted_price : price}
                  </span>
                  {this.haveDiscounted ? (
                    <sup>
                      <del>${price}</del>
                    </sup>
                  ) : null}
                </Card.Text>

                <h6 className='text-muted mb-2'>Color</h6>
                <ColorPicker colors={this.availableColors} />

                <h6 className='text-muted mt-4 mb2'>Size</h6>
                <SizePicker sizes={this.availableSizes} />

                <h6 className='text-muted mt-4 mb2'>Quantity</h6>
                <QuantityInput value={1} max={10} min={1} step={1} />
              </Card.Body>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Container className='p-4'>
                <Row className='justify-content-md-center'>
                  {/* TODO: Adding support for dynamic images here  */}
                  {[image, image_2, thumbnail].map((img) => (
                    <Button
                      variant='dark'
                      size='lg'
                      style={{
                        margin: '0.225rem',
                        width: '5rem',
                        height: '5rem',
                        backgroundImage: `url(${CDN_ROOT}${img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                      }}
                      onClick={() => {
                        this.setState({ productImage: img });
                      }}
                    />
                  ))}
                </Row>
              </Container>
            </Col>
            <Col md={3}>
              <Card.Body>
                <Button variant='danger' size='lg' className='rounded-pill'>
                  Add to cart
                </Button>
              </Card.Body>
            </Col>
            <Col md={3}>
              <Card.Body>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value='checkedH'
                      className='text-danger'
                    />
                  }
                  label='Add to Wish List'
                />
              </Card.Body>
            </Col>
          </Row>
        </Container>
        <ProductReviewSession productId={productDetail.product_id} />
      </Card>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    products: state.Products,
    categories: state.Categories
  };
};

export default connect(mapStateToProps)(ProductPage);
