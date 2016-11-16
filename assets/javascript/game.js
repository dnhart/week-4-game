//initial variables
//creature count so we know when we have defeated eveyone
var creatureDef = 0;
var playerSet = false;
var opponentSet=false;
var player = "";
var attacker ="";
var clickCounter = 0;


//new game button - only shows at win/lose
var resetButton = $("<div class='panel-footer'><button class='btn btn-default' id='reset'>New Game</button></div>");

// Creature list
var creatureList = {
	 elfWizard: ["Elf Wizard", 97, 5, 12],
	 dragonSorc: ["Dragonborn Sorcerer", 110, 5, 8],
	 dwarfCleric: ["Dwarf Cleric", 105, 7, 5],
	 humanPaladin:["Human Paladin", 120, 6, 6],
	 humanDruid: ["Human Druid", 130, 4, 11]
};

//displays inital board setup - characters with initial values, etc.
function setup(){

$.each(creatureList, function(key, value) {
//for (var i=0; i<creatureList.length; i++){
	var creatureBox=$("#creatureBox");

	//var creatureId= creatureList.creatureList[i];
	  var creatureId = key;
	  var creatureName= value[0];
	  var creatureHP = value[1];
	var newDiv= $("<div class='panel panel-default creatureLink' id='" +creatureId +  "' value='" +creatureId+"'><div class='panel-body'><img src='assets/images/" + creatureId+".jpg' class='img-responsive' alt='"+creatureName+"' /></div><div class='panel-footer'><h3>"+creatureName+"</h3><p class='"+creatureId+"hp'>Hit Points = "+creatureHP+"</p></div>");

	creatureBox.append(newDiv);


});
};

//setup the board
setup();
$(".creatureLink").on("click", setupPlayer );
//on.click the creatureLink, check to see if attacker has been made, if not, make creature and assign it to attacker
 
function setupPlayer() {
	var self = this.attributes[1].value; 
		//var creatureId = key;
	  	//var creatureName= value[0];
	  	//var creatureHP = value[1];


	console.log(self);
	 
	if(!playerSet){
		//set character as the player's character
		player =self;
		console.log(player);
		//switch the boolean check to true
		playerSet = true;

		//change instructions
		$( "#creatureHeading" ).text( "Choose your first opponent.");

		//move the character to the attackerBox
		var creatureId = "#"+self;
		$(creatureId).appendTo("#attackerHolder");
		$("p."+self+"hp").addClass( "attacker" );



	
	//function to make the creatures
		var nameImport = creatureList[self][[0]];
		var hpImport = creatureList[self][[1]];
		var attImport = creatureList[self][[2]];
		var counterImport = creatureList[self][[3]];

		attacker = new creature (nameImport, hpImport, attImport, counterImport); 

	
	
} else if (!opponentSet) {
	if (player === self) {
		alert("You cannot fight yourself.");
		return;
	} else {

	//assign as defender
		//set character as the opponent's character
		opponent =self;
		console.log(opponent);

		//change instructions
		$( "#creatureHeading" ).text( "Click Attack to fight your opponent.");

	//move the character to the opponentBox
		var creatureId = "#"+self;
		$(creatureId).appendTo("#opponentBox");
		$("p."+self+"hp").addClass( "defender" );

	//function to make the creatures
		var nameImport = creatureList[self][[0]];
		var hpImport = creatureList[self][[1]];
		var attImport = creatureList[self][[2]];
		var counterImport = creatureList[self][[3]];

		defender = new creature (nameImport, hpImport, attImport, counterImport); 
		
		//switch the boolean check to true
		opponentSet = true;

		//code for attack button here
		var attackButton = $("<div id='attackButton' class='panel panel-default'><div class='panel-heading' ><button class='btn btn-default' id='attack'>ATTACK!</button></div> <div class='panel-body'><p id='attackMessage'</p></div></div>");


		$("#attackElements").html(attackButton);

		$("#attack").on("click", attack ); 


//$("#attackerButton").click(function(){
    //$(this).trigger('attack');





};
  
} else {
	alert("You already have an opponent.");
};

}; //end onclick creatureLink



// creature template
function creature (name, hp, att, counter) {
		this.name = name;
		this.hp = hp;
		this.att= att;
		this.counter = counter;
};

function attack(){

	    //attacker strikes at the defender
			clickCounter++
			defender.hp = defender.hp - (attacker.att * clickCounter);
			
			//defender counters
			attacker.hp = attacker.hp - defender.counter;



		checkDefender();

};


//Is the defender still alive?
function checkDefender() {
		
	//update hp
		$("p.defender").text("Hit Points = "+defender.hp);
		$("p.attacker").text("Hit Points = "+attacker.hp);


	//check to see if you are still alive
	if (attacker.hp >= 0){

		//check to see if defender is still alive

		//if defender is dead
		if (defender.hp <= 0) {
			
		//enter code in to move defender to the defeated area and choose another character to fight, update creature count
		creatureDef++;
			//check to see if you have defeated everyone
			if (creatureDef < 4) {
				//display
				$("#attackMessage").html("<p>You hit your opponent for "+(attacker.att * clickCounter)+" damage. They hit you for "+defender.counter+" damage.</p> <p><strong>You have defeated your opponent!</strong><br /> Please choose another from the Creature Box.</p>");
				$( "#creatureHeading" ).text( "Choose your next opponent.");
				$("#attack").off("click", attack );
				moveDefender ();
			} else {
				//you have defeated everyone
				$("#attackMessage").html("<p>You hit your opponent for "+(attacker.att * clickCounter)+" damage. They hit you for "+defender.counter+" damage.</p> <p><strong>You WIN!</strong></p>");
				$("#attack").off("click", attack );
				moveDefender ();

				//code for new game button here
				var resetButton = $("<div class='panel panel-default'><button class='btn btn-default' id='reset'>New Game</button></div>");
			$("#attackButton").append(resetButton);
				$("#reset").on("click", reset ); 

			};
		} else {
		//defender is still alive
			$("#attackMessage").html("<p>You hit your opponent for "+(attacker.att * clickCounter)+" damage. They hit you for "+defender.counter+" damage.</p>");
			return;
		};
 	} else {
 	//You are dead
 	$("#attackMessage").html("<p>You hit your opponent for "+(attacker.att * clickCounter)+" damage. They hit you for "+defender.counter+" damage.</p> <p><strong>You have been defeated!</strong></p>");
 		$("#attack").off("click", attack );
				//code for new game button here
				var resetButton = $("<div class='panel-footer'><button class='btn btn-default' id='reset'>New Game</button></div>");
				$("#attackButton").append(resetButton);
				$("#reset").on("click", reset ); 
 } 

};//checkDefender close

function moveDefender(){
				var creatureId = "#"+opponent;
				$(creatureId).appendTo("#defeatedBox");
				$("p."+opponent+"hp").removeClass( "defender" );
				opponentSet = false;
}

//new game reset function
function reset (){	
	//remove creature from defeated and attacker areas

	$( "#attackerHolder" ).empty();
	$( "#opponentBox" ).empty();
	$( "#creatureBox" ).empty();

	$( "#defeatedBox" ).empty();

	$( "#attackerHolder" ).empty();
	$( "#attackElements" ).empty();

	$( "#creatureHeading" ).text( "Choose a character to begin.");
	//reset global variables
			creatureDef = 0;
			playerSet = false;
			opponentSet=false;
			player = "";
			attacker ="";
			clickCounter = 0;
	//reset the board
			setup();
			$(".creatureLink").on("click", setupPlayer );
			$("#reset").off("click", "**" );
			$("#attack").off("click",  "**"  ); 
}; //end function reset






	
