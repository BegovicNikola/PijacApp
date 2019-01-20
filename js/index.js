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

    $('#cart').click(() => {
        $.MessageBox(`
            <div class="d-flex flex-column justify-content-center text-center">
                <p>Korpa</p>
                <span class="btn btn-success" href="files/docs.pdf" download>Kupi</span>
            </div>
        `);
    });
    
});