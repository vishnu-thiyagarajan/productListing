import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function MediaControlCard({item, cart}) {
  const deleteItem = ()=>cart.removefromcart(item)
  const changeQuantity = (quantity)=>cart.setQuantity(item, quantity)
  const handleChange = (event) => {
    changeQuantity(event.target.value);
  };
  return (
    <Card sx={{ display: 'flex', width:"30rem", my:3 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.imageURL}
        alt={item.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Rs.{item.price}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', pl: 1, pb: 1, width:"100%" }}>
        <Select
          variant="standard"
          value={item.quantity}
          label="Quantity"
          onChange={handleChange}
        >
          <MenuItem value={1}>Quantity: 1</MenuItem>
          <MenuItem value={2}>Quantity: 2</MenuItem>
          <MenuItem value={3}>Quantity: 3</MenuItem>
          <MenuItem value={4}>Quantity: 4</MenuItem>
          <MenuItem value={5}>Quantity: 5</MenuItem>
          <MenuItem value={6}>Quantity: 6</MenuItem>
        </Select>
          <Button
            variant='contained'
            size="small"
            onClick={deleteItem}>
                DELETE
          </Button>
      </Box>
    </Card>
  );
}
