'use strict';

/*************************** VARIABLE *********************************/



/************************** FUNCTIONS **********************************/
function createCanvas(){
	if (!canvas) {
		alert("Impossible de récupérer le canvas");
	} 
	else {
		context = canvas.getContext('2d');
		if (!context) {
			alert("Impossible de récupérer le context du canvas");
		}
	}
}


function drawCanvas(){
	console.log('coucou');

	switch (lives) {
	case 10://wood
		context.beginPath(); // On démarre un nouveau tracé
		context.lineWidth = "15";
		context.strokeStyle = '#60100d';
		context.moveTo(10, 400); 
		context.lineTo(150, 400);
		context.stroke();
		break;
	case 9:
		context.moveTo(45, 400);
		context.lineTo(45, 50);
		context.stroke();
		break;
	case 8:
		context.lineTo(250, 50);
		context.stroke();
		break;
	case 7:
		context.moveTo(45, 120);
		context.lineTo(120, 50);
		context.stroke();
		break;
	case 6:	//rope
		context.beginPath();
		context.moveTo(247, 58);
		context.lineWidth = "5";
		context.strokeStyle = 'black';
		context.lineTo(247, 100);
		context.stroke();
		break;
	case 5://head
		context.beginPath();
		context.fillStyle = "black";
		context.arc(247, 125, 30, 0, Math.PI * 2);
		context.fill();
		break;
	case 4://body
		context.beginPath();
		context.strokeStyle = "black";
		context.lineCap = 'round';
		context.lineWidth = "15";
		context.moveTo(247, 150);
		context.lineTo(247, 250);
		context.stroke();
		break;
	case 3://left arm
		context.beginPath();
		context.lineWidth = "10";
		context.moveTo(247, 170);
		context.lineTo(180, 200);
		context.stroke();
		break;
	case 2://right arm
		context.beginPath();
		context.moveTo(247, 170);
		context.lineTo(314, 200);
		context.stroke();
		break;
	case 1://left leg
		context.beginPath();
		context.moveTo(247, 250);
		context.lineTo(190, 300);
		context.stroke();
		break;
	case 0://right leg
		context.beginPath();
		context.moveTo(247, 250);
		context.lineTo(304, 300);
		context.stroke();

		context.beginPath();
		context.moveTo(240, 120);
		context.fillStyle = "white";
		context.arc(240, 120, 5, 0, Math.PI * 2);
		context.fill();

		context.beginPath();
		context.moveTo(250, 120);
		context.arc(260, 120, 5, 0, Math.PI * 2);
		context.fill();

		context.beginPath();
		context.moveTo(247, 150);
		context.strokeStyle = 'white';
		context.lineWidth = '5';
		context.arc(247, 200, 15, Math.PI, 2 * Math.PI, false);
		context.stroke();


		break;

	default:
    	context.clearRect(0,0,350,540);
	}
}




/*************************** MAIN CODE ***********************************/
window.addEventListener('DOMContentLoaded', function(){
	
});