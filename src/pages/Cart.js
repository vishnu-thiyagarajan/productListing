import Button from '@mui/material/Button';
import CartItem from "../components/CartItem";

export default function Cart({cart, products}){
    if (!cart.items.length) return <h1>Shopping Cart is empty</h1>
    const placeOrder = () => {
        for(const cartItem of cart.items){
            for(const product of products){
                if(cartItem.id === product.id && cartItem.quantity > product.quantity) return alert(`Stock of ${cartItem.name} is not available, try reducing the quantity`)
            } 
        }
        cart.emptyCart()
        return alert(`Order Placed successfully`);
    }
    return (
        <>
            <h1>Shopping Cart</h1>
            {cart.items.map((item)=>{
                return (<CartItem key={item.id} item={item} cart={cart}/>)
            })}
            <Button
            variant='contained'
            size="small"
            onClick={placeOrder}>
                PLACE ORDER
          </Button>
        </>
    )
}