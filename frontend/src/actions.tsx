import { Item } from "./components/ItemsList"
import { getItems as getItemsAPI, updateItem as updateItemAPI, deleteItem as deleteItemAPI, createItem as createItemAPI } from "./api/items"

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
    const items = await getItemsAPI()
    console.log(items)

    return {
        type: ACTION.SET_ITEMS,
        payload: {
            items
        }
    }
}

export const updateItem = (item: Item): Action => {
    updateItemAPI(item)

    return {
        type: ACTION.UPDATE_ITEM,
        payload: item
    }
}

export const deleteItem = (itemId: number): Action => {
    deleteItemAPI(itemId)

    return {
        type: ACTION.DELETE_ITEM,
        payload: {
            itemId
        }
    }
}

export const addItem = (item: Item): Action => {
    createItemAPI(item)

    return {
        type: ACTION.ADD_ITEM,
        payload: item
    }
}

export const toggleItemPurchased = (item: Item, purchased: boolean): Action => {
    updateItem(item, 'purchased', purchased)

    return {
        type: ACTION.SET_ITEM_PURCHASED,
        payload: {
            itemId: item.id,
            purchased
        }
    }
}