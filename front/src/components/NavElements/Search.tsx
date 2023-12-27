import React, {FC} from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";

interface ISearchProps {
  isOpenDrawer: boolean;
  closeDrawer: () => void;
}

const Search: FC<ISearchProps> = ({closeDrawer, isOpenDrawer}) => {
  return (
    <div className="search-drawer-area">
      <Drawer
        anchor={'bottom'}
        open={isOpenDrawer}
        onClose={closeDrawer}
      >
        <Box
          className="search-area-inside"
          sx={{width: '100%'}}
          role="presentation"
          style={{background: '#1f7199', height: '100%'}}
        >
          <div className="drawer-top-area">
            <Button onClick={closeDrawer}><CloseIcon/></Button>
          </div>
          <form className="search-container">
            <input type="text" id="search-bar" placeholder="What can I help you with today?"/>
            <a href="#">
              <img className="search-icon"
                   src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/>
            </a>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export default Search;