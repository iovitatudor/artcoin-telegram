import React, {FC} from "react";
import {ProductType} from "../../types/ProductType";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";

interface IProductProps {
  product: ProductType,
}

const Product: FC<IProductProps> = ({product}) => {
  return (
    <div className="wsk-cp-product">
      <div className="wsk-cp-img">
        <Link to={`/product/${product.id}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
            alt={product.name} className="img-responsive"/>
        </Link>
      </div>
      <div className="wsk-cp-text">
        <div className="category">
          <Link to={`/category/${product.category.id}`}>
            <span>{product.category.name}</span>
          </Link>
        </div>
        <div className="title-product">
          <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        </div>
        <div className="description-prod">
          <p>{product.description}</p>
        </div>
        <div className="card-footer">
          <div className="wcf-left"><span
            className="price">{product.price} ART <span>per {product.unit_item}</span></span></div>
          <div className="wcf-right"><a href="#" className="buy-btn"><ShoppingCartIcon/></a></div>
        </div>
      </div>
    </div>
  );
}

export default Product;