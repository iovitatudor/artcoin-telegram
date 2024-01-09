import React, {FC} from "react";
import Drawer from '@mui/material/Drawer';
import MenuItem from "./MenuItem";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {Link} from "react-router-dom";
import {categoriesApi} from "../../api/categoriesApi";

interface IMenuProps {
  isOpenDrawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Menu: FC<IMenuProps> = ({openDrawer, closeDrawer, isOpenDrawer}) => {
  const fetchAllCategories = categoriesApi.useFetchAllCategoriesQuery;

  const {data: categories} = fetchAllCategories();

  return (
    <div className="dropdown-menu">
      <Drawer
        anchor={'left'}
        open={isOpenDrawer}
        onClose={closeDrawer}
      >
        <Box
          className="drawer-area"
          sx={{width: 300}}
          role="presentation"
          style={{height: '100%'}}
        >
          <Link to="/" className="logo">
            <img src="/images/logo.svg" alt="" onClick={closeDrawer}/>
          </Link>
          <Divider sx={{pb: 2}}/>

          {/*<div className="menu-greeting">Hi, <b>@iovitatudor</b></div>*/}

          {
            categories && categories.map(category =>
              category.children && category.children.length > 0 ?
                <MenuItem category={category} closeDrawer={closeDrawer} key={category.id}/> :
                <Link to={`/category/${category.id}`} className="nav-link" onClick={closeDrawer} key={category.id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      {category.name}
                    </ListItemButton>
                  </ListItem>
                </Link>
            )
          }
          <Divider sx={{pb: 2}}/>

          <Link to={`/about`} className="nav-link" onClick={closeDrawer} key='about'>
            <ListItem disablePadding sx={{pt: 2}}>
              <ListItemButton>
                About Us
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/become-seller`} className="nav-link" onClick={closeDrawer}>
            <ListItem key='become' disablePadding>
              <ListItemButton>
                Become a Seller
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/how-to-buy`} className="nav-link" onClick={closeDrawer}>
            <ListItem key='how-to-buy' disablePadding>
              <ListItemButton>
                How to buy
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/terms-and-conditions`} className="nav-link" onClick={closeDrawer}>
            <ListItem key='terms' disablePadding sx={{pb: 2}}>
              <ListItemButton>
                Terms and Conditions
              </ListItemButton>
            </ListItem>
          </Link>
        </Box>
      </Drawer>
    </div>
  );
}

export default Menu;