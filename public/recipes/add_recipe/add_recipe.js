let date_today = new Date();
let generate_id = numGenerator(10000,100000);
let recipe_api = 'http://localhost:3001/recipes';

let ingredients = [];
let directions = [];

let recipe_form = document.submit_recipe;
let ingredient_form = document.submit_ingredient;
let direction_form = document.submit_direction;

function numGenerator(min,max) {
    return Math.floor((Math.random() * max) + min);
}

function saveRecipe() {
    let recipe_info = {
        uuid: generate_id,
        title: recipe_form.title.value,
        description: recipe_form.description.value,
        servings: recipe_form.servings.value,
        prepTime: recipe_form.prepTime.value,
        cookTime: recipe_form.cookTime.value,
        postDate: date_today,
        editDate: date_today,
        ingredients: ingredients,
        directions: directions,
    };

    saveToServer(recipe_info);
}

function saveToServer(recipe) {
    fetch(recipe_api, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    }).then( () => {
        updateLocalStorage(recipe);
        clearFields();
        document.getElementById("linkButton").click();
    });
}

function updateLocalStorage(new_data) {
    let recipe_list = JSON.parse(localStorage.getItem('recipe_list'));
    if(!recipe_list){
        return fetchRecipeData();
    }

    recipe_list.push(new_data);
    localStorage.setItem('recipe_list', JSON.stringify(recipe_list));
}

function fetchRecipeData() {
    fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(json =>
            localStorage.setItem('recipe_list', JSON.stringify(json))
        )
}

function saveIngredient() {
    ingredients.push({
        uuid: generate_id,
        name: ingredient_form.name.value,
        measurement: ingredient_form.measurement.value,
        amount: ingredient_form.amount.value,
    });

    renderList({
        name: 'ingredients',
        data: ingredients
    });

    document.getElementById("submitIngredient").reset();
}

function saveDirections() {
    directions.push({
        instructions: direction_form.instructions.value,
        optional: direction_form.optional.value
    });

    renderList({
        name: 'directions',
        data: directions
    });

    document.getElementById("submitDirection").reset();
}

function clearFields() {
    document.getElementById("submitForm").reset();
    document.getElementById("submitIngredient").reset();
    document.getElementById("submitDirection").reset();
    ingredients.length = 0;
    directions.length = 0;

    renderList({
        name: 'ingredients',
        data: ingredients
    });

    renderList({
            name: 'directions',
            data: directions
    });
}

function renderList(details) {
    let html = '';
    let comp_name;
    html += '<div class="row">';
    for (let i = 0; i < details.data.length; i++) {
        comp_name = details.data[i].instructions || details.data[i].name;
        html += '<div class="well well-sm">'+comp_name+'</div>';
    }
    html += '</div';
    document.getElementById(details.name).innerHTML = html;
}