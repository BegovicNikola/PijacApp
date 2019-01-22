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
                            <div class="card-body text-justified">
                                <h5 class="card-title">${event.title}</h5>
                                <span class="events_item w-100 btn btn-primary" data-product="${event.id}">Više o ovome...</span>
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
                                            <p class="card-text">Posetioci će moći da degustiraju sve vrste staroplaninskih jela,kao i sve darove prirode-krompir, pasulj, sir, borovnice, maline, kupine, lekovito bilje i sokove.
                                            Takođe,u okviru manifestaciji biće  i nadmetanje u starim sportskim disciplinama,ocenjivanje najlepše uređenog štanda, najboljeg jela, banice, najvećeg krompira i najboljih sportista.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 px-0 bg-white">
                                    <div class="card border-0">
                                        <div class="card-body">
                                            <p class="card-text">Ponekad reči nisu dovoljne da bi se opisalo sve čime sela Stare planine raspolažu, zato je najbolje “doći, videti i doživeti”. Od same manifestacije do gotovo netaknute prirode tik iza poslednje krivine na izlazu iz sela, posetiocima je omogućena degustacija jela spramena na tradicionalni način, prema prema brižljivo čuvanim receptima domaćica. Banice, jela od krompira, peglane kobasice, pirotski kačkavalj, kao i voće i povrće uzgajano u Dojkincima, samo su neki od proizvoda koji se mogu naci na ovom sajmu.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 bg-white">
                                    <img style="height: 250px;" class="w-100 mb-4" src="${result[0].gallery[0]}" alt=""/>
                                    <img style="height: 250px;" class="w-100" src="${result[0].gallery[1]}" alt=""/>
                                </div>
                                <div class="col-6 bg-white">
                                    <img style="height: 250px;" class="w-100 mb-4" src="${result[0].gallery[2]}" alt=""/>
                                    <img style="height: 250px;" class="w-100" src="${result[0].gallery[3]}" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>`;
                // Filling in Content while erasing everything else
                events_container.innerHTML = '';
                event_container.innerHTML = html;
                events_header.style.display = 'none';
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