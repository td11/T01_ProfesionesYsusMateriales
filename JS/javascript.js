/* Variables generales */
var puntuacion = 0;
var dificultad = {};
var dificultadElegida = "";
var nombre = "";
var imagenesTarjetas = {};
var intentos, nombrerecogido, comprobarReinicio = false;

/* Inicio del script */
$(function () {
    if (comprobarReinicio == false) {
        prepararComienzo();
    } else {
        $('#panelprincipal').hide();
    }

    $('#botonTerminar').click(function (event) {
        terminarJuego();
    });

    $('#botonReinicio').click(function (event) {
        reiniciarJuego();
    });

});

function prepararComienzo() {
    rellenarArrays();
    $('#panelDeJuego').hide();
    $('#menuTerminarJuego').hide();
    $('#submit').click(function () {
        nombrerecogido = $('#camponombre').val();
        var nombreparseado = $.trim(nombrerecogido);
        if (nombreparseado != null && nombreparseado != '') {
            empezarJuego();
        }
    });
}


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
    intentos = comprobarDificultad(dificultadElegida);
    $('#panelDeJuego').show();
    $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);

}


/* Se gestiona el funcionamiento del juego */

function funcionamientoDelJuego() {
    var profesiones = ["Carpintero", "Programador", "Cocinero", "Pescador"];
    var numerodeTarjetas = comprobarDificultad(dificultadElegida);
    var j = 0;

    for (var i = 0; i < numerodeTarjetas; i++) {
        if (j > 3) {
            j = 0
        }
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
            comprobarTerminaJuego();
            ui.draggable('disable');
        }
    });

    $("#carpintero").droppable({
        accept: ".Carpintero",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            comprobarTerminaJuego();
            ui.draggable('disable');
        }
    });

    $("#pescador").droppable({
        accept: ".Pescador",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            comprobarTerminaJuego();
            ui.draggable('disable');
        }
    });

    $("#programador").droppable({
        accept: ".Programador",
        drop: function (event, ui) {
            puntuacion++;
            $('#info').text("Nombre: " + nombre + " Dificultad:" + dificultadElegida + " Puntuacion:" + puntuacion);
            comprobarTerminaJuego();
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
    /*$('#panelprincipal').show();
    nombre = $('#camponombre').val();
    dificultad = $('input[name=dificultad]:checked').val();
    puntuacion = 0;
    comprobarReinicio = false;
    $('#menuTerminarJuego').hide();
    $('#panelDeJuego').hide();*/

    location.reload();
}

/* Boton reiniciar */
function reiniciarJuego() {
    $('#menuTerminarJuego').hide();
    puntuacion = 0;
    $('#tarjetas').children().remove();
    comprobarReinicio = true;
    empezarJuego();

}

/* Comprobar que termina */
function comprobarTerminaJuego() {
    //var numerodetarjetas = comprobarDificultad(dificultadElegida);
    var mensajeDeJuego = nombre + ' tiene ' + puntuacion + ' puntos en la dificultad ' + dificultadElegida;
    var info = $('span');
    info.append(mensajeDeJuego);
    switch (dificultadElegida) {
        case 'facil':
            if (puntuacion == 4)
                $('#menuTerminarJuego').show();
            $('#menuTerminarJuego').append(info);
            break;
        case 'medio':
            if (puntuacion == 7)
                $('#menuTerminarJuego').show();
                $('#menuTerminarJuego').append(info);
            break;
        case 'dificil':
            if (puntuacion == 9)
                $('#menuTerminarJuego').show();
                $('#menuTerminarJuego').append(info);
            break;
    }

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
