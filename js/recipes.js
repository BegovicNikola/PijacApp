$(document).ready(() => {

    // Container Constant
    const recipes_container = document.getElementById('recipes');
    const recipe_container = document.getElementById('recipe');

    // Render Multiple Products
    render_recipes();
    function render_recipes(){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/recipes.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(recipe => {
                    html += `
                    <div class="col-6 mt-4">
                        <div class="card p-5">
                            <div class="rounded-top">
                                <img class="card-img-top" src="${recipe.banner}" alt="${recipe.title}">
                            </div>
                            <div class="card-body text-justified">
                                <h5 class="card-title">${recipe.title}</h5>
                                <span class="recipes_item w-100 btn btn-primary" data-product="${recipe.id}">Vise o ovome...</span>
                            </div>
                        </div>
                    </div>`;
                });
                // Filling in Content while erasing everything else
                recipes_container.innerHTML = html;
                recipe_container.innerHTML = '';
                // Replacing Render of Users with a Single User on Click
                var recipe_id;
                $('.recipes_item').click(function(e){
                    recipe_id = e.currentTarget.attributes[1].value;
                    console.log(recipe_id);
                    render_recipe(recipe_id);
                });
            }
        });
    }

    // Render Single Product
    function render_recipe(recipe_id){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/recipes.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.id == recipe_id);
                console.log(result);
                let html = ``;
                html += `
                    <div class="col-12">
                        <img class="w-100" src="${result[0].banner}" alt="${result[0].title}"/>
                    </div>
                    <div class="col-12">
                        <h2>${result[0].title}</h2>
                        <p>${result[0].description}</p>
                        <div class="d-flex flex-wrap">
                            ${recipe_gallery(result[0].gallery)}
                        </div>
                    </div>`;
                // Filling in Content while erasing everything else
                recipes_container.innerHTML = '';
                recipe_container.innerHTML = html;
                // Rendering Gallery
                function recipe_gallery(gallery_array){
                    let html = '';
                    gallery_array.forEach(image => {
                        html += `<img class="border" style="width: 25%;" src="${image}" alt="image" /><img class="border" style="width: 25%;" src="${image}" alt="image" />`;
                    });
                    return html;
                }
            }
        });
    }

});