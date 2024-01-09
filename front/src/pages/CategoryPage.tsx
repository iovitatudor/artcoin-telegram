import React, {FC, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import Product from "../components/Products/Product";
import Filter from "../components/Filter";
import Page404 from "../components/Page404";
import {CategoryType} from "../types/CategoryType";
import {Container, Grid} from "@mui/material";
import {categoriesApi} from "../api/categoriesApi";
import {productsApi} from "../api/productsApi";

const CategoryPage: FC = () => {
  const [searchParams] = useSearchParams();
  const {categoryId} = useParams();
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null | undefined>();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [filterUrl, setFilterUrl] = useState<string>("");

  const fetchAllCategories = categoriesApi.useFetchAllCategoriesQuery;
  const {data: categories} = fetchAllCategories();

  const fetchProductsByCategory = productsApi.useFetchProductsByCategoryQuery;
  const {data: products} = fetchProductsByCategory({
    categoryId: categoryId ? parseInt(categoryId) : 0,
    filter: filterUrl
  });

  useEffect(() => {
    setFilterUrl(searchParams.toString());
  }, [searchParams.toString()]);

  useEffect(() => {
    if (categories) {
      let category = categories.find(category => category.id.toString() === categoryId);
      if (!category) {
        category = categories
          .map(category => category.children)
          .flat()
          .find(child => child?.id.toString() === categoryId) as CategoryType;
      }
      setCurrentCategory(category);
    }
  }, [categories])

  const closeFilterDrawer = () => {
    setFilterDrawer(false);
  };
  const openFilterDrawer = () => {
    setFilterDrawer(true);
  };

  const handleFilterUrl = (url: string) => {
    setFilterUrl(url);
  }

  return (
    <>
      {
        currentCategory ? <div className="content-area shell">
            <Filter isOpenDrawer={filterDrawer}
                    closeDrawer={closeFilterDrawer}
                    openDrawer={openFilterDrawer}
                    handleFilterUrl={handleFilterUrl}
                    categoryId={categoryId}/>
            <Container maxWidth={'xl'}>
              <Grid container>
                <Grid item xs={12}>
                  <h2>{currentCategory?.name}</h2>
                </Grid>
                {
                  products && products.map(product =>
                    <Grid item xs={12} md={4} key={product.id}><Product product={product}/></Grid>
                  )
                }
                {
                  products && products.length === 0 &&
                    <div className="empty-category">This category is currently empty</div>
                }
              </Grid>
            </Container>
          </div> :
          <Page404/>
      }
    </>
  );
}

export default CategoryPage;