import React, {FC} from "react";
import {Container, Grid} from "@mui/material";
import Product from "../components/Products/Product";
import {ProductsMock} from "../mocks/ProductsMock";

const Home: FC = () => {
  return (
    <div className="home-area shell">
      <div className="ban_text">
        <strong>
          <span>artcoin</span>
        </strong>
        <p>a bridge for Institutions and their communities to sharing (peer) economy</p>
      </div>
      <Container maxWidth={'xl'}>
        <Grid container>
          <Grid item xs={12}><h2>Top Sales</h2></Grid>
          {
            ProductsMock.map(product =>
              <Grid item xs={12}><Product product={product}/></Grid>
            )
          }
        </Grid>
        <Grid container>
          <Grid item xs={12}><h2>Hot Sales</h2></Grid>
          {
            ProductsMock.map(product =>
              <Grid item xs={12}><Product product={product}/></Grid>
            )
          }
        </Grid>
      </Container>
    </div>

  );
}

export default Home;