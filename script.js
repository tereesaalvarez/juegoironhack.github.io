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