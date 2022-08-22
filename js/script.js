(function(){

const formElm = document.querySelector('form');
const nameInputElm = document.querySelector('.product-name');
const priceInputElm = document.querySelector('.product-price');
const listGroupElm = document.querySelector('.list-group');
const filterElm = document.querySelector('#filter');

// traking item
let products = []


function showAllItemsToUl(items){
    listGroupElm.innerHTML = ''
    items.forEach(item => {
        const listElm = `<li class="list-group-item item-${item.id} collection-item">
    <strong>${item.name}</strong> <span class="price"> $${item.price}</span>
    <i class="fa-solid fa-trash-can delete-item float-end"></i>
  </li>`

  listGroupElm.insertAdjacentHTML('afterbegin', listElm);
    });
}


function updateAfterRemove(products, id){
    return products.filter(product => product.id !== id)
}


function removeItemFromDataStor(id){
    const productsAfterDelet = updateAfterRemove(products, id)
    products = productsAfterDelet
}


function removeItemFromUl(id){
    document.querySelector(`.item-${id}`).remove()
}


function getItemId(elm){
    const liElm = elm.parentElement
    return Number(liElm.classList[1].split('-')[1])
}


function resetInput(){
    nameInputElm.value = ''
    priceInputElm.value = ''
}


function addItemToUl(id, name, price){
    const listElm = `<li class="list-group-item item-${id} collection-item">
    <strong>${name}</strong> <span class="price"> $${price}</span>
    <i class="fa-solid fa-trash-can delete-item float-end"></i>
  </li>`

  listGroupElm.insertAdjacentHTML('afterbegin', listElm);
}


function receiveInput(){
    const nameInput = nameInputElm.value
    const priceInput = priceInputElm.value
    return{
        nameInput, priceInput,
    }
}

function validateInput(name, price){
    let isError = false
    if(!name || name.length < 2){
        isError = true
    }
    if(!price || Number(price) <= 0){
        isError = true
    }

    return isError
}

function addItemToStorage(product){
    let products
    if(localStorage.getItem('storeProduct')) {
        products = JSON.parse(localStorage.getItem('storeProduct'))
        products.push(product)
        // Update item on dataStore
        localStorage.setItem('storeProduct', JSON.stringify(products))
    } else{
        products = []
        products.push(product)
        // update item on dataStore
        localStorage.setItem('storeProduct', JSON.stringify(products))
    }

}

function addItemToStorage(product){
    let products
    if(localStorage.getItem('storeProduct')){
        products = JSON.parse(localStorage.getItem('storeProduct'))
        products.push(product)
        // Update to localstorage
        localStorage.setItem('storeProduct', JSON.stringify(products))
    } else{
        products = []
        products.push(product)
        localStorage.setItem('storeProduct', JSON.stringify(products))
    }
}


function removeItemFromStorage(id){
    //pick from localstorage
    const products = JSON.parse(localStorage.getItem('storeProduct'))
    // filter
    const productsAfterRemove = updateAfterRemove(products, id)
    // save data to localstorage
    localStorage.setItem('storeProduct', JSON.stringify(productsAfterRemove))
}



function init(){


    formElm.addEventListener('submit', (evt) => {
        // preventDefalt action (browser reloading)
        evt.preventDefault()
    
        // receiveing Input
        const {nameInput, priceInput} = receiveInput()
    
        // Validate Input
        const isError = validateInput(nameInput, priceInput)
        
        if(isError){
            alert('Pleass Provide a valied Input');
            return
        }
        
            // ganarate id
            const id = products.length

            const product = {
                id: id,
                name: nameInput,
                price: priceInput,
            }
            // add item to data store
            products.push(product)
            // add item to ul
            addItemToUl(id, nameInput, priceInput);
            // add item to localstroage
            addItemToStorage(product)
            //reset the input
            resetInput()
        
    })


    listGroupElm.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('delete-item')){
            const id = getItemId(evt.target)
    
            // delete item from ul
            removeItemFromUl(id)
            // delete item from data storage
            removeItemFromDataStor(id)
            // delete item from localstorage
            removeItemFromStorage(id)
        }
    })
    

filterElm.addEventListener('keyup', (evt) => {
    // filter depend on this value
    const filterValue = evt.target.value
    const filteredArr = products.filter((product) => product.name.includes(filterValue)
    )
    showAllItemsToUl(filteredArr)
})
 document.addEventListener('DOMContentLoaded', (e) => {
    // Checking item into localstorage
    if(localStorage.getItem('storeProduct')) {
        const products = JSON.parse(localStorage.getItem('storeProduct'))
        showAllItemsToUl(products)
    }
 })


}

init()

})()