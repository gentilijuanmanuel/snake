document.addEventListener("keydown", dibujarTeclado);
document.addEventListener("touchstart", obtenerCoordenadas);
document.addEventListener("touchmove", obtenerCoordenadas);
var dibujo = document.getElementById("areaDeDibujo");
var lienzo = dibujo.getContext("2d");

var teclas =
{
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

var snake = [];
var longitud;
var cantPuntos;
var xo;
var yo;
var eventoAnterior;
var xPunto;
var yPunto;
var puntaje;
var direccion;
var tiempo;
var pararEjecucion;
var colorSnake = "#5193ef";
var colorPunto = "#464c54";

/*Variables de tamaño*/
xInicio = 100;
yInicio = 100;
rango = 39;
tamanio = 5;
limite = 200;

function comenzarJuego() {
  $('body').addClass('stop-scrolling');
  longitud = 5;
  xo = 0;
  yo = 0;
  tiempo = 0;
  cantPuntos = 0;
  direccion = 'arriba';
  eventoAnterior = teclas.UP;
  puntaje = 0;
  lienzo.clearRect(0, 0, limite, limite);
  iniciarPrograma();
  clearInterval(pararEjecucion);
  pararEjecucion = setInterval(actualizar, 100);
}

function iniciarPrograma()
{
	for(var i = 0; i < longitud; i++)
	{
  		snake[i] = { x: xInicio, y: yInicio + i*5};
      dibujarPunto(colorSnake, snake[i].x, snake[i].y);
	}
	xPunto = aleatorio(0, rango);
	yPunto = aleatorio(0, rango);
	xPunto = xPunto * tamanio;
	yPunto = yPunto * tamanio;
	dibujarPunto(colorPunto, xPunto, yPunto);
}

function aleatorio(min, max)
{
	var resultado;

	resultado = Math.floor(Math.random() * (max - min + 1)) + min;

	return resultado;
}

function dibujarPunto(color, x, y)
{
  lienzo.fillStyle = color;
  lienzo.fillRect(x, y, tamanio, tamanio);
}

function actualizar()
{
	chequearGameOver();
	chequearComer();
	xo = snake[longitud-1].x;
    yo = snake[longitud-1].y;
    for(var i = longitud-1; i > 0; i--)
    {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
	switch(direccion)
	{
		case 'arriba':
			snake[0].y -=tamanio;
			break;
		case 'abajo':
			snake[0].y += tamanio;
			break;
		case 'izquierda':
			snake[0].x -= tamanio;
			break;
		case 'derecha':
			snake[0].x += tamanio;
			break;

	}
    dibujarPunto(colorSnake, snake[0].x, snake[0].y);
    borrarPunto(xo, yo);
    tiempo++;
}

function borrarPunto(x, y)
{
  lienzo.clearRect(x, y, 5, 5);
}

function chequearGameOver()
{
	var estado = 0;

	for(var i = 1; i < longitud; i++)
	{
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
		{
			estado = 1;
		}
	}
	if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x > limite || snake[0].y > limite)
	{
		estado = 1;
	}
	if(estado == 1)
	{
		alert("Game Over! Tu puntaje es: " + puntaje + ". Estuviste jugando por " + tiempo/10 + " segundos.");
    clearInterval(pararEjecucion);
    $('#region-puntajes').show();
    var nombre = prompt("Ingrese su nombre:");
    var tabla = document.getElementById("tabla-puntaje");
    var fila = tabla.insertRow(1);
    var celda1 = fila.insertCell(0);
    var celda2 = fila.insertCell(1);
    var celda3 = fila.insertCell(2);
    if(nombre == "") {
      nombre = "Sin nombre";
    }
    celda1.innerHTML = nombre;
    celda2.innerHTML = puntaje;
    celda3.innerHTML = tiempo/10 + " segundos";
    $('body').removeClass('stop-scrolling');
	}
}

function chequearComer()
{
	if (snake[0].x == xPunto && snake[0].y == yPunto)
	{
		puntaje = puntaje + 5;
		longitud++;
		snake.push({x: -tamanio, y: -tamanio});
		xPunto = aleatorio(0, rango);
		yPunto = aleatorio(0, rango);
		xPunto = xPunto * tamanio;
		yPunto = yPunto * tamanio;
		dibujarPunto(colorPunto, xPunto, yPunto);
	}
}

function dibujarTeclado(evento)
{
  if(evento.keyCode == teclas.UP & eventoAnterior != teclas.DOWN)
  {
  	direccion = 'arriba';
  	eventoAnterior = evento.keyCode;
  }
  if(evento.keyCode == teclas.LEFT & eventoAnterior != teclas.RIGHT)
  {
    direccion = 'izquierda';
  	eventoAnterior = evento.keyCode;
  }
  if(evento.keyCode == teclas.RIGHT & eventoAnterior != teclas.LEFT)
  {
    direccion = 'derecha';
  	eventoAnterior = evento.keyCode;
  }
  if(evento.keyCode == teclas.DOWN & eventoAnterior != teclas.UP)
  {
    direccion = 'abajo';
  	eventoAnterior = evento.keyCode;
  }
}

function obtenerCoordenadas(evento) {
    var touchobj = evento.touches[0] // reference first touch point (ie: first finger)
    var x = parseInt(touchobj.clientX) - dibujo.offsetLeft;
    var y = parseInt(touchobj.clientY) - dibujo.offsetTop;

    var newDirection = {x:0, y:0};
    if (Math.abs(x - snake[0].x) < Math.abs(y - snake[0].y))
    {
      newDirection.x = 0;
      newDirection.y = ((y > snake[0].y) ? 1: -1);
    }
    else
    {
      newDirection.x = ((x > snake[0].x) ? 1: -1);
      newDirection.y = 0;
    }
    if (direction.x != newDirection.x * -1 || direction.y != newDirection.y * -1)
      direction = newDirection;
}
