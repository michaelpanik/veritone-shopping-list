import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Item } from "./ItemsList";
import { addItem, updateItem } from "../context/actions";
import { Context } from "../context";
import Loader from "./Loader";
import { LastPage } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export type ItemEditDrawerProps = {
    isOpen: boolean
    toggleOpen: () => void
    item: Item | null
}

export const defaultItemState = { name: "", description: "", quantity: 1, purchased: false }

const ItemEditDrawer = ({ isOpen, toggleOpen, item }: ItemEditDrawerProps) => {
    const [itemData, setItemData] = useState<Item>(defaultItemState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useContext(Context);

    useEffect(() => {
        if (item !== null) {
            setItemData(item);
        }
    }, []);

    const handleChange = (key: keyof Item, value: string | number) => {
        setItemData({ ...itemData, [key]: value });
    };

    const handleDescriptionChange = (text: string) => {
        handleChange('description', text.slice(0, 100))
    }

    const saveChanges = async () => {
        if (!itemData) return;

        setIsLoading(true);

        if (item) {
            dispatch(await updateItem(itemData));
        } else {
            dispatch(await addItem(itemData));
        }

        setIsLoading(false);
        toggleOpen();
    };

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
                    <Box sx={{ backgroundColor: '#fafafa', borderBottom: 1, borderColor: 'grey.300', px: 3, py: 2, display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontFamily: 'Dosis' }}>
                            Shopping List
                        </Typography>
                        <Tooltip title="Close">
                            <IconButton onClick={toggleOpen}>
                                <LastPage sx={{
                                    color: "#555F7C"
                                }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {itemData && <Box sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, }}>
                            {item ? "Edit an Item" : "Add an Item"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item ? "Edit your item below" : "Add your new item below"}
                        </Typography>
                        <TextField id="outlined-basic" label="Item Name" variant="outlined" fullWidth margin="normal"
                            value={itemData.name}
                            onChange={e => handleChange('name', e.target.value)} />
                        <FormControl fullWidth margin="normal" sx={{ position: 'relative' }}>
                            <TextField id="outlined-basic" label="Description" variant="outlined" rows={6} multiline fullWidth
                                value={itemData.description}
                                onChange={e => handleDescriptionChange(e.target.value)} />
                            <Box sx={{ fontSize: 12, position: 'absolute', color: itemData.description.length > 99 ? "red" : "text.secondary", bottom: '0.75em', right: '1.25em' }}>
                                {itemData.description.length}/100
                            </Box>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="quantityLabel">How many?</InputLabel>
                            <Select labelId="quantityLabel" label="How many?" value={itemData.quantity}
                                onChange={e => handleChange('quantity', Number(e.target.value))}
                            >
                                {[1, 2, 3].map(val => <MenuItem value={val} key={`option_${val}`}>{val}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>}
                    <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "flex-end", gap: 3 }}>
                        <Button variant="text" sx={{ textTransform: "capitalize", color: 'text.primary' }} onClick={toggleOpen} disabled={isLoading}>Cancel</Button>
                        <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={saveChanges} disabled={isLoading}>
                            {isLoading && <Loader style={{ width: '1em', height: '1em', marginRight: '0.5em' }} />}
                            {item ? "Save Item" : "Add Task"}
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Fragment>
    );
};

export default ItemEditDrawer