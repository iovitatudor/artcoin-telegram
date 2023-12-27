import React, {FC} from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import {CategoryType} from "../../types/CategoryType";
import {Link} from "react-router-dom";

interface IMenuItemProps {
  closeDrawer: () => void;
  category: CategoryType;
}

const MenuItem: FC<IMenuItemProps> = ({closeDrawer, category}) => {
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const handleClick = () => {
    setOpenCollapse(!openCollapse);
  };

  return (
    <List disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={category.name} className="standard-text"/>
        {openCollapse ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>

      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            category.children && category.children?.length > 0 &&
            category.children.map(child =>
              <ListItemButton sx={{pl: 4}}>
                <Link to={`/category/${child.id}`} className="nav-link" onClick={closeDrawer}>{child.name}</Link>
              </ListItemButton>
            )
          }
        </List>
      </Collapse>
    </List>
  );
}

export default MenuItem;