const addProductBTN = document.querySelector('#addProductBTN');
const allProductsRadio = document.querySelector('#allProducts');
const needToBuyRadio = document.querySelector('#needToBuy');
const boughtRadio = document.querySelector('#Bought');
const addCategoryButton = document.querySelector('#addCategoryButton');
const tbodyElement = document.querySelector('.tbody');

let productListArr = [];

let needToBuy = [];

let alreadyBought = [];

let categoriesArr = [];

const saveLocalStorage = () => {localStorage.setItem('productListArr', JSON.stringify(productListArr))}

const loadProductsFromStorage = () => {
    const productSavedData = localStorage.getItem('productListArr');
    if(productSavedData){
        productListArr = JSON.parse(productSavedData)
        renderProducts(productListArr)
    }
    console.log(productListArr)
}

document.addEventListener("DOMContentLoaded", () => {
    loadProductsFromStorage();
    getLocalStorageAlreadyBought();
    getLocalStorageNeedToBuy();
    //updateTableByRadio();
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

    const regex = /[+\-\e\E]/g;
    if (!name || !quantity || regex.test(quantity)) {
        alert('Неверное значение');
        return;
    }
    
        productListArr.push({name: name, quantity: quantity, 'KG or PC': unit});
        needToBuy.push({name: name, quantity: quantity, 'KG or PC': unit});
        console.log(needToBuy)
        saveLocalStorage();
        saveLocalStorageNeedToBuy();
        saveLocalStorageAlreadyBought()
        renderProducts(needToBuy)

        
        
        
    
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
        //console.log('Element: ', mainCellTR.dataset.count);

        const tableProductNameTD = document.createElement('td');
        tableProductNameTD.classList.add('tableProductName');
        const tableProductNameTDText = document.createElement('p');
        tableProductNameTDText.innerText = product.name
        

        const tdBorderQuantity = document.createElement('td');
        tdBorderQuantity.classList.add('tdBorder');
        tdBorderQuantity.innerText = `${product.quantity} ${product['KG or PC'].toLowerCase()}`;

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

        if(Arr == needToBuy){
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
}



const tableBTNButtonClick = (e) => {

    const clickDiv = document.createElement("div");
    clickDiv.classList.add("clickMainDiv", "clickMainDivPositionTop", "clickMainDivPositionBottom");


    const addInCategoryDiv = document.createElement("div");
    addInCategoryDiv.classList.add("clickChildDiv");

    const ChangeCategoryDiv = document.createElement("div");
    ChangeCategoryDiv.classList.add("clickChildDiv");

    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("clickChildDiv");


    const addInNewCategoryButton = document.createElement("button");
    addInNewCategoryButton.setAttribute('type', 'button');

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

    deleteButton.addEventListener("click", (e) => {
        if(needToBuyRadio.checked){
            deleteProduct(e, needToBuy);
            console.log("Checked")
        } else if (allProductsRadio.checked){
            deleteProduct(e, productListArr);
            console.log("Checked")
        } else if (boughtRadio.checked){
            deleteProduct(e, alreadyBought);
            console.log("Checked")
        }
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
            if(e.target !== '<div class="clickChildDiv"></div>'){
            clickDiv.style.display = 'none';
            document.removeEventListener('click', documentClickHandler);
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
    const indexed = clickedButton.dataset.num;

    const getTr = document.querySelectorAll('tr')[indexed];
    const child = getTr.childNodes

    const product = needToBuy[indexed];
    console.log(product);

    needToBuy.splice(indexed, 1);

    console.log(needToBuy);

    alreadyBought.push(
    {   name: product.name, 
        quantity: product.quantity,
        'KG or PC': product['KG or PC']
    }
    );
    console.log(alreadyBought);
    
    renderProducts(needToBuy);

    saveLocalStorage();

    saveLocalStorageAlreadyBought();

    saveLocalStorageNeedToBuy();
    console.log(productListArr)
}


needToBuyRadio.addEventListener("click", () =>{
    renderProducts(needToBuy)
} )


allProductsRadio.addEventListener("click", () => {
    renderProducts(productListArr)})



boughtRadio.addEventListener("click", () => {
    renderProducts(alreadyBought)})




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

    saveLocalStorage();
    saveLocalStorageNeedToBuy();
    saveLocalStorageAlreadyBought();
    
    renderProducts(Arr);
    
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
    categoriesArr.push([{'categories name': categoryName}]);
    saveLocalStorageCategoriesArr()
    addCategoryRender()
}

const addCategoryRender = () => {
    getLocalStorageCategoriesArr()
    console.log(categoriesArr)
    categoriesArr.forEach(() => {

    })
}

addCategoryButton.addEventListener("click", addCategoryStorage)

