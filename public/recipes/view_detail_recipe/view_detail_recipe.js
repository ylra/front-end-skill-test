//Binding of selected recipe details to html
const viewRecipe = details => {
    document.getElementById("recipe_detail_title").innerHTML = details.title;
    document.getElementById("recipe_detail_img").src = details.images.medium;

    console.log('HIT ME');
};

const findSpecials = id => {

};

//Default View is index 0 of Recipe List
(activate = () => viewRecipe(JSON.parse(localStorage.getItem('recipe_list'))[0]))();