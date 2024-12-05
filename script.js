const headerBig = document.querySelector('#headerBig')
const headerPhone = document.querySelector('#menuPhone')
const menuPhoneOpened = document.querySelector('#menuPhoneOpened')
const menuIcon = document.querySelector('#menuIcon')
const menuClose = document.querySelector('#menuClose')
const searchField = document.querySelector('#searchFieldDiv')
const searchBtn = document.querySelector('#search')

if(window.innerWidth < 800){
    headerBig.style.display = "none";
    headerPhone.style.display = "grid";
    menuPhoneOpened.style.display = "none";
    menuIcon.style.display = "block";
    searchField.style.display = "none";
}
else{
    headerBig.style.display = "grid";
    headerPhone.style.display = "none";
    menuPhoneOpened.style.display = "none";
    menuIcon.style.display = "none";
    
}

menuIcon.onclick = menuButtonClick
menuClose.onclick = menuCloseButton
searchBtn.onclick = searchBtnClick

function menuButtonClick(){
    menuIcon.style.display = "none";
    menuPhoneOpened.style.display = "grid";
}
function searchBtnClick(){
    searchField.style.display = "grid";
    /*searchBtn.style.display = "none";*/
}
function menuCloseButton(){
    menuPhoneOpened.style.display = "none";
    menuIcon.style.display = "block";
    searchField.style.display = "none";
}
