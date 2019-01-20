$(document).ready(() => {

    // Container Constant
    const events_container = document.getElementById('events');
    const event_container = document.getElementById('event');

    // Render Multiple Products
    render_events();
    function render_events(){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/events.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(event => {
                    html += `
                    <div class="col-6 mt-4">
                        <div class="card p-5">
                            <div class="rounded-top">
                                <img class="card-img-top" src="${event.banner}" alt="${event.title}">
                            </div>
                            <div class="card-body text-justified">
                                <h5 class="card-title">${event.title}</h5>
                                <span class="events_item w-100 btn btn-primary" data-product="${event.id}">Vise o ovome...</span>
                            </div>
                        </div>
                    </div>`;
                });
                // Filling in Content while erasing everything else
                events_container.innerHTML = html;
                event_container.innerHTML = '';
                // Replacing Render of Users with a Single User on Click
                var event_id;
                $('.events_item').click(function(e){
                    event_id = e.currentTarget.attributes[1].value;
                    console.log(event_id);
                    render_event(event_id);
                });
            }
        });
    }

    // Render Single Product
    function render_event(event_id){
        $.ajax({
            url: `http://www.int-pg.guidanceguide.com/MarketApp/assets/json/events.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.id == event_id);
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
                            ${event_gallery(result[0].gallery)}
                        </div>
                    </div>`;
                // Filling in Content while erasing everything else
                events_container.innerHTML = '';
                event_container.innerHTML = html;
                // Rendering Gallery
                function event_gallery(gallery_array){
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