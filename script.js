const headerBig = document.querySelector('#headerBig')
const headerPhone = document.querySelector('#menuPhone')
const menuPhoneOpened = document.querySelector('#menuPhoneOpened')
const menuIcon = document.querySelector('#menuIcon')
const menuClose = document.querySelector('#menuClose')
const searchField = document.querySelector('#searchFieldDiv')
const searchBtnPhone = document.querySelector('#search')
const closeSearchBtn = document.getElementById('menuCloseBigDisplay')
const searchImg = document.getElementById('searchImg')
const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian,dessert&number=20"

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

menuIcon.onclick = menuButtonClickSmallDisplays
menuClose.onclick = menuCloseButtonSmallDisplays
searchImg.addEventListener("click", searchBtnClick)

function menuButtonClickSmallDisplays(){
    menuIcon.style.display = "none";
    menuPhoneOpened.style.display = "grid";
}

function menuCloseButtonSmallDisplays(){
    menuPhoneOpened.style.display = "none";
    menuIcon.style.display = "block";
    searchField.style.display = "none";
}

function searchBtnClick(){
    const searchDiv = document.getElementById('searchDiv');
    searchDiv.style.display = "flex";
    searchImg.style.display = "none";
    /*searchBtn.style.display = "none";*/
}
    
closeSearchBtn.addEventListener("click", () => {
    const searchDiv = document.getElementById('searchDiv')
    searchDiv.style.display = "none";
    searchImg.style.display = "flex";
});

let recipeData = null;

const fetchData = async () => {

    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "fce02e8d37msh974938717a83848p1f571djsn14117f60c9f0"
          }
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        recipeData = data.recipes;
        //console.log(recipeData);
        listImgFetch(recipeData);
        categoryNameFetch(recipeData);
      } 

    catch (error) {
        console.error("Ошибка при получении рецепта:", error);
    }
};

document.addEventListener("DOMContentLoaded", fetchData);

const listImgFetch = (recipeData) => {
  const savedData = localStorage.getItem("recipeData");

  if(savedData){
    recipeData = JSON.parse(savedData);
    console.log("Загружено: ", recipeData);
    showImages(recipeData);
  }

  else{
    localStorage.setItem("recipeData", JSON.stringify(recipeData));
    showImages(recipeData);
  }
};

const showImages = (recipes) => {
    const listImgArr = Array.from(document.querySelectorAll('.listImg'));
    recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes );
    
    listImgArr.forEach((img, index) => {
        if (recipes[index]) {
          img.src = recipes[index].image;
          console.log(`Index: ${index}; Likes: ${recipes[index].aggregateLikes};`);
        }
      })
};

const categoryNameFetch = (recipes) => {

   const categoryUl = document.querySelector(".categoryUl");
   for (let i = 1; i <= 20; i++){
   const newLi = document.createElement("li");
   categoryUl.appendChild(newLi);
   }
   const alLi = categoryUl.querySelectorAll("li")
   alLi.forEach((li, index) => {

    if(recipes[index]){
        li.textContent = recipes[index].title;
        //console.log(recipes[index].title)
    }

   })

   
   
   
   
    /*const recipeTitle = recipes.title;
    console.log(recipeTitle);*/

}



