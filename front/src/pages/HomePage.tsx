import React, {FC} from "react";
import {Container, Grid} from "@mui/material";
import Product from "../components/Products/Product";
import {ProductsMock} from "../mocks/ProductsMock";
import {productsApi} from "../api/productsApi";

const HomePage: FC = () => {
  const fetchTopProducts = productsApi.useFetchTopProductsQuery;
  const {data: topProducts} = fetchTopProducts();

  const fetchHotProducts = productsApi.useFetchHotProductsQuery;
  const {data: hotProducts} = fetchHotProducts();

  return (
    <div className="content-area shell">
      <div className="ban_text">
        <strong>
          <span>artcoin</span>
        </strong>
        <p>the best marketplace in the world!</p>
      </div>
      <Container maxWidth={'xl'}>
        <Grid container>
          <Grid item xs={12}><h2>Top Sales</h2></Grid>
          {
            topProducts && topProducts.map(product =>
              <Grid item xs={12} key={product.id}><Product product={product}/></Grid>
            )
          }
        </Grid>
        <Grid container>
          <Grid item xs={12}><h2>Hot Sales</h2></Grid>
          {
            hotProducts && hotProducts.map(product =>
              <Grid item xs={12} key={product.id}><Product product={product}/></Grid>
            )
          }
        </Grid>
      </Container>
    </div>

  );
}

export default HomePage;