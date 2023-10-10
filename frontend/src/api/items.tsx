import { Item } from "../components/ItemsList"

export const getItems = async () => {
    const items = [
        {
            id: 1,
            name: "Tomatoes",
            description: "Green cherry tomatoes",
            quantity: 1,
            purchased: false
        },
        {
            id: 2,
            name: "Carrots",
            description: "Baby carrots",
            quantity: 1,
            purchased: true
        },
        {
            id: 3,
            name: "Milk",
            description: "Whole milk",
            quantity: 1,
            purchased: false
        },
    ]
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(items), 2000)
    })
}

export async function updateItem(item: Item): Promise<Item>
export async function updateItem(item: Item, key?: keyof Item, value?: any): Promise<Item> {
    if (key !== undefined && value !== undefined) {
        item[key] = value
        return item
    }

    return item
}

export const deleteItem = async (itemId: number): Promise<number> => {
    return itemId

}
export const createItem = async (item: Item): Promise<Item> => {
    return item

}
