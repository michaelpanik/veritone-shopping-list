import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { TransitionGroup } from 'react-transition-group';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import ItemEditDrawer from "./ItemEditDrawer";
import { useContext, useState } from 'react';
import { Context } from '../context';
import Loader from './Loader';
import ItemsListRow from './ItemsListRow';
import NoItemsState from './NoItemsState';
import Slide from '@mui/material/Slide';

export type Item = {
    ID: number
    name: string
    description: string
    quantity: number
    purchased: boolean
}

const ItemsList = () => {
    const { state } = useContext(Context)
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

    const handleEditClick = (item: Item | null) => {
        setActiveItem(item)
        toggleDrawerOpen()
    }

    return (
        <>
            {state.loadingItems == true &&
                <Box sx={{ width: 1, display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <Loader />
                </Box >
            }
            {(!state.loadingItems && !state.items.length) ? <NoItemsState toggleDrawerOpen={toggleDrawerOpen} /> : null}
            {(!state.loadingItems && state.items.length) ?
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant='h6'>Your Items</Typography>
                        <Button variant='contained' sx={{ textTransform: 'capitalize' }} onClick={() => handleEditClick(null)}>Add Item</Button>
                    </Box>
                    <Stack>
                        <TransitionGroup>
                            {state.items.map((item, i) => (
                                <Slide
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                    key={`item_row_${item.ID}`}
                                    direction="left"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    {ItemsListRow({ i, item, handleEditClick: () => handleEditClick(item), key: `item_list_row_${i}` })}
                                </Slide>
                            ))}
                        </TransitionGroup>
                    </Stack>
                </>
                : null
            }
            {isDrawerMounted && <ItemEditDrawer isOpen={isDrawerOpen} toggleOpen={toggleDrawerOpen} item={activeItem} />}
        </>
    )
}

export default ItemsList

