import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ background: "#4D81B7" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontFamily: 'Dosis' }}>
                        Shopping List
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar