let recipe_api = 'http://localhost:3001/recipes';

(function activate() {
    let recipe_list = JSON.parse(localStorage.getItem('recipe_list'));

    if(!recipe_list){
        return fetchRecipeData();
    }

    renderRecipeList(recipe_list);
})();

function fetchRecipeData() {
    fetch(recipe_api)
        .then(response => response.json())
        .then(json =>
            localStorage.setItem('recipe_list', JSON.stringify(json))
        )
}

function renderRecipeList(list) {
    let html = '';
    html += '<div class="row">';
    for (let i = 0; i < list.length; i++) {
        html += '<div class="col-md-12">';
        html += '<div class="wrapper">';
        html += '<div class="recipe-list-title">' + list[i].title + '</div>';
        html += '<div class="recipe-list-desc">' + list[i].description + '</div>';
        html += "<button class='btn btn-info' onClick='selectedRecipe(" + JSON.stringify(list[i]) + ")'>View</button>" +
                "<button class='btn btn-primary' onClick='selectUpdateRecipe(" + JSON.stringify(list[i]) + ")'>Update</button>";
        html += '<hr/>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div';
    document.getElementById("recipe_list").innerHTML = html;
}

function selectUpdateRecipe(detail) {
    localStorage.setItem('selected_recipe', detail.uuid)
}