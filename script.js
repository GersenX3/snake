var can = document.getElementById("canvasH");
var lienzo = can.getContext("2d");
//Dibujar
function dibujar(xInicial,yInicial,xFinal,yFinal,ancho)
{
lienzo.beginPath();
lienzo.moveTo(xInicial,yInicial);
lienzo.lineTo(xFinal,yFinal);
lienzo.strokeStyle = "#112b0f";
lienzo.lineWidth = ancho;
lienzo.stroke();
lienzo.closePath();
}

dibujar(5,5,5,515,10);
dibujar(0,5,515,5,10);
dibujar(0,515,515,515,10);
dibujar(515,0,515,520,10);

//agregando sprites
var sprites = {up:"sources/vHeadUp.png",down:"sources/vHeadDown.png",left:"sources/vHeadLeft.png",right:"sources/vHeadRight.png",
tailUp:"sources/vTaleUp.png",tailDown:"sources/vTaleDown.png",tailLeft:"sources/vTaleLeft.png",tailRight:"sources/vTaleRight.png",}
var snake = {src : sprites.up, loaded: false,};
console.log(snake);
snake.imagen = new Image();
snake.imagen.src = snake.src;
snake.imagen.addEventListener("load",loadedSnake);
console.log(snake);

// Funcionas lanzadas al cargar imagenes
function loadedSnake()
{
    snake.loaded = true;
    console.log(snake)
    draw()
}

function draw()
{
    if(snake.loaded)
    {
        lienzo.drawImage(snake.imagen,235,235)
    }
}
draw()