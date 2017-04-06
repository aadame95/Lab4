//Works on Opera
var size = 9;
var check = false;
var step = false;
var answer	= true;
var warning = false;
var situation = false;
var sequence = false;
var announcement;
var i;
var j;
var statVal = undefined;
var newItem = "";
var item = false;
var Attack = "Attack";
var Avoid = "Avoid";
var Up = "Up";
var Down = "Down";
var Left = "Left";
var Right = "Right";
var array = [	["W","W","W","W","W","W","W","W","W","W"], ["W","P1",	,	,"W",	,	,	,"C","W"],
				["W","C","W",	,	,	,	,"W","C","W"], ["W",	,	,	,"W",	,	,"C",	,"W"], 
				["W", 	,	,	,	,"W",	,	,	,"W"], ["W",	,	,"W","W","W",	,	,	,"W"], 
				["W", 	,	,	,"W",	,	,	,	,"W"], ["W", 	,"W", 	,	,	,	,"W","C","W"], 
				["W","C",	, 	,"W",	,	,	,"P2","W"], ["W","W","W","W","W","W","W","W","W","W"]];

var text = "<style>	.board {border-style: solid;" + 
			"margin: auto;" +
			"border-color: black;" +
			"border-width: 1px;" +	
			"text-align: center;"+
			"width: 250px;}"	+
			".container {"+
			"text-align: center; " +
			"border-style: solid;" +
			"border-width: 1px;" +
			"margin-left: 450px;"+
			"margin-right: 450px;"+
			"border-color: black;}" +			
			".horizontal{"+
			"display: inline; " +
			"}</style>";
			

var adventurer = {
		health: 10,
		attack: 2,
		spawnX: Math.floor(Math.random()*8) + 1,
		spawnY: Math.floor(Math.random()*8) + 1,
		heroPouch: []
	};

var boardGame = {	
	monster: 'Boar',
	attack: 1,
	healthPack: 2,
	healthPoints:10,

	battle: function(a, b, action){
			var stand = action;
			console.log(stand);
			switch(stand){
			case "Attack":
				boardGame.healthPoints = boardGame.healthPoints - adventurer.attack;
				adventurer.health = adventurer.health - boardGame.attack;
					if(adventurer.health <= 0){
						announcement = "Oh no you have died!";
						main = true;
						break;
					}
					else if(boardGame.healthPoints <= 0){
						announcement = "Congratulations!<br/> You killed the " + boardGame.monster + 
							".<br/>Your reward is " + boardGame.healthPack+ " hp back.";
						adventurer.health = adventurer.health + boardGame.healthPack;
						array[a][b] = undefined;
						sequence = false;
						break;
					}else
						break;
			case "Avoid":
				sequence = false;
				break;
			}
			display();
		}
	};

var goal = {
		goalX: Math.floor(Math.random() * 8) + 1,
		goalY: Math.floor(Math.random() * 8) + 1,
		gLocation: false
	};

//randomly sets goal
while (goal.gLocation !== true){
		for(var i = 1; i < size; i ++){
			for(var j = 1; j < size; j++){
				if(i == goal.goalY && j == goal.goalX){
					if(	array[i][j] != "W" 	||
						array[i][j] != "C" 	||
						array[i][j] != "P1" ||
						array[i][j] != "P2" ){
						if(array[i][j] === undefined){
							array[i][j] = "G";
							goal.gLocation = true;
						}
						else{
							goal.goalY = Math.floor(Math.random()* 8) + 1;
							goal.goalX = Math.floor(Math.random()* 8) + 1;
						}
					}				
				}
			}
		}
	}

//randomly sets spawn
while(check !== true){
		for(var i = 1; i < size; i++){
			for(var j = 1; j < size; j++){
				if(i == adventurer.spawnY && j == adventurer.spawnX){
					if(	array[i][j] != "W" 	||
						array[i][j] != "C" 	||
						array[i][j] != "P1" ||
						array[i][j] != "P2" ||
						array[i][j] != "G" ){
						if(array[i][j] === undefined){
							array[i][j] = "S";
							check = true;
						}
						else{
							adventurer.spawnY = Math.floor(Math.random()* 8) + 1;
							adventurer.spawnX = Math.floor(Math.random()* 8) + 1;
						}
					}
				}	
			}
		}
	}

function display (){
		document.write(text);
		document.write("<body>");
		document.write("<h1 style = 'text-align: center;'>Let Play!</h1>");
		document.write("<table class = 'board'>");
		for(var i = 1; i < size; i++){
			document.write("<tr>");				
			for(var j = 1; j < size; j++){
				if((i == adventurer.spawnY &&  j == adventurer.spawnX)){
					if(array[i][j] === undefined || array[i][j] == "S") {
						array[i][j] = "S";
						document.write("<td class = 'board'>" + array[i][j] + "</td>");
					}
				}	
				else if(array[i][j] == "W"|| array[i][j] == "C"|| 
						array[i][j] == "G"|| array[i][j] == "P1"|| 
						array[i][j] == "P2" || array[i][j] === undefined)
						document.write("<td class = 'board'>" + "-" + "</td>");
				else		
					document.write("<td class = 'board'>" + array[i][j] + "</td>");
			}
			document.write("</tr>");
		}
		document.write("</table></br>");	
		//invalid move warning
		if(warning === true){
			document.write("<p style = 'text-align: center; color:red;'>You can't go that way!</p>");
			warning = false;
		}
		//item pouch
		if(item === true){
			document.write("<p style = 'text-align: center; color:blue;'>Congrats you attained Item " + newItem + "!</p>");
			item  = false;
			newItem = "";
		}
		//Win or found goal
		if(statVal === true){
			document.write("<p style = 'text-align: center; color:green;'>You found the goal!</p>");
			statVal  = true;
		}
		if(statVal === false){
			document.write("<p style = 'text-align: center; color:green;'>You have found the exit but don't have the both prizes.</p>");
			statVal  = undefined;
		}
		//battle controls
		if(sequence === true){

			document.write("<div class = 'container'>");
			
			document.write("<h3>Oh no a monster is up ahead!</h3>");
			document.write("<h3>Hero Health: " + adventurer.health + "</h3>");
			document.write("<h3> " + boardGame.monster + " Health: " + boardGame.healthPoints + "</h3>");
			document.write("<p>Pouch: " + adventurer.heroPouch + "</p>");

			document.write("<div class = 'horizontal'>");
			document.write("<button onclick='$(document).ready(boardGame.battle(i, j, Attack));'>Attack</button></body>");
			document.write("<button onclick='$(document).ready(boardGame.battle(i, j, Avoid));'>Avoid</button> ");
			document.write("</div>");
			
			document.write("</div>");

		}
		else if(statVal === true && (adventurer.heroPouch.includes("P1") === true && adventurer.heroPouch.includes("P2") === true)){
			document.write("<div class = 'container'>");
			
			document.write("<h3>Congratulations you win the game <br/> to play again refresh page!</h3>");
			
			document.write("</div>");
		}
		//controls
		else{
			
			document.write("<div class = 'container'>");
			document.write("<h3>Health:" + adventurer.health + "</h3>");
			document.write("<p>Pouch:" + adventurer.heroPouch + "</p>");

			if(announcement != undefined){
				document.write("<h3>" + announcement + "</h3>");
				announcement = undefined;
			}

			document.write("<div class = 'up'>");
			document.write("<button onclick='$(document).ready(play(false, Up));'>^</button> </body>");
			document.write("</div>");

			document.write("<div class = 'horizontal'>");
			document.write("<button onclick='$(document).ready(play(false, Left));'><</button> </body>");
			document.write("<button onclick='$(document).ready(play(false, Right));'>></button> </body>");
			document.write("</div>");

			document.write("<div class = 'down'>");			
			document.write("<button onclick='$(document).ready(play(false, Down));'>v</button> </body>");
			document.write("</div>");
			
			document.write("</div>");
		}
	};


function prize(a, b){
		if(adventurer.heroPouch.includes("P1") === false || adventurer.heroPouch.includes("P2") === false){
			adventurer.heroPouch.push(array[a][b]);
			newItem = array[a][b];
			item = true;
			array[a][b] = "S";
		}
	};

function win (a,b){
		if(adventurer.heroPouch.includes("P1") === true && adventurer.heroPouch.includes("P2") === true){
			array[a][b] = "S";
			statVal = true;
			return true;
		}
		else{
			statVal  = false;
			array[a][b] = "G";
			return false;
		}
	};

function play(main, move){
	//Set and checks direction
		do{
			var direction = move;
			switch(direction){
				case "Up":
					if(array[adventurer.spawnY - 1][adventurer.spawnX] == "W"){
						warning = true;
						main = true;
						break;
					}else if(array[adventurer.spawnY - 1][adventurer.spawnX] == "P1" || array[adventurer.spawnY - 1][adventurer.spawnX] == "P2"){
						$(document).ready(prize(adventurer.spawnY - 1, adventurer.spawnX));
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY - 1;
						break;
					}else if(array[adventurer.spawnY - 1][adventurer.spawnX] == "C"){
						i = adventurer.spawnY-1;
						j = adventurer.spawnX;
						sequence = true;
						break;
					}else if(array[adventurer.spawnY - 1][adventurer.spawnX] == "G"){
						if($(document).ready(win(adventurer.spawnY - 1,adventurer.spawnX)) === true){
							main = true;
							array[adventurer.spawnY][adventurer.spawnX] = "*";
							adventurer.spawnY = adventurer.spawnY - 1;
							break;
						}break;
					}else if(array[adventurer.spawnY - 1][adventurer.spawnX] == "*"){
						array[adventurer.spawnY - 1][adventurer.spawnX] = "S";
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY - 1;
						break;
					}else
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY - 1;		
						step = true;
						boardGame.healthPoints = 10;
						break;

				case "Down":
					if(array[adventurer.spawnY + 1][adventurer.spawnX] == "W"){
						warning = true;
						main = true;
						break;
					}else if(array[adventurer.spawnY + 1][adventurer.spawnX] == "P1" || array[adventurer.spawnY + 1][adventurer.spawnX] == "P2"){
						$(document).ready(prize(adventurer.spawnY + 1, adventurer.spawnX));
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY + 1;
						break;
					}else if(array[adventurer.spawnY + 1][adventurer.spawnX] == "C"){
						i = adventurer.spawnY + 1;
						j = adventurer.spawnX;
						sequence = true;
						break;
					}else if(array[adventurer.spawnY + 1][adventurer.spawnX] == "G"){
						if($(document).ready(win(adventurer.spawnY + 1,adventurer.spawnX)) === true){
							main = true;
							array[adventurer.spawnY][adventurer.spawnX] = "*";
							adventurer.spawnY = adventurer.spawnY + 1;
							break;
						}break;
					}else if(array[adventurer.spawnY + 1][adventurer.spawnX] == "*"){
						array[adventurer.spawnY + 1][adventurer.spawnX] = "S";
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY + 1;
						break;
					}else 
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnY = adventurer.spawnY + 1;		
						step = true;
						boardGame.healthPoints = 10;
						break;

				case "Right":
					if(array[adventurer.spawnY][adventurer.spawnX + 1] == "W"){
						warning = true;
						main = true;
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX + 1] == "P1" || array[adventurer.spawnY][adventurer.spawnX + 1] == "P2"){
						$(document).ready(prize(adventurer.spawnY, adventurer.spawnX + 1));
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX + 1;
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX + 1] == "C"){
						i = adventurer.spawnY;
						j = adventurer.spawnX + 1;
						sequence = true;						
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX + 1] == "G"){
						if($(document).ready(win(adventurer.spawnY,adventurer.spawnX + 1) === true)){
							main = true;
							array[adventurer.spawnY][adventurer.spawnX] = "*";
							adventurer.spawnX = adventurer.spawnX + 1;
							break;
						}break;
					}else if(array[adventurer.spawnY][adventurer.spawnX + 1] == "*"){
						array[adventurer.spawnY][adventurer.spawnX + 1] = "S";
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX + 1;
						break;
					}else 
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX + 1;		
						step = true;
						boardGame.healthPoints = 10;
						break;

				case "Left":
					if(array[adventurer.spawnY][adventurer.spawnX - 1] == "W"){
						warning = true;
						main = true;
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX - 1] == "P1" || array[adventurer.spawnY][adventurer.spawnX - 1] == "P2"){
						$(document).ready(prize(adventurer.spawnY, adventurer.spawnX - 1));
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX - 1;
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX - 1] == "C"){
						i = adventurer.spawnY;
						j = adventurer.spawnX -1;
						sequence = true;
						break;
					}else if(array[adventurer.spawnY][adventurer.spawnX - 1] == "G"){
						if($(document).ready(win(adventurer.spawnY,adventurer.spawnX - 1)) === true){
							main = true;
							array[adventurer.spawnY][adventurer.spawnX] = "*";
							adventurer.spawnX = adventurer.spawnX - 1;
							break;
						}break;
					}else if(array[adventurer.spawnY][adventurer.spawnX - 1] == "*"){
						array[adventurer.spawnY][adventurer.spawnX - 1] = "S";
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX - 1;
						break;
					}else 
						array[adventurer.spawnY][adventurer.spawnX] = "*";
						adventurer.spawnX = adventurer.spawnX - 1;		
						step = true;
						boardGame.healthPoints = 10;
						break;
			}
		}while(step === false);

	$(document).ready(display);
};

$(document).ready(display);

