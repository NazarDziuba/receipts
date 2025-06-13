const addProductBTN = document.querySelector('#addProductBTN');
const allProductsRadio = document.querySelector('#allProducts');
const needToBuyRadio = document.querySelector('#needToBuy');
const boughtRadio = document.querySelector('#Bought');
const addCategoryButton = document.querySelector('#addCategoryButton');
const tbodyElement = document.querySelector('.tbody');
const categoriesCheckButton = document.getElementsByName('categoryCheck');

let productListArr = [];

let needToBuy = [];

let alreadyBought = [];

let categoriesArr = [];

let neddToByuCategories = [];

let allArrExNeed = [];

let generateId = () => Math.floor(Math.random()*10000)

const saveLocalStorage = () => {localStorage.setItem('productListArr', JSON.stringify(productListArr))}

const loadProductsFromStorage = () => {
    const productSavedData = localStorage.getItem('productListArr');
    if(productSavedData){
        productListArr = JSON.parse(productSavedData)
        renderProducts(productListArr)
    }
    //console.log(productListArr)
}

document.addEventListener("DOMContentLoaded", () => {
    loadProductsFromStorage();
    getLocalStorageAlreadyBought();
    getLocalStorageNeedToBuy();
    allCategoriesCheckRender();
    addCategoryRender();
})

const addProductInput = document.querySelector('#addProductInput');
addProductInput.innerText = "";

const productRender = () => {
    const addProductInput = document.querySelector('#addProductInput');
    const addProductQuantityInput = document.querySelector('#addProductQuantityInput');
    const selectKgOrPieces = document.querySelector('#selectKgOrPieces');

    const name = addProductInput.value.trim();
    const quantity = addProductQuantityInput.value.trim();
    const unit = selectKgOrPieces.value;
    const id = generateId();

    const regex = /[+\-\e\E]/g;
    if (!name || !quantity || regex.test(quantity)) {
        alert('Неверное значение');
        return;
    }
    
        productListArr.push({name: name, quantity: quantity, 'KG or PC': unit, id: id});
        needToBuy.push({name: name, quantity: quantity, 'KG or PC': unit, id: id});
        //console.log(needToBuy)
        saveLocalStorage();
        saveLocalStorageNeedToBuy();
        saveLocalStorageAlreadyBought()
        renderProducts(needToBuy);
        addProductInput.value = "";
        addProductQuantityInput.value = "";
}

addProductBTN.addEventListener('click', () => {
    if (needToBuyRadio.checked) {
        productRender();
    } else {
        alert('Добавление доступно только в режиме "Нужно купить".');
    }
});

const renderProducts = (Arr) => {

    tbodyElement.innerHTML = "";
    
    Arr.forEach((product, index) =>{

        const mainCellTR = document.createElement('tr');
        mainCellTR.classList.add('mainCell');
        mainCellTR.dataset.column = 'column'+index;
        mainCellTR.dataset.id = product.id
        //console.log('Element: ', mainCellTR.dataset.id);

        const tableProductNameTD = document.createElement('td');
        tableProductNameTD.classList.add('tableProductName');
        const tableProductNameTDText = document.createElement('p');
        tableProductNameTDText.innerText = product.name
        

        const tdBorderQuantity = document.createElement('td');
        tdBorderQuantity.classList.add('tdBorder');
        tdBorderQuantity.innerText = `${product.quantity} ${product['KG or PC']}`;

        const tableBTN = document.createElement('td');
        tableBTN.classList.add('tableBTN');
        const tableBTNButton = document.createElement("button");
        tableBTNButton.setAttribute('type', 'button');
        tableBTNButton.dataset.index = index;
        const tableBTNImg = document.createElement("img");
        tableBTN.appendChild(tableBTNButton);
        tableBTNButton.appendChild(tableBTNImg);
        //console.log(tableBTN)
        tableBTNImg.src = "icons8-три-точки-24.png";
        tableBTNImg.classList.add(`img${index}`)
        //console.log(productListArr)

        if(Arr === needToBuy || Arr === neddToByuCategories){
        const tableProductNameCheck = document.createElement('button');
        tableProductNameCheck.classList.add('tableProductNameCheck')
        tableProductNameCheck.setAttribute('type', 'button');
        tableProductNameCheck.dataset.num = index;
        tableProductNameTD.appendChild(tableProductNameCheck)
        tableProductNameCheck.addEventListener('click', addInOptions)
    }


        tableProductNameTD.appendChild(tableProductNameTDText)
        mainCellTR.appendChild(tableProductNameTD);
        mainCellTR.appendChild(tdBorderQuantity);
        mainCellTR.appendChild(tableBTN);
        tbodyElement.appendChild(mainCellTR)

        tableBTNButton.addEventListener('click', tableBTNButtonClick)

        
    } )
    //console.log(productListArr)
//console.log(needToBuy)
//console.log(alreadyBought)
}



const tableBTNButtonClick = (e) => {

    const clickDiv = document.createElement("div");
    clickDiv.classList.add("clickMainDiv", "clickMainDivPositionTop", "clickMainDivPositionBottom");


    const addInCategoryDiv = document.createElement("div");
    addInCategoryDiv.classList.add("clickChildDiv");
    addInCategoryDiv.id = 'addInCategoryPopupDiv'

    const ChangeCategoryDiv = document.createElement("div");
    ChangeCategoryDiv.classList.add("clickChildDiv");

    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("clickChildDiv");


    const addInNewCategoryButton = document.createElement("button");
    addInNewCategoryButton.setAttribute('type', 'button');
    addInNewCategoryButton.id = 'newCategoryButton'

    const ChangeCategoryButton = document.createElement("button");
    ChangeCategoryButton.setAttribute('type', 'button');

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute('type', 'button');


    const addInCategoryP = document.createElement("p");
    addInCategoryP.classList.add("tableBTNButtonText");
    addInCategoryP.innerText = "Добавить в категорию";

    const ChangeCategoryP = document.createElement("p");
    ChangeCategoryP.classList.add("tableBTNButtonText");
    ChangeCategoryP.innerText = "Изменить категорию";

    const deleteP = document.createElement("p");
    deleteP.classList.add("tableBTNButtonText");
    deleteP.innerText = "Удалить";
    

    addInNewCategoryButton.appendChild(addInCategoryP);
    addInCategoryDiv.appendChild(addInNewCategoryButton);
    clickDiv.appendChild(addInCategoryDiv)
    
    ChangeCategoryButton.appendChild(ChangeCategoryP);
    ChangeCategoryDiv.appendChild(ChangeCategoryButton);
    clickDiv.appendChild(ChangeCategoryDiv);

    deleteButton.appendChild(deleteP);
    deleteDiv.appendChild(deleteButton);
    clickDiv.appendChild(deleteDiv);

    const clickedButton = e.currentTarget;
    const index = clickedButton.dataset.index;
    const mainCell = document.querySelectorAll('.mainCell')[index];
    mainCell.appendChild(clickDiv);
    //console.log(mainCell);

    addInNewCategoryButton.addEventListener('click', addInModalCategory)

    deleteButton.addEventListener("click", (e) => {
        const checkedBoxes = Array.from(document.getElementsByName('categoryCheck')).filter(ch => ch.checked)
        const hasFilter = checkedBoxes.length > 0;

        let targetArray;

        if(needToBuyRadio.checked) targetArray = hasFilter ? neddToByuCategories : needToBuy;
        else if(allProductsRadio.checked) targetArray = hasFilter ? allArrExNeed : productListArr;
        else if(boughtRadio.checked) targetArray = hasFilter ? allArrExNeed : alreadyBought;

        deleteProduct(e, targetArray);
    })

    if(index){
        mainCell.style.position = "relative";
    };

    const rect = e.currentTarget.getBoundingClientRect(); // КНОПКА
    const tableRect = tbodyElement.getBoundingClientRect(); //ТАБЛИЦА
    
    const tableHeight = tableRect.height;
    const buttonPositionInTable = rect.bottom - tableRect.top;
    const spaceBelowInTable = tableHeight - buttonPositionInTable;
    const vh = window.innerHeight/100;
    const neededHeight3Column = 21.6 * vh;
    const neededHeight2Column = 14.4 * vh;
    const neededHeight1Column = 7.2 * vh;

    if (spaceBelowInTable <=  neededHeight3Column){
        clickDiv.classList.remove("clickMainDivPositionTop")
        
    }
    else {
        clickDiv.classList.remove("clickMainDivPositionBottom")
    }

    

    setTimeout(() => { document.addEventListener('click', documentClickHandler) }, 0)

     const documentClickHandler = (e) => {
            if(!clickDiv.contains(e.target)){
            clickDiv.style.display = 'none';
            document.removeEventListener('click', documentClickHandler);
            clickDiv.innerHTML = '';
        }
    
    }

}
const getLocalStorageAlreadyBought = () => {
    const savedData = localStorage.getItem('alreadyBought');
    if(savedData){
        alreadyBought = JSON.parse(savedData);
    }
}

const saveLocalStorageAlreadyBought = () => {
    localStorage.setItem('alreadyBought', JSON.stringify(alreadyBought));
}



const getLocalStorageNeedToBuy = () => {
    const savedData = localStorage.getItem('needToBuy');
    if(savedData){
        needToBuy = JSON.parse(savedData);
        renderProducts(needToBuy);
    }
}

const saveLocalStorageNeedToBuy = () => {
    localStorage.setItem('needToBuy', JSON.stringify(needToBuy));
}

const addInOptions = (e) => {
    const clickedButton = e.currentTarget;
    const index = parseInt(clickedButton.closest('tr').dataset.id);
    //console.log(index)

    const allCategoriesCheck = document.querySelector('#allCategoryCheck')

    if(allCategoriesCheck.hasAttribute('checked')){
    const foundNeed = needToBuy.find((el) => el.id === index);
    console.log(foundNeed)
    const indexedFoundNeed = needToBuy.indexOf(foundNeed);
    //console.log(indexedFoundNeed)
    needToBuy.splice(indexedFoundNeed, 1);
    console.log(needToBuy)
    renderProducts(needToBuy);
    alreadyBought.push(foundNeed);
    console.log(alreadyBought)
    saveLocalStorage();

    saveLocalStorageAlreadyBought();

    saveLocalStorageNeedToBuy();
    }
    else{
    const foundNeedCategories = neddToByuCategories.find((el) => el.id === index);
    console.log(foundNeedCategories)
    const indexedfoundNeedCategories = neddToByuCategories.indexOf(foundNeedCategories);
    //console.log(indexedFoundNeed)
    neddToByuCategories.splice(indexedfoundNeedCategories, 1);
    console.log(neddToByuCategories)
    renderProducts(neddToByuCategories);
    alreadyBought.push(foundNeedCategories);
    console.log(alreadyBought)
    saveLocalStorage();

    saveLocalStorageAlreadyBought();

    saveLocalStorageNeedToBuy();
    }
}


needToBuyRadio.addEventListener("click", () =>{
    renderProducts(needToBuy)
    categoryClick()
    console.log(neddToByuCategories)
} )


allProductsRadio.addEventListener("click", () => {
    renderProducts(productListArr)
    categoryClick()
    console.log(allArrExNeed)
})



boughtRadio.addEventListener("click", () => {
    renderProducts(alreadyBought)
    categoryClick()
    console.log(allArrExNeed)
})




const deleteProduct = (e, Arr) => {
    const index = e.currentTarget;
    console.log(index);

    const clickedTr = index.closest("tr");
    const dataColumn = clickedTr.dataset.column;
    const indexed = parseInt(dataColumn.replace('column', ''), 10);
    console.log(indexed);

    const removedItem = Arr[indexed]
    console.log(removedItem)

    const removeFromArray = (Arr) => {
        const idx = Arr.findIndex(p => 
            p.name === removedItem.name &&
            p.quantity === removedItem.quantity &&
            p['KG or PC'] === removedItem['KG or PC']
            
        );
        console.log(idx);
        if (idx !== -1){
            Arr.splice(idx, 1)
        }
    }
    

    removeFromArray(productListArr);
    removeFromArray(needToBuy);
    removeFromArray(alreadyBought);
    removeFromArray(neddToByuCategories);
    removeFromArray(allArrExNeed)

    saveLocalStorage();
    saveLocalStorageNeedToBuy();
    saveLocalStorageAlreadyBought();
    
    renderProducts(Arr);

    categoryClick();
    
}

const allCategoriesCheckRender = () => {
    const allCategoriesCheck = document.getElementById('onlyCategories')
    //console.log(allCategoriesCheck);
    allCategoriesCheck.innerHTML = `<label for="allCategoryCheck"><input type="checkbox" name="allCategories" id="allCategoryCheck" checked><span class="categoryP">Все категории</span></label>`
}

const saveLocalStorageCategoriesArr = () => {
    localStorage.setItem('categoriesArr', JSON.stringify(categoriesArr))
}

const getLocalStorageCategoriesArr = () => {
    const savedData = localStorage.getItem('categoriesArr');
    if(savedData){
        categoriesArr = JSON.parse(savedData)
    }
};

const addCategoryStorage = () => {
    const addCategoryInput = document.getElementById('addCategoryInput');
    const categoryName = addCategoryInput.value.trim();
    categoriesArr.push({'categories name': categoryName});
    saveLocalStorageCategoriesArr();
    addCategoryRender();
    addCategoryInput.value = "";
    console.log(categoriesArr);
}

const addCategoryRender = () => {
    const allCategoriesCheck = document.getElementById('onlyCategories')
    allCategoriesCheck.innerHTML = `<label for="allCategoryCheck"><input type="checkbox" name="allCategories" id="allCategoryCheck" checked><span class="categoryP">Все категории</span></label>`
    getLocalStorageCategoriesArr();
    //console.log(categoriesArr)
    categoriesArr.forEach((category) => {
        const label = document.createElement('label');
        label.setAttribute('for', `${category['categories name']}CategoryCheck`);
        
        
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.id = `${category['categories name']}CategoryCheck`;
        input.setAttribute('name', 'categoryCheck');
        input.dataset.name = `${category['categories name']}`
        
        const span = document.createElement('span');
        span.classList.add('categoryP');
        span.textContent = `${category['categories name']}`
        
        label.appendChild(input)
        label.appendChild(span);
        allCategoriesCheck.appendChild(label)
        //console.log(label)
        
    })
    //console.log(categoriesArr)
    bindCategoryListeners()
}



addCategoryButton.addEventListener("click", addCategoryStorage)

const addInModalCategory = () => {
    
    const addInCategoryPopupDiv = document.querySelector('#addInCategoryPopupDiv')

    const addInCategoryPopupBTN = addInCategoryPopupDiv.querySelector('#newCategoryButton')
    addInCategoryPopupBTN.setAttribute('popovertarget', 'content')

    const modalDivShadow = document.createElement('div');
    modalDivShadow.classList.add('modalDivShadow')

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modalDiv');
    modalDiv.id = 'content'
    modalDiv.setAttribute('popover', '');
    modalDiv.textContent = categoriesArr['categories name']
    console.log(categoriesArr)


    modalDivShadow.appendChild(modalDiv)
    addInCategoryPopupDiv.appendChild(modalDivShadow);
    //console.log(addInCategoryPopupDiv)

    categoriesArr.forEach((category, index) => {
        const button = document.createElement('button');
        button.classList.add('modalCatButton');
        button.id = 'modalCatButton'+index;
        button.setAttribute('type', 'button');
        button.textContent = category['categories name'];
        modalDiv.appendChild(button);

        //console.log(button)
        
        button.addEventListener('click',clickCheck)
    })

    setTimeout(() => {document.addEventListener('click', documentClickHandlerCategory)}, 0)
    
    const documentClickHandlerCategory = (e) => {
        if(!modalDiv.contains(e.target)){
            modalDivShadow.style.display = 'none'
            //console.log(addInCategoryPopupDiv)
        }
    }
    
}

const clickCheck = (e) => {  // ПРИВЯЗКА КАТЕГОРИЙ В ОБЬЕКТАМ В МАССИВАХ С ПРОДУКТАМИ
    const click = e.currentTarget.closest('tr').dataset.id
    const clickNum = parseInt(click)
    //console.log(click)
    linkArrCategor(e, clickNum);
    const test = e.currentTarget;
    console.log(test)
}



const linkArrCategor = (e, clickNum) => {
    const categoryName = e.currentTarget.textContent;

    const findElementAll = productListArr.find((el) => el.id === clickNum);
    const indexOfArrAll = productListArr.indexOf(findElementAll);

    const findElementNeed = needToBuy.find((el) => el.id === clickNum);
    const indexOfArrNeed = needToBuy.indexOf(findElementNeed);

    const findElementBought = alreadyBought.find((el) => el.id === clickNum);
    const indexOfArrBought = alreadyBought.indexOf(findElementBought);

    // === Обработка: Все товары ===
    if (allProductsRadio.checked) {
        if (findElementAll?.category) {
            alert("Этому продукту уже присвоена категория");
            return;
        }

        productListArr[indexOfArrAll].category = categoryName;
        saveLocalStorage();

        if (findElementNeed && findElementAll.id === findElementNeed.id) {
            needToBuy[indexOfArrNeed].category = categoryName;
            saveLocalStorageNeedToBuy();
        }

        if (findElementBought && findElementAll.id === findElementBought.id) {
            alreadyBought[indexOfArrBought].category = categoryName;
            saveLocalStorageAlreadyBought();
        }

        console.log(productListArr);
        console.log(needToBuy);
        console.log(alreadyBought);
    }

    // === Обработка: Нужно купить ===
    if (needToBuyRadio.checked) {
        if (findElementNeed?.category) {
            alert("Этому продукту уже присвоена категория");
            return;
        }

        needToBuy[indexOfArrNeed].category = categoryName;
        saveLocalStorageNeedToBuy();

        if (findElementAll && findElementNeed.id === findElementAll.id) {
            productListArr[indexOfArrAll].category = categoryName;
            saveLocalStorage();
        }

        if (findElementBought && findElementNeed.id === findElementBought.id) {
            alreadyBought[indexOfArrBought].category = categoryName;
            saveLocalStorageAlreadyBought();
        }

        console.log(productListArr);
        console.log(needToBuy);
        console.log(alreadyBought);
    }

    // === Обработка: Уже куплено ===
    if (boughtRadio.checked) {
        if (findElementBought?.category) {
            alert("Этому продукту уже присвоена категория");
            return;
        }

        alreadyBought[indexOfArrBought].category = categoryName;
        saveLocalStorageAlreadyBought();

        if (findElementAll && findElementBought.id === findElementAll.id) {
            productListArr[indexOfArrAll].category = categoryName;
            saveLocalStorage();
        }

        if (findElementNeed && findElementBought.id === findElementNeed.id) {
            needToBuy[indexOfArrNeed].category = categoryName;
            saveLocalStorageNeedToBuy();
        }

        console.log(productListArr);
        console.log(needToBuy);
        console.log(alreadyBought);
    }
};

const categoryClick = () => {
    
    

    const allCategoryCheck = document.getElementById('allCategoryCheck').closest('label'); // Кнопка "Все категории"

    
    
    neddToByuCategories.length = 0;
    allArrExNeed.length = 0;

    const checkedBoxes = Array.from(document.getElementsByName('categoryCheck')).filter(ch => ch.checked)
    

    if(needToBuyRadio.checked){
    checkedBoxes.forEach(ch => {
        const checkCat = ch.dataset.name;
        
        needToBuy.forEach(product => {
            if(checkCat === product.category){
                let alreadyIn = neddToByuCategories.some(item => item.id === product.id)

                if(!alreadyIn){
                    neddToByuCategories.push(product)
                }
            }
        })
    })

    if(checkedBoxes.length === 0){
        allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck" checked><span class="categoryP">Все категории</span>`;
        renderProducts(needToBuy)
    }
    else{
        allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck"><span class="categoryP">Все категории</span>`;
        renderProducts(neddToByuCategories)
    }
    }



    if(allProductsRadio.checked){
        checkedBoxes.forEach(ch => {
            const checkCat = ch.dataset.name;
            
            productListArr.forEach(product => {
                if(checkCat === product.category){
                    let alreadyIn = allArrExNeed.some(item => item.id === product.id)
    
                    if(!alreadyIn){
                        allArrExNeed.push(product)
                    }
                }
            })
        })
    
        if(checkedBoxes.length === 0){
            allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck" checked><span class="categoryP">Все категории</span>`;
            renderProducts(productListArr)
        }
        else{
            allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck"><span class="categoryP">Все категории</span>`;
            renderProducts(allArrExNeed)
        }
        
        }



        if(boughtRadio.checked){
            checkedBoxes.forEach(ch => {
                const checkCat = ch.dataset.name;
                
                alreadyBought.forEach(product => {
                    if(checkCat === product.category){
                        let alreadyIn = allArrExNeed.some(item => item.id === product.id)
        
                        if(!alreadyIn){
                            allArrExNeed.push(product)
                        }
                    }
                })
            })
        
            if(checkedBoxes.length === 0){
                allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck" checked><span class="categoryP">Все категории</span>`;
                renderProducts(alreadyBought)
            }
            else{
                allCategoryCheck.innerHTML = `<input type="checkbox" name="allCategories" id="allCategoryCheck"><span class="categoryP">Все категории</span>`;
                renderProducts(allArrExNeed)
            }
            
            }
    
};

const bindCategoryListeners = () => categoriesCheckButton.forEach(ch => {
    ch.addEventListener('change', categoryClick)
})

const checkedOption = () => {
    const option = Array.from(document.getElementsByName('optionName')).filter(op => op.checked)
    console.log(option)
}


