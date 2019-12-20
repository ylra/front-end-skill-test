(function activate() {
    let recipe_list = JSON.parse(localStorage.getItem('recipe_list'));
    selectedRecipe(recipe_list[0]);
})();

function selectedRecipe(details) {
    console.log(details);
    document.getElementById("recipe_detail_title").innerHTML = details.title;
    document.getElementById("recipe_detail_img").src = details.images.medium;
}