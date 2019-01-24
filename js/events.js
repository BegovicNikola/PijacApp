$(document).ready(() => {

    // Container Constant
    const events_container = document.getElementById('events');
    const event_container = document.getElementById('event');
    const events_header = document.getElementById('events_header');

    // Render Multiple Products
    render_events();
    function render_events(){
        $.ajax({
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/events.json`,
            dataType: 'json',
            success: (data) => {
                let html = ``;
                data.forEach(event => {
                    html += `
                    <div class="col-6 mt-4">
                        <div class="card px-3 pt-3">
                            <div class="rounded-top">
                                <img style="height: 250px;" class="card-img-top" src="${event.banner}" alt="${event.title}">
                            </div>
                            <div class="card-body px-0 text-justified">
                                <h5 class="card-title">${event.title}</h5>
                                <span class="events_item w-100 btn primary_background text-white" data-product="${event.id}">Više o ovome...</span>
                            </div>
                        </div>
                    </div>`;
                });
                // Filling in Content while erasing everything else
                events_container.innerHTML = html;
                event_container.innerHTML = '';
                events_header.style.display = 'block';
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
            url: `https://begovicnikola.github.io/PijacaApp/assets/json/events.json`,
            dataType: 'json',
            success: (data) => {
                let result = data.filter(e => e.id == event_id);
                console.log(result);
                let html = ``;
                // result[0].title
                html += `
                <div class="col-12">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 px-0 bg-white">
                                <div class="card p-3 border-0">
                                    <img src="${result[0].banner}" alt="" class="w-100 border card-image-top"/>
                                    <div class="card-body px-0">
                                        <p class="card-text">${result[0].description[0]}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 px-0 bg-white">
                                <div class="card border-0">
                                    <div class="card-body d-flex justify-content-center flex-column">
                                        <p class="card-text primary_color">${result[0].description[1]}</p>
                                        <img class="mb-3 mt-4 mx-auto" style="width: 80px;" src="assets/img/sat.png" alt=""/>
                                        <p class="text-center primary_color">Datum održavanja:<br/>${result[0].date}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 bg-white">
                                <img style="height: 250px;" class="w-100 mb-4" src="${result[0].gallery[0]}" alt=""/>
                                <img style="height: 250px;" class="w-100" src="${result[0].gallery[1]}" alt=""/>
                                <p class="text-left">
                                    <span class="text-uppercase">Organizatori manifestacije</span><br/>
                                    ${result[0].organizers}
                                </p>
                            </div>
                            <div class="col-6 bg-white">
                                <img style="height: 250px;" class="w-100 mb-4" src="${result[0].gallery[2]}" alt=""/>
                                <img style="height: 250px;" class="w-100" src="${result[0].gallery[3]}" alt=""/>
                                <p class="text-right">
                                    <span class="text-uppercase">Kontakt</span><br/>
                                    ${result[0].contact}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="events.html" id="back" class="btn btn-danger"><</a>`;
                // Filling in Content while erasing everything else
                events_container.innerHTML = '';
                event_container.innerHTML = html;
                events_header.style.display = 'none';
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