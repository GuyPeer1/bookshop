'use strict'
const STORAGE_KEY = 'booksDB'
var gBooks
var gFilterBy = { maxPrice: 0, minRate: 0, title: '' }

const PAGE_SIZE = 4
var gPageIdx = 0

_createBooks()

function _createBook(id, title, price) {
    return {
        id: id,
        title: title,
        price: price,
        rate: 0
    }
}
function _createBooks() {
    var book = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!book || !book.length) {
        book = []
        var ids = [1, 4, 50]
        var titles = ['Learning', 'Beginer', 'Java']
        var prices = [0, 10, 50]
        for (var i = 0; i < 3; i++) {
            book.push(_createBook(ids[i], titles[i], prices[i]))
        }
    }
    gBooks = book
    _saveBooksToStorage()
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    const id = getRandomIntInclusive(0, 10000)
    const book = _createBook(id, name, price)
    gBooks.push(book)
    _saveBooksToStorage()
}

function updateBookPrice(bookId, price) {
    const book = gBooks.find(book => bookId === book.id)
    book.price = price
}

function updateBookRate(book, rate) {
    book.rate = rate
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBookss() {
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice && 
        book.rate >= gFilterBy.minRate && 
        (book.title.toLocaleLowerCase().includes(gFilterBy.title.toLocaleLowerCase()) 
        ))
        var startIdx = gPageIdx * PAGE_SIZE
        return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function getBookById(bookId) {
    return gBooks.find(book => bookId === book.id)
}

function setBookFilter(filterBy = {}) {
    gPageIdx = 0
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    return gFilterBy
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}