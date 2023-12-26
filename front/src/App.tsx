import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Nabar";
import './styles/styles.scss';
import './styles/effects.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";

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
              <Route path="/" element={<Home/>}>
                <Route index element={<Home/>}/>
                {/*<Route path="blogs" element={<Blogs/>}/>*/}
              </Route>
            </Routes>
          </div>
          <Navbar/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
