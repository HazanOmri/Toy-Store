
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
let toys
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy
}


// function query(filterBy = getDefaultFilter()) {
//     const queryParams = `?vendor=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
//     return httpService.get(BASE_URL + queryParams)
// }

function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            console.log('filterBy.txt', filterBy.txt)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.isInStock) {
                console.log(filterBy.isInStock)
                toys = toys.filter(toy => toy.inStock)
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return httpService.delete(BASE_URL + toyId)
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', isInStock: false }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getEmptyToy() {
    return {
        "_id": "",
        "name": "",
        "price": 100,
        "labels": [],
        "createdAt": '',
        "inStock": false
    }
}

function _createToys() {
    toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys !== undefined) return
    toys = [
        {
            "_id": utilService.makeId(),
            "name": "Mikasa",
            "price": 100,
            "labels": ["Outdoor", "Art"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        },
        {
            "_id": utilService.makeId(),
            "name": "Teddy Bear",
            "price": 30,
            "labels": ["Doll"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        },
        {
            "_id": utilService.makeId(),
            "name": "PSP",
            "price": 20,
            "labels": ["Battery Powered"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        },
        {
            "_id": utilService.makeId(),
            "name": "Race Car",
            "price": 50,
            "labels": ["On wheels", "Outdoor"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        },
        {
            "_id": utilService.makeId(),
            "name": "Baby Doll",
            "price": 25,
            "labels": ["Doll", "Baby"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        },
        {
            "_id": utilService.makeId(),
            "name": "House Puzzle",
            "price": "10",
            "labels": ["Puzzle", "Box game"],
            "createdAt": randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString("en-US"),
            "inStock": Math.random() > 0.5
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
}
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]