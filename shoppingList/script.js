const addProductBTN = document.querySelector('#addProductBTN');
const allProductsRadio = document.querySelector('#allProducts');
const needToBuyRadio = document.querySelector('#needToBuy');
const boughtRadio = document.querySelector('#Bought');
const addCategoryButton = document.querySelector('#addCategoryButton');
const tbodyElement = document.querySelector('.tbody');

let productListArr = [];



const saveLocalStorage = () => {localStorage.setItem('productListArr', JSON.stringify(productListArr))}

const loadProductsFromStorage = () => {
    const productSavedData = localStorage.getItem('productListArr');
    if(productSavedData){
        productListArr = JSON.parse(productSavedData)
        renderProducts(productListArr.name, productListArr.quantity, productListArr['KG or PC'])
    }
    console.log(productListArr)
}

document.addEventListener("DOMContentLoaded", loadProductsFromStorage)

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
        saveLocalStorage();
        renderProducts()

    console.log(productListArr)
    
}

addProductBTN.addEventListener('click', productRender)

const renderProducts = () => {

    tbodyElement.innerHTML = "";
    
    productListArr.forEach((productListArr, index) =>{

        const mainCellTR = document.createElement('tr');
        mainCellTR.classList.add('mainCell');
        mainCellTR.dataset.column = 'column'+index;
        //console.log('Element: ', mainCellTR.dataset.count);

        const tableProductNameTD = document.createElement('td');
        tableProductNameTD.classList.add('tableProductName');
        const tableProductNameTDText = document.createElement('p');
        tableProductNameTDText.innerText = productListArr.name
        const tableProductNameCheck = document.createElement('button');
        tableProductNameCheck.classList.add('tableProductNameCheck')
        tableProductNameCheck.setAttribute('type', 'button');

        const tdBorderQuantity = document.createElement('td');
        tdBorderQuantity.classList.add('tdBorder');
        tdBorderQuantity.innerText = `${productListArr.quantity} ${productListArr['KG or PC']}`;

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

        
        /*const tableBTNImg = document.createElement('img');
        tableBTNImg.src = "icons8-три-точки-24.png";
        tableBTN.appendChild(tableBTNImg)*/
        
        tableProductNameTD.appendChild(tableProductNameCheck)
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
    console.log(mainCell);

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
            console.log(e)
        }
    
    }

}








