import { itemService } from '../../services/itemService'


export function loadItems(filterBy) {
    return async dispatch => {
        try {
            const items = await itemService.query(filterBy);
            dispatch({ type: 'SET_ITEMS', items })
        } catch (err) {
            console.log('err in loadItems', err);
        }

    }
}



export function updateItem(item) {
    return async dispatch => {
        try {
            await itemService.save(item);
            dispatch({ type: 'UPDATE_ITEM', item })
        } catch (err) {
            console.log('err in updateItem', err)

        }
    }
}

export function addItem(item) {
    return async dispatch => {
        try {
            console.log("add",item)
            await itemService.save(item);
            dispatch({ type: 'ADD_ITEM', item })
        } catch (err) {
            console.log('err in addItem', err)

        }
    }
}


export function removeItem(id) {
    return async dispatch => {
        try {
            await itemService.remove(id);
            dispatch({ type: 'REMOVE_ITEM', id })
        } catch (err) {
            console.log('err in removeItem', err);
        }
    }
}
