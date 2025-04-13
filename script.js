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
        randomRecipe(recipeData)
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
    //console.log("Загружено: ", recipeData);
    showImages(recipeData);
  }

  else{
    localStorage.setItem("recipeData", JSON.stringify(recipeData));
    showImages(recipeData);
  }
};

const showImages = (recipes) => {
    const listMenu = document.querySelector(".listMenu")

    const sortedLikes = recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
    recipes.slice(0, 12).forEach((img, sortedLikes) => {
    const newImg = document.createElement("img");
    newImg.setAttribute("alt", "рецепт");
    newImg.src = recipes[sortedLikes].image;

    const link = document.createElement("a");
    link.classList.add("listImg")
    link.target = "_blank";
    link.href = recipes[sortedLikes].sourceUrl;
    

    link.appendChild(newImg);
    listMenu.appendChild(link);
    })
};

const categoryNameFetch = (recipes) => {

   const categoryUl = document.querySelector(".categoryUl");
   const savedData = localStorage.getItem("recipes");

   if(savedData){
    recipes = JSON.parse(savedData);
   }
   else{
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    recipes.slice(0, 20).forEach((recipes) => {
      const newLi = document.createElement("li");
      newLi.textContent = recipes.title;

      const newA = document.createElement("a");
      newA.href = recipes.sourceUrl;
      newA.target = "_blank";
      newA.classList.add("linkCategory");

      categoryUl.appendChild(newA);
      newA.appendChild(newLi);
    })
    //console.log(Array.isArray(recipes));
    
  };

const randomRecipe = (recipe) => {
    const randomPicDiv = document.querySelector(".randomPicDiv");
    const randomBtn = document.getElementById("randomButton");
    const randomPic = document.querySelector(".randomPic");
    const newA = document.createElement("a");

    newA.appendChild(randomPic);
    randomPicDiv.appendChild(newA)
    
    randomBtn.addEventListener("click", () => {
        const randonIndex = Math.floor(Math.random()*recipe.length);
        randomPic.src = recipe[randonIndex].image;

        newA.href = recipe[randonIndex].sourceUrl;
        newA.target = "_blank";
    })
}



