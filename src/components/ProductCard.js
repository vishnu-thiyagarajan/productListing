import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function MediaCard({item, addtocart}) {
  const add = ()=>{
      addtocart(item)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.imageURL}
        alt={item.name}
      />
      <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.name}
            </Typography>
      </CardContent>
        <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
            pb={1}
            spacing={2}
        >
            <Typography gutterBottom variant="h6" component="div">
                Rs.{item.price}
            </Typography>
            <Button
                variant='contained'
                disabled={item.inCart}
                size="small"
                onClick={add}>
                    Add to cart
            </Button>
        </Stack>
    </Card>
  );
}
