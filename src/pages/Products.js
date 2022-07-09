import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import FilterList from '../components/FilterList';
import ProductCard from '../components/ProductCard';

export default function Products({cart, display, filterSrch, filterState, onFilterChange}){
    const matches = useMediaQuery('(min-width:600px)');
    const [search, setSearch] = React.useState("");
    const handleSrch = (e)=>setSearch(e.target.value);
    const filter = ()=>filterSrch(search)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const openMenu = (event) => setAnchorEl(event.currentTarget);
    const closeMenu = () => setAnchorEl(null);
    return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
      
        <Grid item xs={12}>
        <TextField 
            id="standard-basic"
            value={search}
            helperText="Search empty to reset.."
            autoFocus label="Search..." 
            variant="standard" 
            onChange={handleSrch} />
        <Button variant="contained" onClick={filter}><SearchIcon/></Button>
        {!matches && <Button variant="contained" sx={{ml:"10px"}} onClick={openMenu}><FilterAltIcon/></Button>}
        {!matches && <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
        >
            <FilterList filterState={filterState} onFilterChange={onFilterChange}/>
        </Menu>
        }

        </Grid>   
         <Grid container spacing={4} pt={5}>
             {display && display.map((item)=>{
                 return (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <ProductCard item={item} addtocart={cart.addtocart}/>
                </Grid>
                 )
             })}
         </Grid>
    </Grid>
    )
}