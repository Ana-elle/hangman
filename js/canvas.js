'use strict';

/************************** FUNCTIONS **********************************/
function createCanvas(){
	if (!canvas1 || !canvas2 || !canvas3) {
		alert("Impossible de récupérer le canvas");
	} 
	else {
		context1 = canvas1.getContext('2d');
    context2 = canvas2.getContext('2d');
    context3 = canvas3.getContext('2d');
		if (!context1 || !context2 || !context3) {
			alert("Impossible de récupérer le context du canvas");
		}
	}
}

function initializeCanvas(){
  console.log("coucou initialize canvas");
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  context3.clearRect(0, 0, canvas3.width, canvas3.height);

/*reference circle
    context.beginPath();
    context.ellipse(260, 220, 35, 35, 0, 0, 2 * Math.PI);
    context.stroke();
//axis
    context.beginPath();
    context.moveTo(0,220);
    context.lineTo(500,220);
    context.stroke();

    context.beginPath();
    context.moveTo(260,0);
    context.lineTo(260,350);
    context.stroke();*/

  

//center
    context1.fillStyle = "#FFC300";
    context1.strokeStyle="#FFC300";
    context1.beginPath();
    context1.ellipse(260, 220, 50, 50, 0, 0, 2 * Math.PI);
    context1.fill();

//leaf
    context2.strokeStyle="green";
    context2.fillStyle="green";
    context2.lineWidth=7;
    context2.beginPath();
    context2.ellipse(322, 545, 15, 50, Math.PI*1.1, 0, 2 * Math.PI);
    context2.fill();

//stem
    context3.strokeStyle="green";
    context3.fillStyle="green";
    context3.lineWidth=7;
    context3.beginPath();
    context3.moveTo(260,245);
    context3.quadraticCurveTo(260,550,320,620);
    context3.stroke();

  //back petals
    context2.fillStyle = "#900C3F";
    context2.strokeStyle="#900C3F";
    context2.beginPath();
    context2.ellipse(130, 220, 40, 95, Math.PI*0.5, 0, 2 * Math.PI);
    context2.fill();

    context2.beginPath();
    context2.ellipse(220, 97, 40, 95, Math.PI*0.9, 0, 2 * Math.PI);
    context2.fill();

    context2.beginPath();
    context2.ellipse(365, 145, 40, 95, Math.PI*1.3, 0, 2 * Math.PI);
    context2.fill();

    context2.beginPath();
    context2.ellipse(365, 295, 40, 95, Math.PI*1.7, 0, 2 * Math.PI);
    context2.fill();

    context2.beginPath();
    context2.ellipse(220, 345, 40, 95, Math.PI*0.1, 0, 2 * Math.PI);
    context2.fill();
    
  //front petals
    context3.fillStyle = "#C70039";
    context3.strokeStyle= "#C70039";
    context3.beginPath();
    context3.ellipse(156, 143, 40, 95, Math.PI*0.7, 0, 2 * Math.PI);
    context3.fill();

    context3.beginPath();
    context3.ellipse(300, 95, 40, 95, Math.PI*1.1, 0, 2 * Math.PI);
    context3.fill();

    context3.beginPath();
    context3.ellipse(390, 220, 40, 95, Math.PI*1.5, 0, 2 * Math.PI);
    context3.fill();

    context3.beginPath();
    context3.ellipse(300, 345, 40, 95, Math.PI*1.9, 0, 2 * Math.PI);
    context3.fill();

    context3.beginPath();
    context3.ellipse(156, 299, 40, 95, Math.PI*0.3, 0, 2 * Math.PI);
    context3.fill();

}

function drawCanvas(){

	switch (lives) {
  case 10:
  //leaf
    context2.fillStyle="#FEF9EF";
    context2.strokeStyle="#FEF9EF";
    context2.lineWidth=1;
    context2.beginPath();
    context2.ellipse(322, 545, 15, 50, Math.PI*1.1, 0, 2 * Math.PI);
    context2.fill();
    context2.stroke();
		break;

	case 9:
  //back petals
    context2.fillStyle="#FEF9EF";
    context2.strokeStyle="#FEF9EF";
    context2.lineWidth=1;
		context2.beginPath();
    context2.ellipse(130, 220, 40, 95, Math.PI*0.5, 0, 2 * Math.PI);
    context2.fill();
    context2.stroke();
		break;

	case 8:
    context2.beginPath();
    context2.ellipse(220, 97, 40, 95, Math.PI*0.9, 0, 2 * Math.PI);
    context2.fill();
    context2.stroke();
		break;

	case 7:
		context2.beginPath();
    context2.ellipse(365, 145, 40, 95, Math.PI*1.3, 0, 2 * Math.PI);
    context2.fill();
		context2.stroke();
		break;

	case 6:	
		context2.beginPath();
    context2.ellipse(365, 295, 40, 95, Math.PI*1.7, 0, 2 * Math.PI);
    context2.fill();
		context2.stroke();
		break;

	case 5:
		context2.beginPath();
    context2.ellipse(220, 345, 40, 95, Math.PI*0.1, 0, 2 * Math.PI);
    context2.fill();
		context2.stroke();
		break;

	case 4:
  //front petals
		context3.fillStyle="#FEF9EF";
    context3.strokeStyle="#FEF9EF";
    context3.lineWidth=1;
    context3.beginPath();
    context3.ellipse(156, 143, 40, 95, Math.PI*0.7, 0, 2 * Math.PI);
    context3.fill();
		context3.stroke();
		break;

	case 3:
		context3.beginPath();
    context3.ellipse(300, 95, 40, 95, Math.PI*1.1, 0, 2 * Math.PI);
    context3.fill();
		context3.stroke();
		break;

	case 2:
		context3.beginPath();
    context3.ellipse(390, 220, 40, 95, Math.PI*1.5, 0, 2 * Math.PI);
    context3.fill();
		context3.stroke();
		break;

	case 1:
		context3.beginPath();
    context3.ellipse(300, 345, 40, 95, Math.PI*1.9, 0, 2 * Math.PI);
    context3.fill();
		context3.stroke();

//redraw the stem up to the center
    context3.strokeStyle="green";
    context3.fillStyle="green";
    context3.lineWidth=7;
    context3.beginPath();
    context3.moveTo(260,245);
    context3.quadraticCurveTo(260,550,320,620);
    context3.stroke();
    context3.strokeStyle="#FEF9EF";
    context3.fillStyle="#FEF9EF";
    context3.lineWidth=1;
		break;

	case 0:
    context3.fillStyle="#FEF9EF";
    context3.strokeStyle="#FEF9EF";
    context3.lineWidth=1;
		context3.beginPath();
    context3.ellipse(156, 299, 40, 95, Math.PI*0.3, 0, 2 * Math.PI);
    context3.fill();
		context3.stroke();

//sad face
    context1.strokeStyle="black";
    context1.lineWidth="3";
    context1.beginPath();
    context1.arc(240, 205, 10, 0, Math.PI);
    context1.stroke();
    context1.beginPath();
    context1.arc(280, 205, 10, 0, Math.PI);
    context1.stroke();
    context1.beginPath();
    context1.arc(260, 250, 20, Math.PI,0);
    context1.stroke();
		break;
	}
}
