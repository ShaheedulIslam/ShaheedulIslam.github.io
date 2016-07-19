var turn = 1;
var player = "";
var tableArray = [];
var sizeOfTable = prompt("How big would you like the table to be?");
var tableDiv = document.getElementsByClassName("tableDiv")[0];
var gameActive = true;

//Make sure that the user's input is a number  and that the table
//does not have less than 3 rows  and columns
while(sizeOfTable < 3 || isNaN(sizeOfTable)) {
	sizeOfTable = prompt("How big would you like the table to be?");
}

//Create a table and table body with class names of table and tableBody
//so that the css styling will be applied
var table = document.createElement("table");
var tableBody = document.createElement("tbody");

table.setAttribute("class", "table");
tableBody.setAttribute("class", "tableBody");
table.appendChild(tableBody);


//Create the number of rows the user specified and an equal amount of cells
//Append the cells to the row
for (var i = 0; i < sizeOfTable; i++) {
	var row = tableBody.insertRow(i);
	for (var j=0; j<sizeOfTable; j++) {
		row.insertCell(j);
	}
}
//Append the table to a div
tableDiv.appendChild(table);

//Stores the amount of columns and rows in variables
var column = tableBody.rows[0].cells.length;
var row = tableBody.rows.length;

var restart = function() {
	if (confirm("Would you like to restart?")) {
		for (var i = 0; i < tableBody.rows.length; i++) {
			tableArray[i] = new Array(tableBody.rows[i].length);
			for (var j = 0; j < tableBody.rows[i].cells.length; j++) {
				tableBody.rows[i].cells[j].onclick = boardMove;
				tableArray[i][j] = "";
			}
		}
	} else {
		gameActive = false;
	}
};

var boardMove = function() {
	if(gameActive){
		//If the cell does not have anything inside of it
		if (this.textContent === "") {
			//this refers to a cell in the table
			//Set the text of the cell to either O or X depending
			//on whether the turn is even
			this.textContent = (turn % 2 === 0) ? "O":"X";
			player = (turn % 2 === 0) ? "O":"X";

			//Add the text of all the cells to a multidimmensional array
			tableArray[this.parentNode.rowIndex][this.cellIndex]=this.textContent;
			turn++;
			for (var i = 0; i < tableArray.length; i++) {
				for (var j = 0; j < tableArray[i].length; j++) {
					//Perform checks 
					//Will loop through entire table
					//i and j are the locations of the cell with i as the row
					//and j as the column
					checkHorizontal(i, j);
					checkVertical(i, j);
					checkDiagonal(i, j);
					checkTie();
				}
			}
		}
	}
};


var checkHorizontal = function(rowIndex, columnIndex){
	//Checks whether the cell specified is within the bounds of the table
	//so undefined is not returned
	if (tableArray[rowIndex][columnIndex] == player &&
		(columnIndex + 1) < column &&
		(columnIndex + 2) < column &&
		tableArray[rowIndex][columnIndex + 1] == player &&
		tableArray[rowIndex][columnIndex + 2] == player) {
			alert(player + " has won!");
			restart();
	}
};

var checkVertical = function(rowIndex, columnIndex){
	if (tableArray[rowIndex][columnIndex] == player &&
		(rowIndex + 1) < column &&
		(rowIndex + 2) < column &&
		tableArray[rowIndex + 1][columnIndex] == player &&
		tableArray[rowIndex + 2][columnIndex] == player) {
			alert(player + " has won!");
			restart();
	}
};

var checkDiagonal = function(rowIndex, columnIndex){
	if (tableArray[rowIndex][columnIndex] == player &&
		(rowIndex + 1) < row &&
		(rowIndex + 2) < row &&
		(columnIndex + 1) < column &&
		(columnIndex + 2) < column &&
		tableArray[rowIndex + 1][columnIndex + 1] == player &&
		tableArray[rowIndex + 2][columnIndex + 2] == player) {
			alert(player + " has won!");
			restart();
	}

	if (tableArray[rowIndex][columnIndex] == player &&
		(rowIndex - 1) >= 0 &&
		(rowIndex - 2) >= 0 &&
		(columnIndex + 1) < row &&
		(columnIndex + 2) < row &&
		tableArray[rowIndex - 1][columnIndex + 1] == player &&
		tableArray[rowIndex - 2][columnIndex + 2] == player) {
			alert(player + " has won!");
			restart();
	}
};

var checkTie = function() {
	var maxMoves = sizeOfTable * sizeOfTable;
	if (turn > maxMoves) {
		alert("It's a tie!");
		restart();
	}
};

//Loops through the table and adds an event listener to all the cells
//When a cell is pressed on the event will be triggered and the player's
//mark will be diplayed
for (var i = 0; i < tableBody.rows.length; i++) {
	tableArray[i] = new Array(tableBody.rows[i].length);
	for (var j = 0; j < tableBody.rows[i].cells.length; j++) {
		tableBody.rows[i].cells[j].onclick = boardMove;
		tableArray[i][j] = "";
	}
}




