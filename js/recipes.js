$(document).ready(() => {

    // Container Constant
    const recipes_container = document.getElementById('recipes');
    const recipe_container = document.getElementById('recipe');
    const recipes_header = document.getElementById('recipes_header');

    // Render Multiple Products
    render_recipes();
    function render_recipes(){
        $.ajax({
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/recipes.json`,
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
                                <h5 class="px-1 card-title">${recipe.title}</h5>
                                <p class="px-1 text-justify">${recipe.description[0]}</p>
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
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/recipes.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.id == recipe_id);
                console.log(result);
                let html = ``;
                html += `
                <div class="col-12">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 px-0 bg-white">
                                <div class="card p-3 border-0">
                                    <div class="card-body px-0 pt-0">
                                        <h3 class="primary_color">${result[0].title}</h3>
                                        <p class="pt-3 pb-2 card-text text-justify">${result[0].description[0]}</p>
                                    </div>
                                    <img src="${result[0].banner}" alt="" class="w-100 border"/>
                                </div>
                            </div>
                            <div class="col-6 px-0 bg-white">
                                <div class="card border-0">
                                    <div class="card-body d-flex justify-content-center flex-column">
                                        <h5 class="mb-4 primary_color">Priprema:</h5>
                                        <p class="card-text">${result[0].description[1]}</p>
                                        <h5 class="mt-4 primary_color">Sastojci:</h5>
                                        <ul class="list-group list-group-flush">
                                            ${recipes_steps_render(result[0].ingredients)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 px-0 bg-white">
                                <div class="card border-0">
                                    <div class="card-body d-flex justify-content-center flex-column">
                                        <div class="d-flex justify-content-center">
                                            <img style="width: 120px; height: 120px;" src="assets/img/escajg.png" alt=""/>
                                        </div>
                                        <h5 class="mb-4 primary_color">Koraci:</h5>
                                        <ul class="list-group list-group-flush">
                                            ${recipes_steps_render(result[0].steps)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 px-0 bg-white">
                                <div class="card border-0">
                                    <div class="d-flex justify-content-between">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="recipes.html" id="back" class="btn btn-danger"><</a>`;
                // Filling in Content while erasing everything else
                recipes_container.innerHTML = '';
                recipe_container.innerHTML = html;
                recipes_header.style.display = 'none';
                // Render of Steps of Preparation
                function recipes_steps_render(arrays){
                    let html = '';
                    arrays.forEach(function(e){
                        html += `<li class="list-group-item pl-2">${e}</li>`;
                    });
                    return html;
                }
                // Back Button

                
            }
        });
    }

    // Scroll Reveal Effects for Featured Items
    ScrollReveal().clean('#logo');
    ScrollReveal().reveal('#logo', { delay: 800, duration: 700, origin: 'top', distance: '300px' });
    ScrollReveal().clean('.nav-item');
    ScrollReveal().reveal('.nav-item', { interval:200, delay: 1200, duration: 1200, origin: 'top', distance: '200px' });

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