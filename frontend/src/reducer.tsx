import { ACTION, Action } from "./actions"
import { AppState } from "./context"

export const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case ACTION.SET_LOADING_ITEMS:
            return {
                ...state,
                loadingItems: action.payload.isLoading
            }

        case ACTION.SET_ITEMS:
            return {
                ...state,
                items: action.payload.items
            }

        case ACTION.UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    console.log(item, action.payload)
                    if (item.ID == action.payload.ID) {
                        return action.payload
                    }
                    return item
                })
            }

        case ACTION.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.ID != action.payload.itemId)
            }

        case ACTION.ADD_ITEM:
            const items = [...state.items, { ...action.payload, id: state.items[state.items.length - 1]?.id + 1 || 1 }]
            return {
                ...state,
                items
            }

        case ACTION.SET_ITEM_PURCHASED:
            const itemIndex = state.items.findIndex(item => item.ID == action.payload.itemId)
            const item = state.items[itemIndex]
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    { ...item, purchased: action.payload.purchased },
                    ...state.items.slice(itemIndex + 1)
                ]
            }
    }
}