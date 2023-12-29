import React, {FC, useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchItem from "./SearchItem";
import {searchProduct} from "../../api/searchApi";
import {ProductType} from "../../types/ProductType";
import {motion} from "framer-motion";

interface ISearchProps {
  isOpenDrawer: boolean;
  closeDrawer: () => void;
}

const Search: FC<ISearchProps> = ({closeDrawer, isOpenDrawer}) => {
  const [products, setProducts] = useState<ProductType[]>();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      const productList = await searchProduct(e.target.value);
      setProducts(productList)
    } else {
      setProducts([]);
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    return;
  }

  useEffect(() => setProducts([]), [isOpenDrawer]);

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
            <Button onClick={closeDrawer} sx={{pt: 2, pb: 2}}><CloseIcon/></Button>
          </div>
          <form className="search-container" autoComplete="off" onSubmit={handleSubmitForm}>
            <div className="input-wrapper">
              <input type="text" id="search-bar" placeholder="Search..." onInput={handleSearch} autoComplete="off"/>
              <SearchIcon className="search-icon"/>
            </div>
            <div className="search-results">
              {
                products && products.length > 0 &&
                  <>
                    {
                      products.map(product =>
                        <motion.div
                          initial={{y: 1000}}
                          animate={{y: 0}}
                          transition={{
                            delay: 0,
                            duration: 0.1
                          }}
                        >
                          <SearchItem product={product} closeDrawer={closeDrawer}/>
                        </motion.div>
                      )
                    }
                  </>
              }
            </div>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export default Search;