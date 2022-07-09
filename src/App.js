import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import FilterList from "./components/FilterList";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

const filterIntial = {
  Red: false,
  Blue: false,
  Green: false,
  Men: false,
  Women: false,
  "R0-250": false,
  "R251-450": false,
  "R450": false,
  Polo: false,
  Hoodie: false,
  Basic: false,
}
const drawerWidth = 300;

function App() {
  const location = useLocation()
  const [products, setProducts] = React.useState(null);
  const [filterState, setFilterState] = React.useState(filterIntial);
  const [display, setDisplay] = React.useState(null);
  const matches = useMediaQuery('(min-width:600px)');
  const [cartItems, setCartItems] = React.useState([])

  const onFilterChange = (key) => {
    filterState[key] = !filterState[key]
    setFilterState({...filterState})
  }
  const reset = () => {
    setDisplay(products)
    setFilterState(filterIntial)
  }
  const filterSrch = (search)=>{
      if (search === "") return reset()
      const srch = search.toLowerCase().split(" ").join("")
      const filtered = display.filter((item)=>srch.includes(item.name.toLowerCase())||srch.includes(item.type.toLowerCase())||srch.includes(item.color.toLowerCase()))
      setDisplay(filtered)
  }
  const addtocart = (item)=>{
    item.quantity = 1
    setCartItems([...cartItems, item])
    const setInCartTrue = (product)=>{
      if(product.id === item.id) product.inCart = true
      return product
    }
    setDisplay(display.map(setInCartTrue))
    setProducts(products.map(setInCartTrue))
  }
  const removefromcart = (item)=>{
    setCartItems([...cartItems.filter((product)=>product.id!==item.id)])
    const setInCartFalse = (product)=>{
      if(product.id === item.id) product.inCart = false
      return product
    }
    setDisplay(display.map(setInCartFalse))
    setProducts(products.map(setInCartFalse))
  }
  const setQuantity=(item, quantity)=>{
    setCartItems(cartItems.map((product)=>{
      if(product.id === item.id) product.quantity = quantity
      return product
    }))
  }
  const emptyCart = ()=>{
    setCartItems([])
    setProducts(products.map((item)=>{
      item.inCart = false
      return item
    }))
  }
  const cart = {
    items: cartItems,
    emptyCart: emptyCart,
    setQuantity: setQuantity,
    addtocart: addtocart,
    removefromcart: removefromcart
  }
  React.useEffect(() => {
      async function fetchData() {
          if(!products) {
              const response = await fetch(`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`)
              let data = await response.json();
              data = data.map((item)=>{
                item.inCart = false
                return item
              })
              setProducts(data)
              setDisplay(data)
          }
        }
      fetchData();
     // eslint-disable-next-line
  }, []);
  React.useEffect(()=>{
    if(Object.values(filterState).every(v => v===false)) return
    const keys = {
      color: [],
      gender: [],
      price: [],
      type:[]
    }
    for (const [index, [key, value]] of Object.entries(Object.entries(filterState))) {
      if (value) {
        if(index <3) keys.color.push(key) 
        if(index > 2 && index <5) keys.gender.push(key)
        if(index > 4 && index <8) keys.price.push(key.slice(1))
        if(index > 7) keys.type.push(key)
      }
    }
    let res = null;
    if(keys.color.length) res = display.filter((item)=>keys.color.indexOf(item.color) > -1)
    if(keys.gender.length) res = (res ? res : display).filter((item)=>keys.gender.indexOf(item.gender) > -1)
    if(keys.type.length) res = (res ? res : display).filter((item)=>keys.type.indexOf(item.type) > -1)
    if(keys.price.length) res = (res ? res : display).filter((item)=>{
      for (const range of keys.price){
        const rangeArr = range.split("-")
        const start = Number(rangeArr[0])
        const end = Number(rangeArr[1] || Number.MAX_VALUE)
        if ( start <= item.price && item.price <= end) return true
      }
      return false
    })
    setDisplay(res)
   // eslint-disable-next-line
  },[filterState])
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header reset={reset} cartVal={cartItems.length}/>
      {matches && location.pathname === "/" &&<Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <FilterList filterState={filterState} onFilterChange={onFilterChange}/>
        </Box>
      </Drawer>}
      <Box component="main" sx={{ p: matches ? 3 : 1, width: "100%" }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Products cart={cart} display={display} filterSrch={filterSrch} filterState={filterState} onFilterChange={onFilterChange}/>}/>
          <Route path="/cart" element={<Cart cart={cart} products={products}/>}/>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
