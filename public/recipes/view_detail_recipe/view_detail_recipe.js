//binding of selected recipe details
const viewRecipe = details => {
    details.ingredients = findSpecials(details.ingredients);
    document.getElementById("recipe_detail_img").src = details.images.medium;
    for (let key in details){
        if(key !== 'uuid' && key !== 'ingredients' && key !== 'directions' && key !== 'images'){
            document.getElementById('recipe_detail_'+key).innerHTML = details[key];
        }
    }

    console.log(details.ingredients);
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

//default View for Recipe List
(activateView = () => viewRecipe(JSON.parse(localStorage.getItem('recipe_list'))[5]))();