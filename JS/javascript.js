/* Variables generales */
var puntuacion = 0;
var dificultad = {};
var dificultadElegida = "";
var nombre = "";
var imagenesTarjetas = {};

/* Inicio del script */
$(document).ready(function () {
    rellenarArrays();
    $('#submit').prop('disabled', true);
    $('#panelDeJuego').hide();
    $("#camponombre").change(function () {
        if ($('#camponombre').length === 0) {
            $('#submit').prop('disabled', true);
        } else {
            $('#submit').prop('disabled', false);
        }
    });

});


/* Inicializar array de imagenes */
function rellenarArrays() {

    imagenesTarjetas.Carpintero = ['IMG/Carpintero/1.jpg'
                        , 'IMG/Carpintero/2.jpg'
                        , 'IMG/Carpintero/3.jpg'
                        , 'IMG/Carpintero/4.jpg'];

    imagenesTarjetas.Cocinero = ['IMG/Cocinero/1.png'
                        , 'IMG/Cocinero/2.jpg'
                        , 'IMG/Cocinero/3.jpg'
                        , 'IMG/Cocinero/4.png'];

    imagenesTarjetas.Pescador = ['IMG/Pescador/1.jpg'
                                 , 'IMG/Pescador/2.jpg'
                                 , 'IMG/Pescador/3.jpg'
                                 , 'IMG/Pescador/4.jpg'];

    imagenesTarjetas.Programador = ['IMG/Programador/1.jpg'
                                    , 'IMG/Programador/2.jpg'
                                    , 'IMG/Programador/3.jpg'
                                    , 'IMG/Programador/4.jpg'];

    dificultad.facil = 4;
    dificultad.medio = 7;
    dificultad.dificil = 9;

}


/* Login */
function empezarJuego() {

    funcionamientoDelJuego();
    $('#panelprincipal').hide();
    nombre = $('#camponombre').val();
    dificultadElegida = $('input[name=dificultad]:checked').val();
    $('#panelDeJuego').show();
    $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);

}


/* Se gestiona el funcionamiento del juego */

function funcionamientoDelJuego() {
    var profesiones = ["Carpintero", "Programador", "Cocinero", "Pescador"];
    var numerodeTarjetas = comprobarDificultad(dificultadElegida);
    var j = 0;

    for (var i = 0; i < numerodeTarjetas; i++) {
        if (j > 3) {j=0}
        shuffle(profesiones);
        var profesionGenerada = profesiones[j];
        var rutaImagen = devolverPropiedadArray(profesionGenerada);
        $('#tarjetas').append('<div id="' + profesionGenerada + i + '" class="ui-widget-content ' + profesionGenerada + '"></div>');
        $('#' + profesionGenerada + i).append('<img id="' + profesionGenerada + i + '" src="' + rutaImagen[j] + '" />');
        j++;
    }

    controlarPuntuacion();

}

/* Controlar puntuacion */
function controlarPuntuacion() {
    $("#tarjetas div").draggable();

    $("#cocinero").droppable({
        accept: ".Cocinero",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            ui.draggable('disable');
        }
    });

    $("#carpintero").droppable({
        accept: ".Carpintero",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            ui.draggable('disable');
        }
    });

    $("#pescador").droppable({
        accept: ".Pescador",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            ui.draggable('disable');
        }
    });

    $("#programador").droppable({
        accept: ".Programador",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            ui.draggable('disable');
        }
    });
}

/* Comprobamos la dificultad que escogio el usuario*/
function comprobarDificultad(dificultadElegida) {
    var numerodetarjetas = 0;
    $.each(dificultad, function (key, value) {
        if (dificultadElegida === key) {
            numerodetarjetas = value;
        }
    });

    return numerodetarjetas;
}

/* Coger imagen de profesion */
function devolverPropiedadArray(profesionGenerada) {
    var arrayImagenes = {};

    switch (profesionGenerada) {
        case 'Programador':
            arrayImagenes = imagenesTarjetas.Programador;
            break;
        case 'Cocinero':
            arrayImagenes = imagenesTarjetas.Cocinero;
            break;
        case 'Carpintero':
            arrayImagenes = imagenesTarjetas.Carpintero;
            break;
        case 'Pescador':
            arrayImagenes = imagenesTarjetas.Pescador;
            break;
    }

    return arrayImagenes;
}


/* Boton terminar */
function terminarJuego() {
    $('#panelprincipal').show();
    nombre = $('#camponombre').val();
    dificultad = $('input[name=dificultad]:checked').val();
    puntuacion = 0;
    $('#panelDeJuego').hide();
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
