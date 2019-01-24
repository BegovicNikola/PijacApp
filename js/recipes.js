$(document).ready(() => {

    // Container Constant
    const recipes_container = document.getElementById('recipes');
    const recipe_container = document.getElementById('recipe');
    const recipes_header = document.getElementById('recipes_header');

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
                        <div class="card px-3 pt-3">
                            <div class="rounded-top">
                                <img style="height: 340px;" class="card-img-top" src="${recipe.banner}" alt="${recipe.title}">
                            </div>
                            <div class="card-body px-0 text-justified">
                                <h5 class="card-title">${recipe.title}</h5>
                                <span class="recipes_item w-100 btn primary_background text-white" data-product="${recipe.id}">Više o ovome...</span>
                            </div>
                        </div>
                    </div>`;
                });
                // Filling in Content while erasing everything else
                recipes_container.innerHTML = html;
                recipe_container.innerHTML = '';
                recipes_header.style.display = 'block';
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
                    </div>`;
                // Filling in Content while erasing everything else
                recipes_container.innerHTML = '';
                recipe_container.innerHTML = html;
                recipes_header.style.display = 'none';
            }
        });
    }

    $('#cart').click(() => {
        $.MessageBox(`
            <div class="d-flex flex-column justify-content-center text-center">
                <div class="d-flex justify-content-center">
                    <img style="width: 200px; height: 117px;" src="assets/img/logo.png" alt=""/>
                </div>
                <input class="form-control" type="text" placeholder="Korisničko ime..."/>
                <input class="form-control" type="password" placeholder="Lozinka..."/>
                <span style="background-color: #61708F;" class="border-0 btn btn-success">Nastavi</span>
            </div>
        `);
    });

});