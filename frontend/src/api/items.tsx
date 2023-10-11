import { AxiosResponse } from "axios"
import { Item } from "../components/ItemsList"
import api from './index'

type ItemResponse = {
    status: number
    data: Item | Item[]
}

export const getItems = async () => {
    const items: AxiosResponse<ItemResponse> = await api.get('item')
    return items.data.data
}

export async function updateItem(item: Item): Promise<Item>
export async function updateItem(item: Item, key?: keyof Item, value?: any): Promise<Item> {
    if (key !== undefined && value !== undefined) {
        item[key] = value
    }

    const res = await api.put(`item/${item.ID}`, item)
    return res.data.data
}

export const deleteItem = async (itemId: number): Promise<number> => {
    const res = await api.delete(`item/${itemId}`)
    console.log(res)
    return res.data.data
}

export const createItem = async (item: Item): Promise<Item | Item[]> => {
    const res: AxiosResponse<ItemResponse> = await api.post('item', item)
    return res.data.data
}
