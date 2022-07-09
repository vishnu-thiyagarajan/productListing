import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from "react-router-dom";

function Header({reset, cartVal}) {
    const navigate = useNavigate()
    const location = useLocation()
    const goHome = ()=>{
        reset()
        navigate("/")
    }
    const goCart = ()=>navigate("/cart")
    return (
    <AppBar component="nav" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
        >
            Tee Rex
        </Typography>
        <Box>
            <Button sx={{ color: '#fff', borderRadius: 0, borderBottom: location.pathname === "/" ? "1px solid" : "" }} onClick={goHome}>
                Products
            </Button>
            <Button sx={{ color: '#fff', borderRadius: 0, borderBottom: location.pathname === "/cart" ? "1px solid" : "" }} onClick={goCart}>
                <Badge color="secondary" badgeContent={cartVal}>
                <ShoppingCartOutlinedIcon/>
                </Badge>
            </Button>
        </Box>
        </Toolbar>
    </AppBar>
    )
}

export default Header;
