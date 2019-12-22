//binding of selected recipe details
const viewRecipe = details => {
    renderIngredients(findSpecials(details.ingredients));
    renderDirections(details.directions);
    document.getElementById("recipe_detail_img").src = details.images.medium;
    for (let key in details) {
        if (key !== 'uuid' && key !== 'ingredients' && key !== 'directions' && key !== 'images') {
            document.getElementById('recipe_detail_' + key).innerHTML = details[key];
        }
    }
};

//inject special if any to ingredients
const findSpecials = ingredients => {
    let get_special = JSON.parse(localStorage.getItem('special_list'));
    return ingredients.filter(ingredient => {
        return get_special.filter(special => {
            if (special.ingredientId === ingredient.uuid) {
                delete special.uuid;
                for (let key in special) {
                    ingredient[key] = special[key]
                }
                return ingredient
            }
        });
    });
};

//render ingredients to html
const renderIngredients = ingredients => {
    let i = 0, html = '';
    let loop_length = ingredients.length;
    for (i; i < loop_length; i++) {
        html += '<tr>';
        html += '<td class="text-capitalize">' + ingredients[i].name + '</td>';
        html += '<td class="recipe-list-desc">Php ' + ingredients[i].amount + '</td>';
        html += '<td class="recipe-list-desc">' + ingredients[i].measurement + '</td>';

        if (ingredients[i].type) {
            html += '<td class="text-capitalize">' +
                "<button class='btn btn-info' data-toggle='modal' data-target='#view-specials' " +
                "onClick='viewSpecials(" + JSON.stringify(ingredients[i]) + ")'>View</button>" +
                '</td>';
        } else {
            html += '<td class="text-capitalize">N/A</td>';
        }

        html += '</tr>';
    }
    document.getElementById("detail_ingredients").innerHTML = html;
};

//render directions to html
const renderDirections = directions => {
    let i = 0, html = '';
    let loop_length = directions.length;
    for (i; i < loop_length; i++) {
        html += '<ul>';
        html += '<li class="text-capitalize">'+'OPTIONAL: '+ directions[i].optional +' - '+ directions[i].instructions + '</li>';
        html += '</ul>';
    }
    document.getElementById("detail_directions").innerHTML = html;
};

//bind specials details to modal
const viewSpecials = specials => {
    for (let key in specials) {
        if (key !== 'name' &&
            key !== 'amount' &&
            key !== 'measurement' &&
            key !== 'uuid' &&
            key !== 'ingredientId') {
            document.getElementById('special_detail_' + key).value = specials[key];
        }
    }
};

//default View for Recipe List
(activateView = () => viewRecipe(JSON.parse(localStorage.getItem('recipe_list'))[0]))();