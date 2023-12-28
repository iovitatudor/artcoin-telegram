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
          style={{background: '#1f7199', height: '100%'}}
        >
          <Link to="/" className='logo'>
            <img src="/images/logo.svg" alt="" onClick={closeDrawer}/>
          </Link>
          <Divider sx={{pb: 2}}/>
          {
            categories && categories.map(category =>
              category.children && category.children.length > 0 ?
                <MenuItem category={category} closeDrawer={closeDrawer} key={category.id}/> :
                <ListItem disablePadding key={category.id}>
                  <ListItemButton>
                    <Link to={`/category/${category.id}`} className="nav-link"
                          onClick={closeDrawer}>{category.name}</Link>
                  </ListItemButton>
                </ListItem>
            )
          }
          <Divider sx={{pb: 2}}/>

          <ListItem key='about' disablePadding sx={{pt: 2}}>
            <ListItemButton>
              <Link to={`/about`} className="nav-link"
                    onClick={closeDrawer}>About Us</Link>
            </ListItemButton>
          </ListItem>
          <ListItem key='become' disablePadding>
            <ListItemButton>
              <Link to={`/become-seller`} className="nav-link"
                    onClick={closeDrawer}>Become a Seller</Link>
            </ListItemButton>
          </ListItem>
          <ListItem key='terms' disablePadding sx={{pb: 2}}>
            <ListItemButton>
              <Link to={`/terms-and-conditions`} className="nav-link"
                    onClick={closeDrawer}>Terms and Conditions</Link>
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </div>
  );
}

export default Menu;