import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type NoItemsStateProps = {
    toggleDrawerOpen: () => void
}

const NoItemsState: React.FC<NoItemsStateProps> = ({ toggleDrawerOpen }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
            <Box sx={{ minWidth: 600, textAlign: 'center', border: 1, borderColor: 'grey.300', px: 5, py: 15 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>{"Your shopping list is empty :("}</Typography>
                <Button variant='contained' sx={{ textTransform: 'capitalize' }} onClick={toggleDrawerOpen}>Add your first item</Button>
            </Box>
        </Box>
    )
}

export default NoItemsState