import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CategoryMock from "../mocks/CategoryMock";
import {CategoryType} from "../types/CategoryType";
import {Container, Grid} from "@mui/material";
import {ProductsMock} from "../mocks/ProductsMock";
import Product from "../components/Products/Product";

const CategoryPage: FC = () => {
  const {categoryId} = useParams();
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null | undefined>();

  useEffect(() => {
    let category = CategoryMock.find(category => category.id == categoryId);
    if (!category) {
      category = CategoryMock
        .map(category => category.children)
        .flat()
        .find(child => child?.id == categoryId) as CategoryType;
    }
    setCurrentCategory(category);
  })

  return (
    <div className="content-area shell">
      <Container maxWidth={'xl'}>
        <Grid container>
          <Grid item xs={12}><h2>{currentCategory?.name}</h2></Grid>
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

export default CategoryPage;