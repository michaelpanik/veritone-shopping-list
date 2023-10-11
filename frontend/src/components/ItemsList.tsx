import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { TransitionGroup } from 'react-transition-group';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import ItemEditDrawer from './ItemEditDrawer';
import { useContext, useState } from 'react';
import { Context } from '../context';
import { deleteItem, toggleItemPurchased } from '../actions';
import Loader from './Loader';

export type Item = {
    ID: number
    name: string
    description: string
    quantity: number
    purchased: boolean
}

const ItemsList = () => {
    const { state, dispatch } = useContext(Context)
    const [isDrawerMounted, setIsDrawerMounted] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [activeItem, setActiveItem] = useState<Item | null>(null)

    const toggleDrawerOpen = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false)
            setTimeout(() => {
                setIsDrawerMounted(false)
            }, 300)
        } else {
            setIsDrawerMounted(true)
            setTimeout(() => {
                setIsDrawerOpen(true)
            }, 1)

        }
    }

    const handleDeletedItem = async (item: Item) => {
        dispatch(await deleteItem(item.ID))
    }

    return (
        <>
            {state.loadingItems == true && <Box sx={{ width: 1, display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Loader /></Box >}
            {
                (!state.loadingItems && !state.items.length) ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
                    <Box sx={{ minWidth: 600, textAlign: 'center', border: 1, borderColor: 'grey.300', px: 5, py: 15 }}>
                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>{"Your shopping list is empty :("}</Typography>
                        <Button variant='contained' sx={{ textTransform: 'capitalize' }} onClick={toggleDrawerOpen}>Add your first item</Button>
                    </Box>
                </Box> : null
            }
            {
                (!state.loadingItems && state.items.length) ? <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant='h6'>Your Items</Typography>
                        <Button variant='contained' sx={{ textTransform: 'capitalize' }} onClick={() => {
                            setActiveItem(null)
                            toggleDrawerOpen()
                        }}>Add Item</Button>
                    </Box>
                    <Stack>
                        <TransitionGroup>
                            {state.items.map((item, i) => (
                                <Slide
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                    key={item.ID}
                                    direction="left"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <Paper sx={{ display: 'flex', py: 3, pl: 1, pr: 3, background: item.purchased && '#D5DFE92B', borderColor: item.purchased && 'transparent', mb: 2 }}
                                        variant="outlined"

                                    >

                                        <Checkbox checked={item.purchased} sx={{ mr: 1 }}
                                            onChange={e => {
                                                dispatch(toggleItemPurchased(item, e.target.checked))
                                            }} />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 500, color: item.purchased ? 'primary.main' : 'text.primary', textDecoration: item.purchased ? 'line-through' : 'none' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: item.purchased ? 'line-through' : 'none' }}>
                                                {item.description}
                                            </Typography>
                                        </Box>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => {
                                                setActiveItem(item)
                                                toggleDrawerOpen()
                                            }}>
                                                <EditOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDeletedItem(item)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </Paper>
                                </Slide>
                            ))}
                        </TransitionGroup>
                    </Stack>
                </> : null
            }
            {isDrawerMounted && <ItemEditDrawer isOpen={isDrawerOpen} toggleOpen={toggleDrawerOpen} item={activeItem} />}
        </>
    )
}

export default ItemsList