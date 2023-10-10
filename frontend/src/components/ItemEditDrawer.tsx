import { Fragment, useContext, useEffect, useState } from "react"
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Item } from "./ItemsList"
import { addItem, updateItem } from "../actions"
import { Context } from "../context"

type ItemEditDrawerProps = {
    isOpen: boolean
    toggleOpen: () => void
    item: Item | null
}

const defaultItemState = { id: 1, name: "", description: "", quantity: 1, purchased: false }

const ItemEditDrawer = ({ isOpen, toggleOpen, item }: ItemEditDrawerProps) => {
    const [itemData, setItemData] = useState<Item>(defaultItemState)
    const { dispatch } = useContext(Context)

    useEffect(() => {
        if (item !== null) {
            setItemData(item)
        }
    }, [])

    const handleChange = (key: keyof Item, value: string) => {
        setItemData({ ...itemData, [key]: value })
    }

    const saveChanges = () => {
        if (!itemData) return

        if (item) {
            dispatch(updateItem(itemData))
        } else {
            dispatch(addItem(itemData))
        }

        toggleOpen()
    }

    return (
        <Fragment key="right">
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleOpen}

            >
                <Box
                    sx={{ width: 560, height: 1, display: 'flex', flexDirection: 'column', borderBottom: 5, borderColor: 'primary.main' }}
                >
                    <Box sx={{ backgroundColor: '#fafafa', borderBottom: 1, borderColor: 'grey.300', px: 3, py: 2 }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
                            Shopping List
                        </Typography>
                    </Box>
                    {itemData && <Box sx={{ flexGrow: 1, px: 3, py: 5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, }}>
                            {item ? "Edit an Item" : "Add an Item"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item ? "Edit your item below" : "Add your new item below"}
                        </Typography>
                        <TextField id="outlined-basic" label="Item Name" variant="outlined" fullWidth margin="normal"
                            value={itemData.name}
                            onChange={e => handleChange('name', e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Description" variant="outlined" rows={6} multiline fullWidth margin="normal"
                            value={itemData.description}
                            onChange={e => handleChange('description', e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="quantityLabel">How many?</InputLabel>
                            <Select labelId="quantityLabel" label="How many?" value={itemData.quantity}
                                onChange={e => handleChange('quantity', e.target.value)}
                            >
                                {[1, 2, 3].map(val => <MenuItem value={val} key={`option_${val}`}>{val}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>}
                    <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "flex-end", gap: 3 }}>
                        <Button variant="text" sx={{ textTransform: "capitalize", color: 'text.primary' }} onClick={toggleOpen}>Cancel</Button>
                        <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={saveChanges}>{item ? "Save Item" : "Add Task"}</Button>
                    </Box>
                </Box>
            </Drawer>
        </Fragment >
    )
}

export default ItemEditDrawer