
//Definición de variables.
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;

var y = 10; 
var v = 0;
var c = 100;
var a = g; 

var velocidad = null;
var altura = null;
var combustible = null;

//Al cargar la página:
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("combustible");

	document.getElementById("btplay").onclick=function(){reanudar();};
	document.getElementById("btpause").onclick=function(){pausar();};
	document.getElementById("about").onclick=function(){mostrar();};
	document.getElementsByClassName("cabout")[0].onclick=function(){esconder();};
	document.getElementById("How").onclick=function(){howto();};
	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("opciones")[0].style.display = "block";
		document.getElementById("hidem").style.display = "inline-block";
		document.getElementById("showm").style.display = "none";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("opciones")[0].style.display = "none";
		document.getElementById("hidem").style.display = "none";
		document.getElementById("showm").style.display = "inline-block";
		start();
	}

	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	start();
}

//Definición de funciones.

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*500);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	y +=v*dt;
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=(-y+60.22).toFixed(0);
	
	if (y<60){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop(); acabar();
	}
}
function acabar(){
	if (v <= 5) {
		setTimeout(ganar, 500);
		function ganar() {
			confirm("Enhorabuena, lo has conseguido!");
			document.onkeyup = null;
			document.onkeydown = null;
			if (r == true) {
				location.reload();
			}
		}
	}else{
		document.onkeydown=null;
		document.onkeyup=null;
		setTimeout(perder, 2000);
		document.getElementById("cohete").href = "https://github.com/NMari2/LunarLanding/blob/master/img/pum.gif";
		function perder() {
			var r = confirm("Has perdido, quieres volver a probar?");
			document.onkeydown=null;
			document.onkeyup=null;
			if (r == true) {
				location.reload();
			}else{
				;
			}
		} ;
	}
}
function motorOn(){
	a=-g;
	document.getElementById("Fire").style.display="block";
	if (timerFuel==null) {
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);}
	if (c<=0){
		motorOff();
		document.getElementById("combustible").innerHTML=0;
	}
}
function motorOff(){
	a=g;
	document.getElementById("Fire").style.display="none";
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(0);	
	if (combustible<=0) {
		document.getElementById("combustible").innerHTML=0;
	}
}
function reanudar() {
	
	document.getElementById("btplay").style.display="none";
	document.getElementById("btpause").style.display="inline-block";
		document.onkeydown = motorOn;
    	document.onkeyup = motorOff;
    	start();
}
function pausar() {
	document.getElementById("btpause").style.display="none";
	document.getElementById("btplay").style.display="inline-block";
		document.onkeydown = null;
    	document.onkeyup = null;
    	stop();
}
function fin() {
	motorOff();
	document.onkeydown =null;
	document.onkeyup =null;
}
function mostrar() {
	pausar();
	document.getElementsByClassName("b")[0].style.display="inline-block";
}
function esconder() {
	document.getElementsByClassName("b")[0].style.display="none";
}
function howto() {
	pausar();
	confirm("Si accedes a la página de instrucciones perderas el progreso, ¿Deseas continuar?");
	if (r == true) {
		window.location= "howto.html";
	}else{
		;
	}
}
