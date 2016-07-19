
var game = new NoughtsAndCrosses();
game.initialize();
game.addOnClickListener();

function NoughtsAndCrosses() {
    var turn = 1;
    var player = "";
    var tableArray = [];
    var sizeOfTable = prompt("How big would you like the table to be?");
    var tableDiv = document.getElementsByClassName("tableDiv")[0];
    var gameActive = true;
    var table = null;
    var tableBody = null;
    var column = null;
    var row = null;

    var self = this;

    this.initialize = function() {
        //Make sure that the user's input is a number  and that the table
        //does not have less than 3 rows  and columns
        while (sizeOfTable < 3 || isNaN(sizeOfTable)) {
            sizeOfTable = prompt("How big would you like the table to be?");
        }

        //Create a table and table body with class names of table and tableBody
        //so that the css styling will be applied
        table = document.createElement("table");
        tableBody = document.createElement("tbody");

        table.setAttribute("class", "table");
        tableBody.setAttribute("class", "tableBody");
        table.appendChild(tableBody);


        //Create the number of rows the user specified and an equal amount of cells
        //Append the cells to the row
        for (var i = 0; i < sizeOfTable; i++) {
            var insertRow = tableBody.insertRow(i);
            for (var j = 0; j < sizeOfTable; j++) {
                insertRow.insertCell(j);
            }
        }
        //Append the table to a div
        tableDiv.appendChild(table);

        //Stores the amount of columns and rows in variables
        column = tableBody.rows[0].cells.length;
        row = tableBody.rows.length;
    };

    this.addOnClickListener = function() {
        for (var i = 0; i < tableBody.rows.length; i++) {
            tableArray[i] = new Array(tableBody.rows[i].length);
            for (var j = 0; j < tableBody.rows[i].cells.length; j++) {
                tableBody.rows[i].cells[j].onclick = this.boardMove;
                tableArray[i][j] = "";
            }
        }
    };

    this.clearTable = function() {
        for (var i = 0; i < tableBody.rows.length; i++) {
            tableArray[i] = new Array(tableBody.rows[i].length);
            for (var j = 0; j < tableBody.rows[i].cells.length; j++) {
                tableBody.rows[i].cells[j].textContent = "";
            }
        }
    };

    this.restart = function() {
        if (confirm("Would you like to restart?")) {
            self.addOnClickListener();
            this.clearTable();
            turn = 1;
            player = "";
        } else {
            gameActive = false;
        }
    };



    this.boardMove = function() {
        if (gameActive) {
            //If the cell does not have anything inside of it
            if (this.textContent === "") {
                //this refers to a cell in the table
                //Set the text of the cell to either O or X depending
                //on whether the turn is even
                this.textContent = (turn % 2 === 0) ? "O" : "X";
                player = (turn % 2 === 0) ? "O" : "X";

                //Add the text of all ethe cells to a multidimensional array
                tableArray[this.parentNode.rowIndex][this.cellIndex] = this.textContent;
                turn++;
                for (var i = 0; i < tableArray.length; i++) {
                    for (var j = 0; j < tableArray[i].length; j++) {
                        //Perform checks 
                        //Will loop through entire table
                        //i and j are the locations of the cell with i as the row
                        //and j as the column
                        self.checkHorizontal(i, j);
                        self.checkVertical(i, j);
                        self.checkDiagonal(i, j);
                        self.checkTie();
                    }
                }
            }
        }
    };

    this.checkHorizontal = function(rowIndex, columnIndex) {
        //Checks whether the cell specified is within the bounds of the table
        //so undefined is not returned
        if (tableArray[rowIndex][columnIndex] == player &&
            (columnIndex + 1) < column &&
            (columnIndex + 2) < column &&
            tableArray[rowIndex][columnIndex + 1] == player &&
            tableArray[rowIndex][columnIndex + 2] == player) {
                alert(player + " has won!");
                this.restart();
        }
    };

    this.checkVertical = function(rowIndex, columnIndex) {
        if (tableArray[rowIndex][columnIndex] == player &&
            (rowIndex + 1) < column &&
            (rowIndex + 2) < column &&
            tableArray[rowIndex + 1][columnIndex] == player &&
            tableArray[rowIndex + 2][columnIndex] == player) {
                alert(player + " has won!");
                this.restart();
        }
    };

    this.checkDiagonal = function(rowIndex, columnIndex) {
        if (tableArray[rowIndex][columnIndex] == player &&
            (rowIndex + 1) < row &&
            (rowIndex + 2) < row &&
            (columnIndex + 1) < column &&
            (columnIndex + 2) < column &&
            tableArray[rowIndex + 1][columnIndex + 1] == player &&
            tableArray[rowIndex + 2][columnIndex + 2] == player) {
                alert(player + " has won!");
                this.restart();
        }

        if (tableArray[rowIndex][columnIndex] == player &&
            (rowIndex + 1) < row &&
            (rowIndex + 2) < row &&
            (columnIndex - 1) < column &&
            (columnIndex - 2) < column &&
            tableArray[rowIndex + 1][columnIndex - 1] == player &&
            tableArray[rowIndex + 2][columnIndex - 2] == player) {
                alert(player + " has won!");
                this.restart();
        }
    };

    this.checkTie = function() {
        var maxMoves = sizeOfTable * sizeOfTable;
        if (turn > maxMoves) {
            alert("It's a tie!");
            this.restart();
        }
    };
}