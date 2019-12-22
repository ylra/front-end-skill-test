let recipe_api = 'http://localhost:3001/recipes';
let special_api = 'http://localhost:3001/specials';

//get list and store to local storage
const fetchData = (req) => {
    return fetch(req.api)
        .then(response => response.json())
        .then(json => localStorage.setItem(req.storage, JSON.stringify(json)))
};

//render the recipe list to html
const renderRecipeList = list => {
    let html = '';
    for (let i = 0; i < list.length; i++) {
        html += '<div class="row list-item">';
        html += '<div class="col-md-7">';
        html += '<div class="recipe-list-title">' + list[i].title + '</div>';
        html += '<div class="recipe-list-desc">' + list[i].description + '</div>';
        html += '</div>';
        html += '<div class="col-md-2">';
        html += "<button class='btn btn-info' onClick='viewRecipe(" + JSON.stringify(list[i]) + ")'>View</button>";
        html += '</div>';
        html += '<div class="col-md-3">';
        html += "<a class='btn btn-primary' href='./recipes/update_recipe/update_recipe.html' " +
                "onClick='selectToUpdateRecipe(" + JSON.stringify(list[i]) + ")'>Update</a>";
        html += '</div>';
        html += '</div>';
    }
    document.getElementById("recipe_list").innerHTML = html;
};

//save uuid to local storage, for update view
const selectToUpdateRecipe = detail => localStorage.setItem('selected_recipe', detail.uuid);

//validate if the recipe/special is in local storage
(activateList  = () => {
    let recipe_list = JSON.parse(localStorage.getItem('recipe_list'));
    let special_list = JSON.parse(localStorage.getItem('special_list'));
    return [
        !recipe_list ? fetchData({api:recipe_api,storage:'recipe_list'}) : renderRecipeList(recipe_list),
        !special_list ? fetchData({api:special_api,storage:'special_list'}) : special_list,
    ];
})();