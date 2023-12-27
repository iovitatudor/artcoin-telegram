import React, {FC} from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';
import MenuItem from "./MenuItem";
import CategoryMock from "../../mocks/CategoryMock";
import {Link} from "react-router-dom";

interface IMenuProps {
  isOpenDrawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Menu: FC<IMenuProps> = ({openDrawer, closeDrawer, isOpenDrawer}) => {
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
            CategoryMock.map(category =>
              category.children && category.children.length > 0 ?
                <MenuItem category={category} closeDrawer={closeDrawer}/> :
                <ListItem key='Menu' disablePadding>
                  <ListItemButton>
                    <Link to={`/category/${category.id}`} className="nav-link"
                          onClick={closeDrawer}>{category.name}</Link>
                  </ListItemButton>
                </ListItem>
            )
          }
          <Divider sx={{pb: 2}}/>
        </Box>
      </Drawer>
    </div>
  );
}

export default Menu;