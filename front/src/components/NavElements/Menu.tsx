import React, {FC} from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';
import MenuItem from "./MenuItem";
import CategoryMock from "../../mocks/CategoryMock";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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
          <a href="#" className='logo'>
            <img src="/images/logo.svg" alt="" onClick={closeDrawer}/>
          </a>
          <Divider sx={{pb: 2}}/>
          {
            CategoryMock.map(category =>
              category.children && category.children.length > 0 ?
                <MenuItem category={category} closeDrawer={openDrawer}/> :
                <ListItem key='Menu' disablePadding>
                  <ListItemButton>
                    <a href="#" className="nav-link">{category.name}</a>
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