import axios from 'axios';
import {storageService} from './storageService'

export const itemService = {
    query,
    save,
    remove,
    getById

}

var gItems;
const key = 'items';

function query() {
    
    // async function query() {
    // const items = await axios.get(url)
    // return items.data

    gItems = storageService.loadFromStorage(key);
    if (!gItems || !gItems.length) {
      gBooks = _createItems()
      storageService.saveToStorage(key, gItems);
    }
    return Promise.resolve(items)
}


function save(itemToSave) {
    itemToSave.id ? _update(itemToSave) : _add(itemToSave)
}

function _add(item) {
    const itemToAdd = {
        ...item,
        id: makeId()
    }
    items = [itemToAdd, ...items]

}
function _update(itemToSave) {
    items = items.map(item => item.id === itemToSave.id ? itemToSave : item)
    return itemToSave
}

function remove(itemId) {
    items = items.filter(item => item.id !== itemId)
}

function getById(itemId) {
    const item = items.find(item => item.id === itemId)
    return Promise.resolve(item)
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function _createItems() {
    return [{data:"data"}]
}