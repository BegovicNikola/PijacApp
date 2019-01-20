$(document).ready(() => {

    // Container Constant
    const news_container = document.getElementById('news');

    // Render Multiple Products
    render_news();
    function render_news(){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/news.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(news => {
                    html += `
                    <div class="card w-100">
                        <div class="card-body text-justified">
                            <h5 class="card-title">${news.title}</h5>
                            <div class="d-flex justify-content-between align-items-center">
                                <h6 class="card-subtitle">${news.subtitle}</h6>
                                <p class="mb-0">${news.date}</p>
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