

//creature count so we know when we have defeated eveyone
var creatureDef = 0;
var playerSet = false;
var opponentSet=false;
var player = "";
var attacker ="";

var clickCounter = 0;
// Creature list
//var elfWizard = new creature("Elf Wizard", 97, 5, 12);
//var dragonSorc = new creature("Dragonborn Sorcerer", 110, 5, 8);
//var humanPaladin = new creature("Human Paladin", 120, //7, 6);
//var humanDruid = new creature("Human Druid", 140, 5, 11);

var creatureList = {
	 elfWizard: ["Elf Wizard", 97, 5, 12],
	 dragonSorc: ["Dragonborn Sorcerer", 110, 5, 8],
	 dwarfCleric: ["Dwarf Cleric", 105, 7, 5],
	 humanPaladin:["Human Paladin", 120, 7, 6],
	 humanDruid: ["Human Druid", 140, 5, 11]
};

$.each(creatureList, function(key, value) {
//for (var i=0; i<creatureList.length; i++){
	var creatureBox=$("#creatureBox");

	//var creatureId= creatureList.creatureList[i];
	  var creatureId = key;
	  var creatureName= value[0];
	  var creatureHP = value[1];
	var newDiv= $("<div class='panel panel-default creatureLink' id='" +creatureId +  "' value='" +creatureId+"'><div class='panel-body'><img src='assets/images/" + creatureId+".jpg' class='img-responsive' alt='"+creatureName+"' /><div class='panel-footer'><h3>"+creatureName+"</h3><p class='"+creatureId+"hp'>Hit Points = "+creatureHP+"</p></div></div>");

	creatureBox.append(newDiv);


});
var creatureBox=$("#creatureBox");

//on.click the creatureLink, check to see if attacker has been made, if not, make creature and assign it to attacker

$(".creatureLink").click(function(event) {
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
		$(creatureId).appendTo("#attackerBox");
		$("p."+self+"hp").addClass( "attacker" );



	
	//function to make the creatures
		var nameImport = creatureList[self][[0]];
		var hpImport = creatureList[self][[1]];
		var attImport = creatureList[self][[2]];
		var counterImport = creatureList[self][[3]];

		attacker = new creature (nameImport, hpImport, attImport, counterImport); 

	
	
} else if (!opponentSet) {
	//assign as defender
		//set character as the player's character
		opponent =self;
		console.log(opponent);

		//change instructions
		$( "#creatureHeading" ).text( "Click Attack to fight your opponent.");

		//move the character to the opponentrBox
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
		var attackButton = $("<div id='attackButton'><button class='btn btn-default'>ATTACK!<br /><span class='orange-circle-greater-than'></span></button></div>");

		$("#attackerBox").append(attackButton);

		$("#attackerBox").bind('attack', function() {
	    //attacker strikes at the defender
			clickCounter++
			defender.hp = defender.hp - (attacker.att * clickCounter);
			
			//defender counters
			attacker.hp = attacker.hp - defender.counter;

			$("p.defender").text("Hit Points = "+defender.hp);
			$("p.attacker").text("Hit Points = "+attacker.hp);
		//checkDefender();


});


$("#attackerBox").click(function(){
    $(this).trigger('attack');





});
  
} else {
	alert("You already have an opponent.");
};

}); //end onclick creatureLink



// creature template
function creature (name, hp, att, counter) {
		this.name = name;
		this.hp = hp;
		this.att= att;
		this.counter = counter;
};



//function attack(){
		//attacker strikes at the defender
		//newAtt = newAtt + attacker.att;
		//defender.hp = defender.hp - newAtt;
		
		//defender counters
		//attacker.hp = attacker.hp - defender.counter;

	//checkDefender();
//};
//function to create the chosen attacker
//var player = new attacker(elfWizard);
//attacker.creature.hp 



//function to assign defender
function defender (creature){
		this.creature= creature;
};




//Is the defender still alive?
function checkDefender() {
	//check to see if defender's hp is > 0
	if (defender.hp <= 0) {
		//enter code in to move defender to the defeated area and choose another character to fight, update creature count
		creatureDef = creatureDef + 1;
			if (creatureDef < 5) {
				return;
			} else {
				//code for you win
			};
	} else {
		//enter code for diplaying "You hit the defender.name for newAttack damage. They hit you for counter damage." And display the new HP
		return;
	};
}; //checkDefender close


