import React, {FC} from "react";
import {Container, Grid} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {productsApi} from "../api/productsApi";
import Page404 from "../components/Page404";

const ProductPage: FC = () => {
  const {productId} = useParams();
  const fetchProductById = productsApi.useFetchProductByIdQuery;
  const {data: currentProduct} = fetchProductById(productId ? parseInt(productId) : 0);

  return (
    <div className="content-area shell">
      {
        currentProduct ?
          <Container maxWidth={'xl'}>
            <Grid container>
              <Grid item xs={12}><h2>{currentProduct.name}</h2></Grid>
              <div className="wsk-cp-product">
                <div className="wsk-cp-img">
                  <Link to={`/product/${currentProduct?.id}`}>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${currentProduct.image}`}
                      alt={currentProduct.name} className="img-responsive"/>
                  </Link>
                </div>
                <div className="wsk-cp-text">
                  <div className="description-prod">
                    <p>{currentProduct.description}</p>
                  </div>
                  <div className="card-footer">
                    <div className="wcf-left">
                              <span
                                className="price">{currentProduct.price} ART <span>per {currentProduct.unit_item}</span>
                              </span>
                    </div>
                    <div className="wcf-right">
                      <a href="#" className="buy-btn"><ShoppingCartIcon/></a>
                    </div>
                  </div>
                  <div className="card-properties">
                    {
                      currentProduct.category &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Category</Grid>
                            <Grid item xs={7}>
                                <Link
                                    to={`/category/${currentProduct.category.id}`}>{currentProduct.category.name}
                                </Link>
                            </Grid>
                        </Grid>
                    }
                    {
                      currentProduct.seller &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Seller</Grid>
                            <Grid item xs={7}>{currentProduct.seller.name}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.destination &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Destination</Grid>
                            <Grid item xs={7}>{currentProduct.destination}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.availability &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Availability</Grid>
                            <Grid item xs={7}>{currentProduct.availability}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.area &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Area</Grid>
                            <Grid item xs={7}>{currentProduct.area}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.location &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Location</Grid>
                            <Grid item xs={7}>{currentProduct.location}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.facilities_amenities &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Facilities and Amenities</Grid>
                            <Grid item xs={7}>{currentProduct.facilities_amenities}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.seats_numbers &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Seats Numbers</Grid>
                            <Grid item xs={7}>{currentProduct.seats_numbers}</Grid>
                        </Grid>
                    }
                  </div>
                </div>
              </div>
            </Grid>
          </Container>
          : <Page404/>
      }
    </div>
  );
}

export default ProductPage;