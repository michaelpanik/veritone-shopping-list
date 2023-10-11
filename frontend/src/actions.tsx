import { Item } from "./components/ItemsList"
import { getItems, updateItem as updateItemAPI, deleteItem as deleteItemAPI, createItem as createItemAPI } from "./api/items"

export enum ACTION {
    SET_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    ADD_ITEM,
    SET_ITEM_PURCHASED,
    SET_LOADING_ITEMS
}

export type Action = {
    type: ACTION,
    payload: {
        [key: string]: any
    }
}

export const setLoadingItems = (isLoading: boolean): Action => {
    return {
        type: ACTION.SET_LOADING_ITEMS,
        payload: {
            isLoading
        }
    }
}

export const loadItems = async (): Promise<Action> => {
    const items = await getItems()

    return {
        type: ACTION.SET_ITEMS,
        payload: {
            items
        }
    }
}

export const updateItem = async (item: Item): Promise<Action> => {
    await updateItemAPI(item)

    return {
        type: ACTION.UPDATE_ITEM,
        payload: item
    }
}

export const deleteItem = async (itemId: number): Promise<Action> => {
    try {
        await deleteItemAPI(itemId)

        return {
            type: ACTION.DELETE_ITEM,
            payload: {
                itemId
            }
        }
    } catch (error) {
        throw error
    }
}

export const addItem = async (item: Item): Promise<Action> => {
    const newItem = await createItemAPI(item)

    return {
        type: ACTION.ADD_ITEM,
        payload: newItem
    }
}

export const toggleItemPurchased = (item: Item, purchased: boolean): Action => {
    updateItemAPI(item, 'purchased', purchased)

    return {
        type: ACTION.SET_ITEM_PURCHASED,
        payload: {
            itemId: item.ID,
            purchased
        }
    }
}