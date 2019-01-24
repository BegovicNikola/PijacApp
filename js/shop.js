$(document).ready(() => {

    // Constants for Containers 
    const products_container = document.getElementById('products');
    const product_container = document.getElementById('product');

    // Render Multiple Products
    render_products();
    function render_products(){
        $.ajax({
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/products.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(product => {
                    html += `
                        <div class="products_item mb-4 col-sm-3" data-product="${product.name}">
                            <div class="card product_card px-3 pt-3">
                                <div class="rounded-top">
                                    <img class="card-img-top border" src="assets/img/${product.img}" alt="${product.name}">
                                </div>
                                <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                    <h6 class="mb-0">${product.name}</h5>
                                    <p class="mb-0">${product.price}</p>
                                </div>
                            </div>
                        </div>`;
                });
                // Filling in Content while erasing everything else
                products_container.innerHTML = html;
                product_container.innerHTML = '';
                // Replacing Render of Users with a Single User on Click
                var product_name = '';
                $('.products_item').click(function(e){
                    product_name = e.currentTarget.attributes[1].value;
                    console.log(product_name);
                    render_product(product_name);
                });
            }
        });
    }

    // Render Single Product
    function render_product(product_name){
        $.ajax({
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/product.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.name == product_name);
                console.log(result);
                let html = ``;
                html += `
                    <div class="col-12">
                        <div class="card p-3">
                            <div class="row">
                                <div class="col-12">
                                    <h4>${result[0].name}</h4>
                                </div>
                                <div class="col-3">
                                    <img class="w-100 border rounded" src="assets/img/${result[0].img}" alt="${result[0].name}"/>
                                </div>
                                <div class="col-9">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Vrsta</th>
                                                <th class="text-center" scope="col">Proizvođač</th>
                                                <th class="text-center" scope="col">Količina</th>
                                                <th class="text-center" scope="col">Cena</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <select class="form-control" id="exampleFormControlSelect1">
                                                        ${type_of_type(result[0].mark)}
                                                    </select>
                                                </th>
                                                <td>
                                                    <select class="form-control" id="exampleFormControlSelect1">
                                                        ${type_of_type(result[0].produced_by)}
                                                    </select>
                                                </td>
                                                <td class="text-center">
                                                    <input id="qu" class="form-control" type="number" placeholder="0" min="0"/>
                                                </td>
                                                <td class="text-center pt-3">${result[0].price}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-center pt-3" scope="row">Ukupno</th>
                                                <td class="text-right pt-3" colspan="2">1234.00</td>
                                                <td>
                                                    <button class="w-100 btn btn-success">Kupi</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-6 mt-3">
                                    <h5 class="text-uppercase my-3">Detaljnije o proizvodu</h5>
                                    <p>${result[0].description}</p>
                                </div>
                                <div class="col-6 mt-3">
                                    <h5 class="text-uppercase my-3">Mesto porekla</h5>
                                    <img class="w-100 rounded border" src="assets/img/mapa.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>`;
                // Filling in Content while erasing everything else
                products_container.innerHTML = '';
                product_container.innerHTML = html;
                // Rendering Types of Product
                function type_of_type(arrays){
                    let html = '';
                    arrays.forEach(function(e){
                        html += `<option>${e}</option>`;
                    });
                    return html;
                }
            }
        });
    }

    // Render Filtered Products
    const checkbox_type = document.querySelectorAll('.checkbox_type');
    let filters = [];
    checkbox_type.forEach(check => {
        filters.push({
            param: check.value,
            checked: check.checked
        }); 
    });

    checkbox_type.forEach(check => {
        check.addEventListener('change', () => {
            // New Array of Filtered Items
            const filter = filters.filter(filter => check.value === filter.param)[0];
            // False to True values for checked filter
            filter.checked = !filter.checked;
      
            $.ajax({
                url: `https://begovicnikola.github.io/PijacaApp/assets/json/products.json`,
                dataType: 'json',
                success: (data) => {

                    let html = ``;
                    let parsedData = [];

                    filters.forEach(filter => {
                        if(filter.checked){
                            let res = data.filter(product => product.type === filter.param);
                            res.forEach(product => {
                                parsedData.push(product);
                            });
                        }
                    });

                    let checkedFilters = filters.filter(filter => filter.checked);

                    if(checkedFilters.length){
                        parsedData.forEach(product => {
                            html += `
                            <div class="products_item mb-4 col-sm-3" data-product="${product.name}">
                                <div class="card product_card px-3 pt-3">
                                    <div class="rounded-top">
                                        <img class="border card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                    </div>
                                    <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                        <h6 class="mb-0">${product.name}</h6>
                                        <p class="mb-0">${product.price}</p>
                                    </div>
                                </div>
                            </div>`;
                        });
                    }else{
                        data.forEach(product => {
                            html += `
                            <div class="products_item mb-4 col-sm-3" data-product="${product.name}">
                                <div class="card product_card px-3 pt-3">
                                    <div class="rounded-top">
                                        <img class="border card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                    </div>
                                    <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                        <h6 class="mb-0">${product.name}</h6>
                                        <p class="mb-0">${product.price}</p>
                                    </div>
                                </div>
                            </div>`;
                        });
                    }
                    // Populating Container
                    product_container.innerHTML = '';
                    products_container.innerHTML = html;
                    // Replacing Render of Users with a Single User on Click
                    var product_name = '';
                    $('.products_item').click(function(e){
                        product_name = e.currentTarget.attributes[1].value;
                        console.log(product_name);
                        render_product(product_name);
                    });
                }
            });
        });
    });

    // Search for a Particular Product
    let search = document.querySelector('#search');
    let search_input = '';

    $('#search').keyup(() => {
        search_input = search.value;
        search_products(search_input);
    });

    const search_products = (search_input) => {
        let html = ``;
        if (search_input.toLowerCase()) {
            $.ajax({
                url: `https://begovicnikola.github.io/PijacaApp/assets/json/products.json`,
                dataType: 'json',
                success: (data) => {
                    let result = data.filter(product => product.name.startsWith(search_input.toLowerCase()));
                    console.log(result);

                    result.forEach(product => {
                    html += `
                        <div class="products_item mb-4 col-sm-3" data-product="${product.name}">
                            <div class="card product_card px-3 pt-3">
                                <div class="rounded-top">
                                    <img class="border card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                </div>
                                <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                    <h5 class="mb-0">${product.name}</h5>
                                    <p class="mb-0">${product.price}</p>
                                </div>
                            </div>
                        </div>`;
                        product_container.innerHTML = '';
                        products_container.innerHTML = html;
                        // Replacing Render of Users with a Single User on Click
                        var product_name = '';
                        $('.products_item').click(function(e){
                            product_name = e.currentTarget.attributes[1].value;
                            console.log(product_name);
                            render_product(product_name);
                        });
                    });
                }
            });
        }else{
            // Getting all of the products on screen again
            render_products();
        }   
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