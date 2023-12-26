import React, {FC, useState} from "react";
import {ButtonBase} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from './NavElements/Menu';

const Navbar: FC = () => {
  const [isOpenMenuDrawer, setIsOpenMenuDrawer] = useState(false);

  const openMenuDrawer = () => setIsOpenMenuDrawer(true);
  const closeMenuDrawer = () => setIsOpenMenuDrawer(false);

  return (
    <>
      <div className="navbar-area">
        <div className="nav-item">
          <ButtonBase className="btn-menu"><HomeIcon/></ButtonBase>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu"><SearchIcon/></ButtonBase>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu"><WalletIcon/></ButtonBase>
        </div>
        <div className="nav-item">
          <ButtonBase className="btn-menu" onClick={openMenuDrawer}><MenuIcon/></ButtonBase>
        </div>
      </div>
      <Menu openDrawer={openMenuDrawer}
            closeDrawer={closeMenuDrawer}
            isOpenDrawer={isOpenMenuDrawer}/>
    </>
  );
}

export default Navbar;