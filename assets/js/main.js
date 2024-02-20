function obtenerInfo(heroId) {
    $.ajax({
        url: `https://superheroapi.com/api.php/4905856019427443/${heroId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            mostrarCarta(data);
            statsHeroCards(data);
        }
    });
}
function mostrarCarta(hero) {
    let cardHtml = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${hero.image.url}" class="image img-fluid rounded-center">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-start"><span class="fw-bold">Conexiones: </span> ${hero.connections['group-affiliation']}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Publicado por: </span> ${hero.biography.publisher}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Ocupación: </span> ${hero.work.occupation}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Primera Aparición: </span> ${hero.biography['first-appearance']}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Altura: </span>${hero.appearance.height.join("  - ")}</li> 
                            <li class="list-group-item text-start"><span class="fw-bold">Peso: </span>${hero.appearance.weight.join(" - ")}</li> 
                            <li class="list-group-item text-start"><span class="fw-bold">Alianzas: </span>${hero.biography.aliases}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    $('#heroCard').html(cardHtml);
}
function isValidInput(input) {
    return !isNaN(input) && !isNaN(parseInt(input, 10)) && input >= 1 && input <= 731
}
$(document).ready(function (e) {
    $('.btn-buscar').click(function () {
        let heroId = $('#input').val().trim();
        if (isValidInput(heroId)) {
            obtenerInfo(heroId);
            $('#mensaje').html('');
        }else{
            $('#mensaje').html('Dato invalido');
        }
    });
});
function statsHeroCards(hero) {
    let chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder de ${hero.name} `
        },
        data: [{
            type: "pie",
            startAngle: 10,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})",
            dataPoints: [
                { y: hero.powerstats.intelligence, label: "Inteligencia" },
                { y: hero.powerstats.strength, label: "Fuerza" },
                { y: hero.powerstats.speed, label: "Velocidad" },
                { y: hero.powerstats.durability, label: "Durabilidad" },
                { y: hero.powerstats.power, label: "Poder" },
                { y: hero.powerstats.combat, label: "Combate" }
            ]
        }]
    });
    chart.render();
}