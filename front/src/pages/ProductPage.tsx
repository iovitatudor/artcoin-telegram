import React, {FC} from "react";
import {Button, Container, Grid} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {productsApi} from "../api/productsApi";
import Page404 from "../components/Page404";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ProductPage: FC = () => {
  const navigate = useNavigate();
  const {productId} = useParams();
  const fetchProductById = productsApi.useFetchProductByIdQuery;
  const {data: currentProduct} = fetchProductById(productId ? parseInt(productId) : 0);

  return (
    <div className="content-area shell">
      {
        currentProduct ?
          <Container maxWidth={'xl'}>
            <Grid container>
              <Grid item xs={12} className="main-heading">
                <div className="back-icon">
                  <Button onClick={() => navigate(-1)}><ArrowBackIosIcon/></Button>
                </div>
                <h2 className="product-heading">{currentProduct.name}</h2>
              </Grid>
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
                    <h3 style={{marginBottom: "15px", marginTop: "15px"}}>{currentProduct.name}</h3>
                    <p>{currentProduct.description}</p>
                  </div>
                  <div className="card-footer">
                  <div className="wcf-left">
                      <span className="price">{currentProduct.price} ARTCOIN
                        <span>per {currentProduct.unit_item}</span>
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
                                <Link to={`/category/${currentProduct.category.id}`}>
                                  {currentProduct.category.name}
                                </Link>
                            </Grid>
                        </Grid>
                    }
                    {
                      currentProduct.seller &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Seller</Grid>
                            <Grid item xs={7}>{currentProduct.seller.username}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.destination && currentProduct.destination !== 'null' &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Destination</Grid>
                            <Grid item xs={7}>{currentProduct.destination}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.availability && currentProduct.availability !== 'null' &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Availability</Grid>
                            <Grid item xs={7}>{currentProduct.availability}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.area && currentProduct.area !== 'null' &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Area</Grid>
                            <Grid item xs={7}>{currentProduct.area}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.location && currentProduct.location !== 'null' &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Location</Grid>
                            <Grid item xs={7}>{currentProduct.location}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.facilities_amenities && currentProduct.facilities_amenities !== 'null' &&
                        <Grid container className="card-properties-item">
                            <Grid item xs={5}>Facilities and Amenities</Grid>
                            <Grid item xs={7}>{currentProduct.facilities_amenities}</Grid>
                        </Grid>
                    }
                    {
                      currentProduct.seats_numbers && currentProduct.seats_numbers !== 'null' &&
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