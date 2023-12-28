import React, {FC} from "react";
import {Container, Grid} from "@mui/material";
import {productsApi} from "../api/productsApi";
import Product from "../components/Products/Product";

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
              <Grid item xs={12} md={4} key={product.id}><Product product={product}/></Grid>
            )
          }
        </Grid>
        <Grid container>
          <Grid item xs={12}><h2>Hot Sales</h2></Grid>
          {
            hotProducts && hotProducts.map(product =>
              <Grid item xs={12} md={4} key={product.id}><Product product={product}/></Grid>
            )
          }
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;