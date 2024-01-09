import React, {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from '@mui/icons-material/Remove';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import {Button} from "@mui/material";
import {AvailabilityEnum} from "../enums/AvailabilityEnum";
import {LocationEnum} from "../enums/LocationEnum";

interface IFilterProps {
  isOpenDrawer: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
  handleFilterUrl: (url: string) => void;
  categoryId: string | undefined;
}

interface IFilterOptions {
  priceMin?: any,
  priceMax?: any,
  availability?: any,
  location?: any,
}

const filterParams: IFilterOptions = {};
let searchURL: string = '';
let availabilityItems: any[] = [];
let locationItems: any[] = [];

const Filter: FC<IFilterProps> = ({isOpenDrawer, closeDrawer, openDrawer, handleFilterUrl, categoryId}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedAvailability, setSelectedAvailability] = useState<Array<string>>([]);
  const [selectedLocation, setSelectedLocation] = useState<Array<string>>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [filterClassName, setFilterClassName] = useState('');

  useEffect(() => {
    const urlPriceMin = searchParams.get('priceMin');
    const urlPriceMax = searchParams.get('priceMax');
    const urlAvailability = searchParams.get('availability');
    const urlLocation = searchParams.get('location');

    setPriceMax(urlPriceMax ? urlPriceMax.toString() : '');
    setPriceMin(urlPriceMin ? urlPriceMin.toString() : '');
    setSelectedAvailability(urlAvailability ? urlAvailability.split('|') : [])
    setSelectedLocation(urlLocation ? urlLocation.split('|') : [])
    searchURL = searchParams.toString();
  }, []);

  const createSearchURL = () => {
    searchURL = '';
    if (filterParams?.priceMin) searchURL = `priceMin=${filterParams.priceMin}&`
    if (filterParams?.priceMax) searchURL = `${searchURL}priceMax=${filterParams.priceMax}&`
    if (filterParams?.availability) {
      const availabilityOptions = filterParams?.availability.join('|');
      searchURL = `${searchURL}availability=${availabilityOptions}&`;
    }
    if (filterParams?.location) {
      const locationOptions = filterParams?.location.join('|');
      searchURL = `${searchURL}location=${locationOptions}`;
    }
    setFilterClassName('filter-find-products-active');
  }

  const handleAvailabilityFilterChange = (event: { target: { value: any; checked: any; }; }) => {
    const checkedId = event.target.value;

    if (event.target.checked) {
      setSelectedAvailability([...selectedAvailability, checkedId])
      availabilityItems = [...selectedAvailability, checkedId];
    } else {
      setSelectedAvailability(selectedAvailability.filter(id => id !== checkedId))
      availabilityItems = availabilityItems.filter(id => id !== checkedId);
    }
    filterParams.availability = availabilityItems;
    createSearchURL();
  }

  const handleLocationFilterChange = (event: { target: { value: any; checked: any; }; }) => {
    const checkedId = event.target.value;

    if (event.target.checked) {
      setSelectedLocation([...selectedLocation, checkedId]);
      locationItems = [...selectedLocation, checkedId];
    } else {
      console.log(locationItems);
      setSelectedLocation(selectedLocation.filter(id => id !== checkedId));
      locationItems = locationItems.filter(id => id !== checkedId);
    }
    console.log(locationItems);
    filterParams.location = locationItems;
    createSearchURL();
  }

  const handlePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(event.target.value);
    filterParams.priceMin = event.target.value;
    createSearchURL();
  }

  const handlePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(event.target.value);
    filterParams.priceMax = event.target.value;
    createSearchURL();
  }

  const handleFilterProducts = () => {
    navigate({search: `${searchURL}`});
    closeDrawer();
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
          >
            <div className="drawer-top-area">
              <Button sx={{mt: 2}} onClick={closeDrawer}><CloseIcon/></Button>
            </div>
            <div className="filter-price">
              <Box sx={{m: 3}}>
                <label><span className="filter-label">Price <small>(ArtCoin)</small></span></label>
                <div className="filter-price-inside">
                  <input type="number" id="search-bar" placeholder="Min" value={priceMin} onChange={handlePriceMin}/>
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
            <div className={`filter-find-products ${filterClassName}`}>
              <Button color={"secondary"} onClick={handleFilterProducts}>Show products</Button>
            </div>
          </Box>
        </Drawer>
      </div>
    </>
  );
}

export default Filter;