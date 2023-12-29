import React, {FC, useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from '@mui/icons-material/FilterList';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {AvailabilityEnum} from "../enums/AvailabilityEnum";
import {LocationEnum} from "../enums/LocationEnum";
import RemoveIcon from '@mui/icons-material/Remove';
import {productsApi} from "../api/productsApi";

interface IFilterProps {
  isOpenDrawer: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
  handleFilterUrl: (url: string) => void;
  categoryId: string | undefined;
}

const Filter: FC<IFilterProps> = ({isOpenDrawer, closeDrawer, openDrawer, handleFilterUrl, categoryId}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<Array<string>>([]);
  const [selectedLocation, setSelectedLocation] = useState<Array<string>>([]);
  const [priceMin, setPriceMin] = useState<string>("0");
  const [priceMax, setPriceMax] = useState<string>("1000000");
  const [filter, setFilter] = useState<string>("");

  const fetchProductsByCategory = productsApi.useFetchProductsByCategoryQuery;
  fetchProductsByCategory({categoryId: categoryId ? 0 : 0, filter});


  // useEffect(() => {
  //   handleFilterUrl(filter)
  // }, [filter]);

  const handleAvailabilityFilterChange = (event: { target: { value: any; checked: any; }; }) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedAvailability([...selectedAvailability, checkedId])
    } else {
      setSelectedAvailability(selectedAvailability.filter(id => id !== checkedId))
    }
  }

  const handleLocationFilterChange = (event: { target: { value: any; checked: any; }; }) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedLocation([...selectedLocation, checkedId])
    } else {
      setSelectedLocation(selectedLocation.filter(id => id !== checkedId))
    }
  }

  const handlePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(event.target.value);
    if (priceMin > "0") {
      createFilterUrl();
    }
  }

  const handlePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(event.target.value)
    if (priceMax > "0") {
      createFilterUrl();
    }
  }

  const createFilterUrl = () => {
    setFilter(`priceMin=${priceMin}&priceMax=${priceMax}`);
    // handleFilterUrl(filter)
  }

  return (
    <>
      <div className="filter-drawer-area">
        <Button onClick={openDrawer} className="filter-btn">
          <FilterListIcon/>
        </Button>
        <Drawer
          anchor={'bottom'}
          open={isOpenDrawer}
          onClose={closeDrawer}
        >
          <Box
            className="filter-area-inside"
            sx={{width: '100%', paddingBottom: '60px'}}
            role="presentation"
            style={{background: '#1f7199'}}
          >
            <div className="drawer-top-area">
              <Button sx={{mt: 2}} onClick={closeDrawer}><CloseIcon/></Button>
            </div>

            <div className="filter-price">
              <Box sx={{m: 3}}>
                <label htmlFor=""><span className="filter-label">Price <small>(ArtCoin)</small></span></label>
                <div className="filter-price-inside">
                  <input type="number" id="search-bar" placeholder="Min" value={priceMin} onInput={handlePriceMin}/>
                  <RemoveIcon sx={{color: 'white'}}/>
                  <input type="number" id="search-bar" placeholder="Max" value={priceMax} onInput={handlePriceMax}/>
                </div>
              </Box>
            </div>

            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
              <FormLabel component="legend">
                <span className="filter-label">Availability</span>
              </FormLabel>
              <FormGroup>
                {
                  AvailabilityEnum.map(item =>
                    <FormControlLabel sx={{color: 'white'}}
                                      key={item.name}
                                      control={
                                        <Checkbox value={item.name}
                                                  name={item.name}
                                                  sx={{color: 'white', '&.Mui-checked': {color: 'white'}}}
                                                  checked={selectedAvailability.includes(item.name)}
                                                  onChange={(event) => {
                                                    handleAvailabilityFilterChange(event)
                                                  }}/>
                                      } label={item.value}/>
                  )
                }
              </FormGroup>
            </FormControl>
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
              <FormLabel component="legend">
                <span className="filter-label">Location</span>
              </FormLabel>
              <FormGroup>
                {
                  LocationEnum.map(item =>
                    <FormControlLabel sx={{color: 'white'}}
                                      key={item.name}
                                      control={
                                        <Checkbox value={item.name}
                                                  name={item.name}
                                                  sx={{color: 'white', '&.Mui-checked': {color: 'white'}}}
                                                  checked={selectedLocation.includes(item.name)}
                                                  onChange={(event) => {
                                                    handleLocationFilterChange(event)
                                                  }}/>
                                      } label={item.value}/>
                  )
                }
              </FormGroup>
            </FormControl>
          </Box>
        </Drawer>
      </div>
    </>

  );
}

export default Filter;