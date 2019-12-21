let recipe_api = 'http://localhost:3001/recipes';
let special_api = 'http://localhost:3001/specials';

let ingredientId;
let ingredients = [], directions = [], specials = [];

let recipe_form = document.submit_recipe;
let ingredient_form = document.submit_ingredient;
let direction_form = document.submit_direction;
let special_form = document.submit_special;

//uuid generator for ingredients list
const numGenerator = (min, max) => Math.floor((Math.random() * max) + min);

//post recipe and special details
const saveRecipe = () => {
    let recipe_info = {
        title: recipe_form.title.value,
        description: recipe_form.description.value,
        servings: recipe_form.servings.value,
        prepTime: recipe_form.prepTime.value,
        cookTime: recipe_form.cookTime.value,
        postDate: new Date(),
        editDate: new Date(),
        ingredients,
        directions,
    };

    if (specials.length > 0) {
        specials.map((data) => {
            postSpecialData(data).then(function () {
                updateSpecialLocalStorage(data);
            });
        });
    }

    postRecipeData(recipe_info).then(function () {
        updateRecipeLocalStorage(recipe_info);
        clearFields();
        document.getElementById("saveRecipes").click();
    });
};

//POST request of recipes
const postRecipeData = recipe => {
    return fetch(recipe_api, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    }).then(() => console.log('POST SUCCESS'));
};

//POST request of specials
const postSpecialData = (data) => {
    return fetch(special_api, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => console.log('SPECIAL POST SUCCESS'));
};

//update recipe local storage
const updateRecipeLocalStorage = new_data => {
    let get_list = JSON.parse(localStorage.getItem('recipe_list'));
    if (!get_list) {
        return fetchRecipeData();
    } else {
        get_list.push(new_data);
        localStorage.setItem('recipe_list', JSON.stringify(get_list));
    }
};

//update special local storage
const updateSpecialLocalStorage = new_data => {
    let get_list = JSON.parse(localStorage.getItem('special_list'));
    if (!get_list) {
        console.log('EMPTY SPECIAL');
        return fetchSpecialData();
    } else {
        get_list.push(new_data);
        localStorage.setItem('special_list', JSON.stringify(get_list));
    }
};

//get recipe list from storage
const fetchRecipeData = () => {
    fetch(recipe_api)
        .then(response => response.json())
        .then(json => localStorage.setItem('recipe_list', JSON.stringify(json)))
};

//get special list from storage
const fetchSpecialData = () => {
    fetch(special_api)
        .then(response => response.json())
        .then(json => localStorage.setItem('special_list', JSON.stringify(json)))
};

//ingredients temporary save
const saveIngredient = () => {
    ingredients.push({
        uuid: numGenerator(1000, 100000),
        name: ingredient_form.name.value,
        measurement: ingredient_form.measurement.value,
        amount: ingredient_form.amount.value,
    });

    renderList({
        name: 'ingredients',
        data: ingredients
    });
    document.getElementById("submitIngredient").reset();
};

//directions temporary save
const saveDirections = () => {
    directions.push({
        instructions: direction_form.instructions.value,
        optional: direction_form.optional.value
    });

    renderList({
        name: 'directions',
        data: directions
    });

    document.getElementById("submitDirection").reset();
};

//specials temporary save
const saveSpecials = () => {
    specials.push({
        ingredientId: String(ingredientId),
        type: special_form.type.value,
        title: special_form.title.value,
        geo: special_form.geo.value,
        text: special_form.text.value
    });

    document.getElementById("submitSpecials").reset();
};

//clear forms,arrays and table list
const clearFields = () => {
    document.getElementById("submitForm").reset();
    document.getElementById("submitIngredient").reset();
    document.getElementById("submitDirection").reset();
    ingredients.length = 0;
    directions.length = 0;
    specials.length = 0;

    renderList({
        name: 'ingredients',
        data: ingredients
    });

    renderList({
        name: 'directions',
        data: directions
    });
};

//render list of ingredients and specials
const renderList = details => {
    let i = 0, comp_name, html = '';
    let loop_length = details.data.length;

    html += '<div class="row">';
    for (i; i < loop_length; i++) {
        comp_name = details.data[i].instructions || details.data[i].name;
        html += '<div class="well well-sm">' + comp_name;

        if (details.name === 'ingredients') {
            html += "<button class='btn btn-info float-right' data-toggle='modal' " +
                "data-target='#add-specials' onClick='ingredientId = " + JSON.stringify(details.data[i].uuid) + "'>+ Specials</button>";
        }

        html += '</div>';
    }

    html += '</div';
    document.getElementById(details.name).innerHTML = html;
};