import { PropsWithChildren, createContext, useEffect, useReducer } from "react"
import { Item } from "./components/ItemsList"
import { reducer } from "./reducer"
import { loadItems, setLoadingItems } from "./actions"

export type AppState = {
    loadingItems: boolean
    items: Item[]
}

const initialState: AppState = {
    loadingItems: true,
    items: []
}

export const Context = createContext<{ state: AppState, dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null })

const Store: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        (async () => {
            dispatch(await loadItems())
            dispatch(setLoadingItems(false))
        })()
    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default Store