let recipe_api = 'http://localhost:3001/recipes';
let special_api = 'http://localhost:3001/specials';

//Store recipe list to local storage
const fetchRecipeData = () => {
    return fetch(recipe_api)
        .then(response => response.json())
        .then(json => localStorage.setItem('recipe_list', JSON.stringify(json)))
};

//Store special list to local storage
const fetchSpecialData = () => {
    return fetch(special_api)
        .then(response => response.json())
        .then(json => localStorage.setItem('special_list', JSON.stringify(json)))
};

//Render the recipe list to html table
const renderRecipeList = list => {
    let html = '';
    html += '<div class="row">';
    for (let i = 0; i < list.length; i++) {
        html += '<div class="col-md-12">';
        html += '<div class="wrapper">';
        html += '<div class="recipe-list-title">' + list[i].title + '</div>';
        html += '<div class="recipe-list-desc">' + list[i].description + '</div>';
        html += "<button class='btn btn-info' onClick='viewRecipe(" + JSON.stringify(list[i]) + ")'>View</button>" +
            "<button class='btn btn-primary' onClick='selectToUpdateRecipe(" + JSON.stringify(list[i]) + ")'>Update</button>";
        html += '<hr/>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div';
    document.getElementById("recipe_list").innerHTML = html;
};

//Store the recipe uuid to local storage, will be used for update view
const selectToUpdateRecipe = detail => localStorage.setItem('selected_recipe', detail.uuid);

//Validate if the Recipe list is in local storage
(activate  = () => {
    let recipe_list = JSON.parse(localStorage.getItem('recipe_list'));
    let special_list = JSON.parse(localStorage.getItem('special_list'));
    return [
        !recipe_list ? fetchRecipeData() : renderRecipeList(recipe_list),
        !special_list ? fetchSpecialData() : special_list,
    ];
})();