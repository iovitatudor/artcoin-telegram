import React, {FC, useState} from "react";
import {ButtonBase} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './NavElements/Menu';
import Search from "./NavElements/Search";
import {Link} from "react-router-dom";

const Navbar: FC = () => {
  const [isOpenSearchDrawer, setIsOpenSearchDrawer] = useState(false);
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = useState(false);

  const openSearchDrawer = () => {
    setIsOpenMenuDrawer(false);
    setIsOpenSearchDrawer(true);
  };
  const closeSearchDrawer = () => {
    setIsOpenMenuDrawer(false);
    setIsOpenSearchDrawer(false);
  };
  const openMenuDrawer = () => {
    setIsOpenMenuDrawer(true);
    setIsOpenSearchDrawer(false);
  };
  const closeMenuDrawer = () => {
    setIsOpenMenuDrawer(false);
    setIsOpenSearchDrawer(false);
  };

  return (
    <>
      <div className="navbar-area">
        <div className="nav-item">
          <Link to={'/'}>
            <ButtonBase className="btn-menu"><HomeIcon/></ButtonBase>
          </Link>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu" onClick={openSearchDrawer}><SearchIcon/></ButtonBase>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu"><WalletIcon/></ButtonBase>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu" onClick={openMenuDrawer}><MenuIcon/></ButtonBase>
        </div>
      </div>
      <Search closeDrawer={closeSearchDrawer}
              isOpenDrawer={isOpenSearchDrawer}/>
      <Menu openDrawer={openMenuDrawer}
            closeDrawer={closeMenuDrawer}
            isOpenDrawer={isOpenMenuDrawer}/>
    </>
  );
}

export default Navbar;