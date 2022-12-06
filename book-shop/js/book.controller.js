var gSelected

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    const books = getBookss()
    var strHTMLs = books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}</td> 
    <td>
    <button class ="read" onclick = "onReadBook(${book.id})">Read</button>
    <button class ="update" onclick = "onUpdateBook(${book.id})">Update</button>
    <button class ="delete" onclick = "onRemoveBook(${book.id})">Delete</button>
    </td> 
    </tr>
    `)
    document.querySelector('.table-main tbody').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var name = prompt('name?')
    var price = prompt('price?')
    addBook(name, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    var price = prompt('new price?')
    updateBookPrice(bookId, price)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = 'price: ' + book.price + ', rate: ' + book.rate
    elModal.querySelector('p span').innerText = 'A ! @ # $ '
    elModal.style.display = 'block'
    gSelected = book
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none'
    gSelected = ''
    var elRate = document.querySelector('.select-rate')
    elRate.value = 0
}

function onMinusClicked() {
    var elRate = document.querySelector('.select-rate')
    var rateValue = elRate.value
    if (rateValue >= 1 && rateValue <= 10) {
        updateBookRate(gSelected, rateValue - 1)
        onReadBook(gSelected.id)
        elRate.value--
    }
    renderBooks()
}

function onPlusClicked() {
    var elRate = document.querySelector('.select-rate')
    var rateValue = elRate.value
    var next = +rateValue + 1
    if (rateValue >= 0 && rateValue <= 9) {
        updateBookRate(gSelected, next)
        onReadBook(gSelected.id)
        elRate.value++
    }
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0
    }

    if (!filterBy.maxPrice && !filterBy.minRate) return
    
    document.querySelector('.filter-max-price').value = filterBy.maxPrice
    document.querySelector('.filter-min-rate').value = filterBy.minRate
    setBookFilter(filterBy)
}

function onNextPage() {
    nextPage()
    renderBooks()
}
