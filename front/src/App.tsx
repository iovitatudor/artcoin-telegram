import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Nabar";
import './styles/styles.scss';
import './styles/effects.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

// @ts-ignore
// const tg = window.Telegram.WebApp

const theme = createTheme({
  typography: {
    "fontFamily": "Muli, sans-serif",
    "fontSize": 15,
    "fontWeightLight": 300,
    "fontWeightRegular": 500,
    "fontWeightMedium": 600,
  }
});

const App = () => {
  // const handleBtn = (price: number) => {
  //   tg.MainButton.hide();
  //   tg.MainButton.show();
  //   tg.MainButton.setParams({
  //     text: `Get for ${price} ARTC`,
  //   })
  // }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header/>
          <div className="wrapper">
            <Routes>
              <Route index element={<HomePage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/category/:categoryId" element={<CategoryPage/>}/>
              <Route path="/product/:productId" element={<ProductPage/>}/>
            </Routes>
          </div>
          <Navbar/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
