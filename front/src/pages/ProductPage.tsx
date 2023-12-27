import React, {FC, useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import {ProductsMock} from "../mocks/ProductsMock";
import Product from "../components/Products/Product";
import {Link, useParams} from "react-router-dom";
import {ProductType} from "../types/ProductType";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductPage: FC = () => {
  const {productId} = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductType | null | undefined>();

  useEffect(() => {
    const product = ProductsMock.find(product => productId === product?.id.toString()) as ProductType;
    setCurrentProduct(product);
  })

  return (
    <div className="content-area shell">
      {
        currentProduct &&

          <Container maxWidth={'xl'}>
              <Grid container>
                  <Grid item xs={12}><h2>{currentProduct.name}</h2></Grid>
                  <div className="wsk-cp-product">
                      <div className="wsk-cp-img">
                          <Link to={`/product/${currentProduct?.id}`}>
                              <img
                                  src={currentProduct.image}
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
      }
    </div>
  );
}

export default ProductPage;