import React, { PropsWithChildren, createContext, useEffect, useReducer, Dispatch } from "react"
import { Item } from "../components/ItemsList"
import { reducer } from "./reducer"
import { Action, loadItems, setLoadingItems } from "./actions"

export type AppState = {
    loadingItems: boolean
    items: Item[]
}

const initialState: AppState = {
    loadingItems: true,
    items: []
}

export type AppContext = {
    state: AppState,
    dispatch: Dispatch<Action>
}

export const Context = createContext<AppContext>({ state: initialState, dispatch: () => null })

const Store: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(await loadItems())
                dispatch(setLoadingItems(false))
            } catch (error) {
                console.error(`Error loading items: ${error}`)
            }
        }

        fetchData()
    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default Store