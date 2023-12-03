// Seleccionar el contenedor del juego
const contenedorJuego = document.getElementById('snakeGame');

// Tamaño de la cuadrícula y velocidad de la serpiente
const tamañoCuadricula = 20;
const velocidadSerpiente = 100;

// Inicializar la serpiente y la comida
let serpiente = [{ x: 200, y: 200 }];
let comida = { x: 300, y: 300 };
let dx = tamañoCuadricula;
let dy = 0;

document.addEventListener('keydown', cambiarDireccion);

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

// Función para actualizar la posición de la serpiente
function actualizarSerpiente() {
    const cabeza = { x: serpiente[0].x + dx, y: serpiente[0].y + dy };

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        colocarComida();
    } else {
        serpiente.pop();
    }

    serpiente.unshift(cabeza);
}

// Función para colocar la comida en una posición aleatoria
function colocarComida() {
    comida = {
        x: Math.floor(Math.random() * (contenedorJuego.offsetWidth / tamañoCuadricula)) * tamañoCuadricula,
        y: Math.floor(Math.random() * (contenedorJuego.offsetHeight / tamañoCuadricula)) * tamañoCuadricula
    };

    for (let i = 0; i < serpiente.length; i++) {
        if (serpiente[i].x === comida.x && serpiente[i].y === comida.y) {
            colocarComida();
        }
    }
}

// Función para inciar el juego
function iniciarJuego() {
    // Limipiar la serpiente y comida
    serpiente = [{ x: 200, y: 200 }];
    comida = { x: 300, y: 300 };
    dx = tamañoCuadricula;
    dy = 0;

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


// Función para manejar el fin del juego
function finDelJuego() {
    clearInterval(intervaloJuego);
    alert('Fin del Juego');
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
