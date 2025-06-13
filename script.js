const headerBig = document.querySelector('#headerBig')
const headerPhone = document.querySelector('#menuPhone')
const menuPhoneOpened = document.querySelector('#menuPhoneOpened')
const menuIcon = document.querySelector('#menuIcon')
const menuClose = document.querySelector('#menuClose')
const searchField = document.querySelector('#searchFieldDiv')
const searchBtnPhone = document.querySelector('#search')
const closeSearchBtn = document.getElementById('menuCloseBigDisplay')
const searchImg = document.getElementById('searchImg')



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

//=======================================================

// КОНСТАНТЫ АПИ 

//=======================================================

const RANDOM_MEAL_URL   = 'https://www.themealdb.com/api/json/v1/1/random.php';
const CATEGORY_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const RECIPES_COUNT     = 20;  // сколько рандомных блюд загрузить

//=======================================================

// ХРАНИЛИЩЕ ДАННЫХ 

//=======================================================

let recipeData = []; // сюда положим массив загруженных блюд

const fetchData = async () => {

    try {
        
        const promises = Array.from( {length: RECIPES_COUNT}, () => 
        fetch(RANDOM_MEAL_URL)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
        return res.json()
        })
        .then(json => json.meals[0])
         )
         recipeData = await Promise.all(promises)
        

        
        
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

    recipes.slice(0, 12).forEach((meal) => {
    const newImg = document.createElement("img");
    newImg.setAttribute("alt", "рецепт");
    newImg.src = meal.strMealThumb;

    const link = document.createElement("a");
    link.classList.add("listImg")
    link.target = "_blank";
    link.href = meal.strSource;
    

    link.appendChild(newImg);
    listMenu.appendChild(link);
    })
};

async function categoryNameFetch(recipes) {
  
  try{
    const res = await fetch(CATEGORY_LIST_URL);
    if(!res.ok) throw new Error (`HTTP ${res.status}`);
    const json = await res.json()

   const categoryUl = document.querySelector(".categoryUl");
   const savedData = localStorage.getItem("recipes");

   if(savedData){
    recipes = JSON.parse(savedData);
   }
   else{
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
    json.meals.forEach((meal) => {
      const cat = meal.strCategory

      const newLi = document.createElement("li");
      newLi.textContent = cat;

      const newA = document.createElement("a");
      newA.href = `https://www.themealdb.com/filter.php?c=${encodeURIComponent(cat)}`;
      newA.target = "_blank";
      newA.classList.add("linkCategory");

      categoryUl.appendChild(newA);
      newA.appendChild(newLi);
    })
  }
  
  catch (err) {
    console.error('Ошибка при загрузке категорий:', err);
  }
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
        randomPic.src = recipe[randonIndex].strMealThumb;

        newA.href = recipe[randonIndex].strSource;
        newA.target = "_blank";
    })
}



