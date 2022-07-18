var can = document.getElementById("canvasH");
var lienzo = can.getContext("2d");

//Dibujar
function dibujar(xInicial,yInicial,xFinal,yFinal,ancho)
{
lienzo.beginPath();
lienzo.moveTo(xInicial,yInicial);
lienzo.lineTo(xFinal,yFinal);
lienzo.strokeStyle = "darkgreen";
lienzo.lineWidth = ancho;
lienzo.stroke();
lienzo.closePath();
}

dibujar(5,5,5,515,10);
dibujar(0,5,515,5,10);
dibujar(0,515,515,515,10);
dibujar(515,0,515,520,10);