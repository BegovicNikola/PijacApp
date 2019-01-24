$(document).ready(() => {

    // Container Constant
    const news_container = document.getElementById('news');

    // Render Multiple Products
    render_news();
    function render_news(){
        $.ajax({
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/news.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(news => {
                    html += `
                    <div class="card w-100">
                        <div class="card-body text-justified">
                            <h5 class="card-title primary_color mb-0">${news.title}</h5>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h6 class="card-subtitle secondary_color">${news.subtitle}</h6>
                                <p class="mb-0 secondary_color">${news.date}</p>
                            </div>
                            <p class="card-text">${news.description}</p>
                        </div>
                    </div>`;
                });
                // Filling in Content while erasing everything else
                news_container.innerHTML = html;
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