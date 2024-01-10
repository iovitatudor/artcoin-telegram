import React, {FC, useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Product from "../components/Product";
import Filter from "../components/Filter";
import Page404 from "../components/Page404";
import {CategoryType} from "../types/CategoryType";
import {Button, Container, Grid} from "@mui/material";
import {categoriesApi} from "../api/categoriesApi";
import {productsApi} from "../api/productsApi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CategoryPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {categoryId} = useParams();
  const [ready, setReady] = useState<boolean>(false);
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
      setReady(true);
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
                <Grid item xs={12} className="main-heading">
                  <div className="back-icon">
                    <Button onClick={() => navigate(-1)}><ArrowBackIosIcon/></Button>
                  </div>
                  <h2>{currentCategory?.name}</h2>
                </Grid>
                {
                products && products.map(product =>
                    <Grid item xs={12} md={12} key={product.id}><Product product={product}/></Grid>
                  )
                }
                {
                  products && products.length === 0 &&
                    <div className="empty-category">This category is currently empty</div>
                }
              </Grid>
            </Container>
          </div> :
         <div>
           {
             ready && <Page404/>
           }
         </div>
      }
    </>
  );
}

export default CategoryPage;