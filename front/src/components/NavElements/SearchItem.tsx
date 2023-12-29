import React, {FC} from "react";
import Divider from "@mui/material/Divider";
import {ProductType} from "../../types/ProductType";
import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";

interface ISearchItemProps {
  product: ProductType,
  closeDrawer: () => void,
}

const SearchItem: FC<ISearchItemProps> = ({product, closeDrawer}) => {
  return (
    <>
      <Link to={`/product/${product.id}`} className="search-item" onClick={closeDrawer}>
        <div className="search-item-img">
          <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`} sx={{width: '75px', height: '75px'}}/>
        </div>
        <div className="search-item-details">
          <h5>{product.name}
            <p>{product.price} ARTCOIN <span>per {product.unit_item}</span></p>
          </h5>
        </div>
      </Link>
      <Divider/>
    </>
  );
}

export default SearchItem;