$(document).ready(() => {

    // Constants for Containers 
    const products_container = document.getElementById('products');
    const product_container = document.getElementById('product');

    // Render Multiple Products
    render_products();
    function render_products(){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/products.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(product => {
                    html += `
                        <div class="products_item mb-4 col-sm-4" data-product="${product.name}">
                            <div class="card p-3">
                                <div class="rounded-top">
                                    <img class="card-img-top border" src="assets/img/${product.img}" alt="${product.name}">
                                </div>
                                <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                    <h3 class="mb-0">${product.name}</h3>
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
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/product.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.name == product_name);
                console.log(result);
                let html = ``;
                html += `
                    <div class="col-4">
                        <img class="w-100" src="assets/img/${result[0].img}" alt="${result[0].name}"/>
                    </div>
                    <div class="col-8">
                        <h2>${result[0].name}</h2>
                        <p>${result[0].description}</p>
                    </div>`;
                // Filling in Content while erasing everything else
                products_container.innerHTML = '';
                product_container.innerHTML = html;
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
                url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/products.json`,
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
                            <div class="products_item mb-4 col-sm-4" data-product="${product.name}">
                                <div class="card">
                                    <div class="rounded-top">
                                        <img class="card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                    </div>
                                    <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                        <h3 class="mb-0">${product.name}</h3>
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            </div>`;
                        });
                    }else{
                        data.forEach(product => {
                            html += `
                            <div class="products_item mb-4 col-sm-4" data-product="${product.name}">
                                <div class="card">
                                    <div class="rounded-top">
                                        <img class="card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                    </div>
                                    <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                        <h3 class="mb-0">${product.name}</h3>
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            </div>`;
                        });
                    }
                    // Populating Container
                    product_container.innerHTML = '';
                    products_container.innerHTML = html;
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
                url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/products.json`,
                dataType: 'json',
                success: (data) => {
                    let result = data.filter(product => product.name.startsWith(search_input.toLowerCase()));
                    console.log(result);

                    result.forEach(product => {
                    html += `
                        <div class="products_item mb-4 col-sm-4" data-product="${product.name}">
                            <div class="card">
                                <div class="rounded-top">
                                    <img class="card-img-top" src="assets/img/${product.img}" alt="${product.name}">
                                </div>
                                <div class="card-body rounded-bottom d-flex flex-column align-items-center">
                                    <h3 class="mb-0">${product.name}</h3>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </div>`;
                        product_container.innerHTML = '';
                        products_container.innerHTML = html;
                    });
                }
            });
        }else{
            // Getting all of the products on screen again
            render_products();
        }   
    }

});