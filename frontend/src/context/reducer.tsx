import { ACTION, Action } from "./actions";
import { AppState } from ".";
import { Item } from "../components/ItemsList";

/**
 * Reducer function for managing application state.
 *
 * @param {AppState} state - The current state.
 * @param {Action} action - The action dispatched to update the state.
 * @returns {AppState} The new state after applying the action.
 */
export const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case ACTION.SET_LOADING_ITEMS:
            return {
                ...state,
                loadingItems: action.payload.isLoading
            };

        case ACTION.SET_ITEMS:
            return {
                ...state,
                items: action.payload.items
            };

        case ACTION.UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map((item: Item) => {
                    if (item.ID === action.payload.ID) {
                        return action.payload;
                    }
                    return item;
                })
            };

        case ACTION.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item: Item) => item.ID !== action.payload.itemId)
            };

        case ACTION.ADD_ITEM:
            const newItem = action.payload;
            return {
                ...state,
                items: [...state.items, newItem]
            };

        case ACTION.SET_ITEM_PURCHASED:
            const itemIndex = state.items.findIndex((item: Item) => item.ID === action.payload.itemId);
            const updatedItem = {
                ...state.items[itemIndex],
                purchased: action.payload.purchased
            };
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    updatedItem,
                    ...state.items.slice(itemIndex + 1)
                ]
            };

        default:
            return state;
    }
};