let recipe_api = 'http://localhost:3001/recipes';

const fetchData = (req) => {
    return fetch(req.api+'/'+req.storage)
        .then(response => response.json())
        .then(json => renderRecipe(json))
};

const renderRecipe = (details) => {
    document.getElementById("update_recipe_title").innerHTML = details.title;
    document.getElementById("update_recipe").innerHTML = JSON.stringify(details);
};


(activateUpdate  = () => {
    let selected_recipe = localStorage.getItem('selected_recipe');
    return [
        fetchData({api:recipe_api,storage:selected_recipe})
    ];
})();