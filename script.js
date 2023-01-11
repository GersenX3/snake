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
var spriteSnake = "sources/body.png";
var snake = {loaded: false, x:110, y:10, xT:60, yT:10, body:[]};
snake.imagenHead = new Image();
snake.imagenHead.src = spriteSnake;
snake.imagenHead.addEventListener("load",loadedSnake);
var manzana = {loaded: false, x:aleatorio(10)*50+10, y:aleatorio(10)*50+10, src:"sources/apple.png"}
manzana.imagen = new Image();
manzana.imagen.src = manzana.src;
// Funciones lanzadas al cargar imagenes
function loadedSnake()
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
        lienzo.drawImage(manzana.imagen,manzana.x,manzana.y);
        for(var cuer of snake.body)
        {
            lienzo.drawImage(cuer.imagen,cuer.x,cuer.y)
        }
    }
}
//funcion para mover por teclas
var teclas = {up:38,down:40,left:37, right:39}
var ultimaTecla;
document.addEventListener("keydown",teclaPresionada);
function teclaPresionada(teclaAbajo)
{
    if (teclaAbajo.keyCode == teclas.up)
    {
        if(ultimaTecla == teclas.down)
        {ultimaTecla;}
        else{ultimaTecla = teclas.up}
    }
    if (teclaAbajo.keyCode == teclas.down)
    {
        if(ultimaTecla == teclas.up)
        {ultimaTecla;}
        else{ultimaTecla = teclas.down}
    }
    if (teclaAbajo.keyCode == teclas.left)
    {
        if(ultimaTecla == teclas.right)
        {ultimaTecla;}
        else{ultimaTecla = teclas.left}
    }
    if (teclaAbajo.keyCode == teclas.right)
    {
        if(ultimaTecla == teclas.left)
        {ultimaTecla;}
        else{ultimaTecla = teclas.right}
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
        snake.y -= 50;
        snake.yT = snake.y+50;
        snake.xT = snake.x;
    }
    if (ultimaTecla == teclas.down)
    {
        snake.y += 50;
        snake.yT = snake.y-50;
        snake.xT = snake.x;
    }
    if(ultimaTecla == teclas.left)
    {
        snake.x -= 50;
        snake.xT = snake.x+50;
        snake.yT = snake.y;
    }
    if(ultimaTecla == teclas.right)
    {
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
    if(snake.x == manzana.x && snake.y == manzana.y)
    {
        Score();
        crecer();
        manzana.x =aleatorio(10)*50+10;
        manzana.y =aleatorio(10)*50+10;
    }
    if(snake.x <10  || snake.y < 10 || snake.x>460 || snake.y>460)
    {gameOver()}
    for(var cuer of snake.body)
    {
        if(snake.x == cuer.x && snake.y == cuer.y)
        {gameOver()}
    }
    draw();
    if(snake.body.length ==20)
    {
        alert("Ganaste");
        gameOver();
    }
    console.log(snake);
}
function gameOver()//funcion game over
{
    snake.imagenHead.src = "nada";
    parrafo.innerHTML= "Game Over";
    tiempo = 5000;
    setTimeout(function(){location.reload()},1000);
}
var score = 0;//Score funcion
var parrafo = document.getElementById("puntaje");
function Score()
{score+=100;parrafo.innerHTML = "Score : "+score}
function aleatorio(max)
{var x = parseInt(Math.random()*(max));return x}
var tiempo = 500; // Loop
setTimeout(loop,tiempo);
function loop()
{mover();setTimeout(loop,tiempo)}
function crecer()
{snake.body.push(new cuerpo(snake.xT,snake.yT))}