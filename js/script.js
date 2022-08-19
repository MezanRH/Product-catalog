const formElm = document.querySelector('form');
const nameInputElm = document.querySelector('.product-name');
const priceInputElm = document.querySelector('.product-price');
const listGroupElm = document.querySelector('.list-group')

formElm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    // receiveing Input
    const {nameInput, priceInput} = receiveInput()

    // Validate Input
    const isError = validateInput(nameInput, priceInput)

    if(!isError){
        // add item to ul
        addItemToUl(nameInput, priceInput);
        //reset the input
        resetInput()
    }
    
})

function resetInput(){
    nameInputElm.value = ''
    priceInputElm.value = ''
}


function addItemToUl(name, price){
    const listElm = `<li class="list-group-item collection-item">
    <strong>${name}</strong> <span class="price"> $${price}</span>
    <i class="fa-solid fa-trash-can float-end"></i>
  </li> <br>`

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