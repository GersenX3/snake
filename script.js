class cuerpo 
{
 constructor (x,y)
 {
    this.imagen = new Image();
    this.imagen.src = "sources/body.png";
    this.x = x;
    this.y = y;
 }
}

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
function dibujarP()//dibuja el perimetro
{
    dibujar(5,5,5,515,10);
    dibujar(0,5,515,5,10);
    dibujar(0,515,515,515,10);
    dibujar(515,0,515,520,10);
    
}

//agregando sprites
var sprites = {up:"sources/vHeadUp.png",down:"sources/vHeadDown.png",left:"sources/body.png",right:"sources/vHeadRight.png",
tailUp:"sources/vTaleUp.png",tailDown:"sources/vTaleDown.png",tailLeft:"sources/vTaleLeft.png",tailRight:"sources/vTaleRight.png",}
var snake = {loaded: false, x:110, y:10, xT:60, yT:10, head:sprites.right, body:[], tail: sprites.tailLeft};
snake.imagenHead = new Image();
snake.imagenHead.src = "sources/body.png";
snake.imagenHead.addEventListener("load",loadedSnake);
snake.imagenTail = new Image();
snake.imagenTail.src = "sources/body.png";
snake.imagenTail.addEventListener("load",loadedSnakeTail);

var manzana = {loaded: false, x:aleatorio(10)*50+10, y:aleatorio(10)*50+10, src:"sources/apple.png"}
manzana.imagen = new Image();
manzana.imagen.src = manzana.src;
snake.imagenTail.addEventListener("load",loadedManzana);
// Funciones lanzadas al cargar imagenes
function loadedSnake()
{
    snake.loaded = true;
    draw()
}
function loadedSnakeTail()
{
    snake.loaded = true;
    draw()
}
function loadedManzana()
{
    manzana.loaded = true;
    draw()
}


function draw()
{
    lienzo.clearRect(0, 0, can.width, can.height);
    dibujarP();
    if(snake.loaded)
    {
        lienzo.drawImage(snake.imagenHead,snake.x,snake.y);
        lienzo.drawImage(snake.imagenTail,snake.xT,snake.yT);
        lienzo.drawImage(manzana.imagen,manzana.x,manzana.y);
        for(var cuer of snake.body)
        {
            lienzo.drawImage(cuer.imagen,cuer.x,cuer.y)
        }
    }
}
draw()

//funcion para mover por teclas
var teclas = {up:38,down:40,left:37, right:39}
var ultimaTecla;
document.addEventListener("keydown",teclaPresionada);
function teclaPresionada(teclaAbajo)
{
    if (teclaAbajo.keyCode == teclas.up)
    {
        if(ultimaTecla == teclas.down)
        {
            ultimaTecla;
        }
        else{
            ultimaTecla = teclas.up
        }
    }
    if (teclaAbajo.keyCode == teclas.down)
    {
        if(ultimaTecla == teclas.up)
        {
            ultimaTecla;
        }
        else{
            ultimaTecla = teclas.down
        }
    }
    if (teclaAbajo.keyCode == teclas.left)
    {
        if(ultimaTecla == teclas.right)
        {
            ultimaTecla;
        }
        else{
            ultimaTecla = teclas.left
        }
    }
    if (teclaAbajo.keyCode == teclas.right)
    {
        if(ultimaTecla == teclas.left)
        {
            ultimaTecla;
        }
        else{
            ultimaTecla = teclas.right
        }
    }
    mover()
}

function mover()
{
    let x = snake.x;
    let y = snake.y;
    let xt;
    let yt;
    if (ultimaTecla == teclas.up)
    {
        snake.tail = sprites.tailDown
        snake.head = sprites.up;
        snake.y -= 50;
        snake.yT = snake.y+50;
        snake.xT = snake.x;
    }
    if (ultimaTecla == teclas.down)
    {
        snake.tail = sprites.tailUp;
        snake.head = sprites.down;
        snake.y += 50;
        snake.yT = snake.y-50;
        snake.xT = snake.x;
    }
    if(ultimaTecla == teclas.left)
    {
        snake.tail = sprites.tailRight
        snake.head = sprites.left;
        snake.x -= 50;
        snake.xT = snake.x+50;
        snake.yT = snake.y;
    }
    if(ultimaTecla == teclas.right)
    {
        snake.tail = sprites.tailLeft
        snake.head = sprites.right;
        snake.x += 50;
        snake.xT = snake.x-50;
        snake.yT = snake.y;
    }
    for(var cuer of snake.body)
    {
        xt = cuer.x;
        yt = cuer.y;
        cuer.x = x;
        cuer.y = y;
        x = xt;
        y = yt;
    }
    snake.imagenHead.src = "sources/body.png";
    snake.imagenTail.src = "sources/body.png";
    if(snake.x == manzana.x && snake.y == manzana.y)
    {
        Score();
        crecer();
        manzana.x =aleatorio(10)*50+10;
        manzana.y =aleatorio(10)*50+10;
    }
    if(snake.x <10  || snake.y < 10 || snake.x>460 || snake.y>460)
    {
        gameOver()
    }
    for(var cuer of snake.body)
    {
        if(snake.x == cuer.x && snake.y == cuer.y)
        {
            gameOver()
        }
    }
    draw();
    if(snake.body.length ==20)
    {
        alert("Ganaste");
    }
    console.log(snake);
}
//funcion game over
function gameOver()
{
    snake.imagenHead.src = "nada";
    snake.imagenTail.src = "nada";    
    parrafo.innerHTML= "You lose";
    tiempo = 5000;
    setTimeout(function(){location.reload()},1000);
}
//Score funcion
var score = 0;
var parrafo = document.getElementById("puntaje");
function Score()
{
    score+=100;
    parrafo.innerHTML = "Score : "+score
}

function aleatorio(max)
{
    var x = parseInt(Math.random()*(max));
    return x
}

//loop
var tiempo = 100;
setTimeout(loop,tiempo);
function loop()
{
    mover();
    setTimeout(loop,tiempo);
}

function crecer()
{
    snake.body.push(new cuerpo(snake.xT,snake.yT));
}