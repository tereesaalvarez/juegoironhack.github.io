// Seleccionar el contenedor del juego
const contenedorJuego = document.getElementById('snakeGame');

// Tamaño de la cuadrícula y velocidad de la serpiente
const tamañoCuadricula = 20;
const velocidadSerpiente = 100;
const startButton = document.getElementById('startButton');

// Inicializar la serpiente y la comida
let serpiente = [];
let comida = { x: 300, y: 300 };
let dx = tamañoCuadricula;
let dy = 0;
let puntuacion = 0;
let puntuacionMaxima = 0;
let juegoIniciado = false; // Nueva variable para controlar si el juego ha iniciado

startButton.addEventListener('click', function() {
    iniciarJuego();
});

document.addEventListener('keydown', function(evento) {
    if (juegoIniciado) {
        cambiarDireccion(evento);
    }
});
// Funcion para cambiar la dirección de la serpiente
function cambiarDireccion(evento) {
    const IZQUIERDA = 37;
    const DERECHA = 39;
    const ARRIBA = 38;
    const ABAJO = 40;

    if (evento.keyCode === IZQUIERDA && dx === 0) {
        dx = -tamañoCuadricula;
        dy = 0;
    }

    if (evento.keyCode === DERECHA && dx === 0) {
        dx = tamañoCuadricula;
        dy = 0;
    }

    if (evento.keyCode === ARRIBA && dy === 0) {
        dx = 0;
        dy = -tamañoCuadricula;
    }

    if (evento.keyCode === ABAJO && dy === 0) {
        dx = 0;
        dy = tamañoCuadricula;
    }
}

// Función para dibujar la serpiente y la comida en el contenedor
function dibujar() {
    contenedorJuego.innerHTML = '';

    for (let i = 0; i < serpiente.length; i++) {
        const segmentoSerpiente = document.createElement('div');
        segmentoSerpiente.className = 'snake';
        segmentoSerpiente.style.left = serpiente[i].x + 'px';
        segmentoSerpiente.style.top = serpiente[i].y + 'px';
        contenedorJuego.appendChild(segmentoSerpiente);
    }

    const comidaElemento = document.createElement('div');
    comidaElemento.className = 'food';
    comidaElemento.style.left = comida.x + 'px';
    comidaElemento.style.top = comida.y + 'px';
    contenedorJuego.appendChild(comidaElemento);
}


// Función para colocar la comida en una posición aleatoria
function colocarComida() {
    comida = {
        x: Math.floor(Math.random() * (contenedorJuego.offsetWidth / tamañoCuadricula)) * tamañoCuadricula,
        y: Math.floor(Math.random() * (contenedorJuego.offsetHeight / tamañoCuadricula)) * tamañoCuadricula
    };

    incrementarPuntuacion();  // Mueve la función de incrementar la puntuación aquí

    // Agregar un nuevo bloque (cola) a la serpiente
    const nuevaCola = { x: serpiente[serpiente.length - 1].x, y: serpiente[serpiente.length - 1].y };
    serpiente.push(nuevaCola);
}

// Función para inciar el juego
function iniciarJuego() {
    if (!juegoIniciado){
        juegoIniciado = true; // Ahora el juego se inicia
        document.getElementById('instrucciones').style.display = 'none';

        // Ocultar las instrucciones después de 5 segundos (5000 milisegundos)
        setTimeout(function() {
            document.getElementById('instrucciones').style.display = 'none';
        }, 5000); // Ajusta el tiempo según tus preferencias

        // Limipiar la serpiente y comida
        serpiente = [
            { x: 200, y: 200 },
            { x: 180, y: 200 },
            { x: 160, y: 200 }
        ];

        comida = { x: 300, y: 300 };
        dx = tamañoCuadricula;
        dy = 0;

        // Reiniciar la puntuación
        puntuacion = 0;
        actualizarPuntuacion();

        // Reinicar el intervalo del juego
        clearInterval(intervaloJuego);
        intervaloJuego = setInterval(function(){
            actualizarSerpiente();
            dibujar();

            for (let i =1 ; i < serpiente.length; i++){
                if (serpiente[0].x === serpiente[i].x && serpiente[0].y === serpiente[i].y){
                    finDelJuego();
                }
            }
            if (
                serpiente[0].x < 0 || serpiente[0].x >= contenedorJuego.offsetWidth ||
                serpiente[0].y < 0 || serpiente[0].y >= contenedorJuego.offsetHeight
            ) {
                finDelJuego();
            }
        }, velocidadSerpiente);
    }
}

// Función para actualizar la puntuación
function actualizarPuntuacion() {
    document.getElementById('puntuacion').innerText = 'Puntuación: ' + puntuacion;
    document.getElementById('puntuacionMaxima').innerText = 'Puntuación Máxima: ' + puntuacionMaxima;
}

// Función para incrementar la puntuación y manejar la puntuación máxima
function incrementarPuntuacion() {
    puntuacion++;
    if (puntuacion > puntuacionMaxima) {
        puntuacionMaxima = puntuacion;
    }
    actualizarPuntuacion();
}


// Función para manejar el fin del juego
function finDelJuego() {
    clearInterval(intervaloJuego);
    alert('Fin del Juego');
}

// Funcion para cambiar la direccion tactil
function cambiarDireccionTactil(event) {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    const mitadAncho = anchoPantalla / 2;
    const mitadAlto = altoPantalla / 2;

    if (x < mitadAncho && Math.abs(x - mitadAncho) > Math.abs(y - mitadAlto)) {
        // Izquierda
        cambiarDireccion({ keyCode: 37 });
    } else if (x >= mitadAncho && Math.abs(x - mitadAncho) > Math.abs(y - mitadAlto)) {
        // Derecha
        cambiarDireccion({ keyCode: 39 });
    } else if (y < mitadAlto && Math.abs(y - mitadAlto) >= Math.abs(x - mitadAncho)) {
        // Arriba
        cambiarDireccion({ keyCode: 38 });
    } else if (y >= mitadAlto && Math.abs(y - mitadAlto) >= Math.abs(x - mitadAncho)) {
        // Abajo
        cambiarDireccion({ keyCode: 40 });
    }
}

// Función para actualizar la posición de la serpiente
function actualizarSerpiente() {
    const cabeza = { x: serpiente[0].x + dx, y: serpiente[0].y + dy };

    // Verificar si la cabeza alcanza la comida
    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        // Agregar un nuevo bloque (cola) a la serpiente
        const nuevaCola = { x: serpiente[serpiente.length - 1].x, y: serpiente[serpiente.length - 1].y };
        serpiente.push(nuevaCola);

        // Colocar nueva comida
        colocarComida();

        // Incrementar puntuación (si es necesario)
        incrementarPuntuacion();
    } else {
        serpiente.pop();
    }

    serpiente.unshift(cabeza);
}
// Intervalo del juego para actualizar la serpiente y dibujar
let intervaloJuego = setInterval(function () {
    actualizarSerpiente();
    dibujar();

    for (let i = 1; i < serpiente.length; i++) {
        if (serpiente[0].x === serpiente[i].x && serpiente[0].y === serpiente[i].y) {
            finDelJuego();
        }
    }

    if (
        serpiente[0].x < 0 || serpiente[0].x >= contenedorJuego.offsetWidth ||
        serpiente[0].y < 0 || serpiente[0].y >= contenedorJuego.offsetHeight
    ) {
        finDelJuego();
    }
}, velocidadSerpiente);
