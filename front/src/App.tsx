import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Nabar";
import './styles/styles.scss';
import './styles/effects.scss';
import './styles/telegram.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import HowToBuy from "./pages/HowToBuy";
import {BrowserView, MobileView} from 'react-device-detect';

// @ts-ignore
const tg = window.Telegram.WebApp

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
        {/*<MobileView>*/}
          <div className="App">
            <Header/>
            <div className="wrapper">
              <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/category/:categoryId" element={<CategoryPage/>}/>
                <Route path="/product/:productId" element={<ProductPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/become-seller" element={<BecomeSellerPage/>}/>
                <Route path="/how-to-buy" element={<HowToBuy/>}/>
                <Route path="/terms-and-conditions" element={<TermsConditionsPage/>}/>
              </Routes>
            </div>
            <Navbar/>
          </div>
        {/*</MobileView>*/}
        {/*<BrowserView>*/}
        {/*  <div className="telegram-redirect-message">*/}
        {/*    Sorry, ARTCOIN is only available via telegram*/}
        {/*    <p><a href="#">click here</a> to access </p>*/}
        {/*  </div>*/}
        {/*</BrowserView>*/}
      </ThemeProvider>
    </BrowserRouter>
  )
    ;
}

export default App;
