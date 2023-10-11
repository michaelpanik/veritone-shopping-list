import { Item } from "../components/ItemsList"
import { getItems, updateItem as updateItemAPI, deleteItem as deleteItemAPI, createItem as createItemAPI } from "../api/items"

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

/**
 * Sets loading status for items.
 *
 * @param {boolean} isLoading - Indicates whether items are being loaded.
 * @returns {Action} An action object to set loading status.
 */
export const setLoadingItems = (isLoading: boolean): Action => {
    return {
        type: ACTION.SET_LOADING_ITEMS,
        payload: {
            isLoading
        }
    }
}

/**
 * Loads items from the server.
 *
 * @returns {Promise<Action>} A promise that resolves to an action object to set loaded items.
 */
export const loadItems = async () => {
    try {
        const items = await getItems();
        return {
            type: ACTION.SET_ITEMS,
            payload: {
                items
            }
        };
    } catch (error) {
        throw new Error(`Failed to load items: ${error}`);
    }
}

/**
 * Updates an item.
 *
 * @param {Item} item - The item to be updated.
 * @returns {Promise<Action>} A promise that resolves to an action object to update the item.
 */
export const updateItem = async (item: Item) => {
    try {
        await updateItemAPI(item);
        return {
            type: ACTION.UPDATE_ITEM,
            payload: item
        };
    } catch (error) {
        throw new Error(`Failed to update item: ${error}`);
    }
}

/**
 * Deletes an item.
*
* @param {number} itemId - The ID of the item to be deleted.
* @returns {Promise<Action>} A promise that resolves to an action object to delete the item.
* @throws {Error} If there is an error while deleting the item.
 */
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
        throw new Error(`Failed to update item: ${error}`);
    }
}

/**
 * Adds a new item.
 *
 * @param {Item} item - The item to be added.
 * @returns {Promise<Action>} A promise that resolves to an action object to add the item.
 */
export const addItem = async (item: Item): Promise<Action> => {
    try {
        const newItem = await createItemAPI(item)
        return {
            type: ACTION.ADD_ITEM,
            payload: newItem
        }
    } catch (error) {
        throw new Error(`Failed to add item: ${error}`)
    }
}

/**
 * Toggles the purchased status of an item.
 *
 * @param {Item} item - The item to be updated.
 * @param {boolean} purchased - The new purchased status.
 * @returns {Action} An action object to toggle the purchased status of the item.
 */
export const toggleItemPurchased = (item: Item, purchased: boolean) => {
    updateItemAPI(item, 'purchased', purchased);

    return {
        type: ACTION.SET_ITEM_PURCHASED,
        payload: {
            itemId: item.ID,
            purchased
        }
    };
}