//2 PLAYER USER STORIES
//As Player 1 want to see A board appear with two square grids and a button saying play game.
        //I also want to see a istructions, a title.
//As a user I want after I click start I want to see my grid with my ships in position on the left grid.
//As a user I want to see a message telling me to take my turn above the right grid and when I hover my mouse over the boxes it shows an X to signify a possible selection.
//As a user I was to click on a box and for the box I've clicked on to show either a hit or a miss.
//As a user I want a button to appear asking Player 2 to take their turn.
//As Player 2 I want to see the left grid become an empty grid and for my ships to appear on the right grid with the hit/miss signified on my own board.
//As a user I then want to take my turn.
//As a user I want to it to become clear visually when I've sunk an entire ship.
//As a user I want to see once I've sunk all the ships and won the game.
//As a user I want to be able to start a new game.

//ADDITIONAL ELEMENTS
//Once I hit a ship I want to be given multiple turns until I miss - I want the message to reflect this.
//I want to be able to reset the game and for a new combination appear on the grid.
//I want to be able to place my own ships on the game board.



//PLAYER VS COMPUTER USER STORIES
//As Player 1 want to see A board appear with two square grids and a button saying play game.
        //I also want to see a istructions, a title.
//As a user I want after I click start I want to see my grid with my ships in position on the left grid.
//As a user I want to see a message telling me to take my turn above the right grid and when I hover my mouse over the boxes it shows an X to signify a possible selection.
//As a user I was to click on a box and for the box I've clicked on to show either a hit or a miss.
//As a user I then want the computer to randomly choose a box on my grid.
//As a user I want to see the computer go for an adjacent square if they got a hit and to continue to do so until the ship is sunk.


//BOATS:
//     Carrier     - 5 
//     Battleship  - 4 
//     Destroyer   - 3 
//     Submarine   - 3 
//     Patrol Boat - 2 


// submarine {
// horizontal ship: 
// [[0],[0],[0]],
// [[1],[1],[1]],
// [[0],[0],[0]]

// vertical ship:
// [[0],[1],[0]],
// [[0],[1],[0]],
// [[0],[1],[0]]
// }

// /*--------------------------------- Pseudo ---------------------------------*/

//create the board using html and CSS & JS.
//Come up with instructions for the game.
//create the inital position of Player 1 & Player 2's boards.
//Define the variables we want to use to track the state of the game. Including: left board, right board, hits (P1 & P2), shots (P1 & P2), turn, winner, ships sunk (P1 & P2).
//Define the variables to reference the cached elements of the DOM. Including: start button, player 1 button, player 2 button, reset button, board, messages.
//Create the ship objects for both players with properties - 2D array (horiz), 2D array (vert), hits, sunk, postiion.
//Create the two states being shown to the players. Player 1 state - the left hand grid is uncovered and the right covered. Player 2 state - the oppposite.
//Come up with a ship class that can be hidden so that the ships get hidden.
//When one of the sides is disabled the turn changes, this needs to disable being able to click on the squares on that side, and enable the squares being clicked on the other side.
//Come up with an initilized state and function.
//Come up with a render function - with updateboards and updatemessages functions.
//Come up with an event listener to respond to clicking of any of the squares.
//Come up with a handleclicked function which adds to hits or misses, which addes an 'X' to the space on the board, which changes the turn and the board, ships sunk.
//Come up with an If statement based on whether the square is a hit or a miss.
//Come up with an If statement to determine whether one of the ships has been sunk - this  will be difficult as there will be 5 different ships of different sizes.
//Come up with a winning function based on how many hits one of the players has (17 to win the game).
//Come up with an event listeners for the Player 1 turn and Player 2 turn buttons.
//Come up with event listeners for the start and reset buttons.

//REFACTORISATIONS
//Come up with a loop which positions ships randomly on the board. This will involve no overlap of ships including spaces around the ships. Also inlcude randomised orientation of the ships.
//

//Player vs computer pseudocode:
//.....

//QUESTIONS
//1. How would I create a ship covering 3 spaces with an image of a ship - but so that each section of the ship was a child of the space it occupied. Should I be treating the ships as whole ships or as spaces
//2. How can I build a randomized game board each time a new game is reset - surely this is as hard as playing against the computer.
//3. Should I be building the grids in html or should I create it in JS completely.




/*-------------------------------- Variables --------------------------------*/

const width = 10;
const height = 10;
let leftGrid;
let rightGrid;
let p1Hits;
let p2Hits;
let p1Shots;
let p2Shots;
let p1ShipsSunk;
let p1SipsSunk;
let turn;
let winner;


/*------------------------ Cached Element References ------------------------*/

const leftGridElement = document.querySelector('#left-grid');
const rightGridElement = document.querySelector('#right-grid');
const startButtonElement = document.querySelector('#start-button');
const resetButtonElement = document.querySelector('#reset-button');
const p1ButtonElement = document.querySelector('#p1-button');
const p2ButtonElement = document.querySelector('#p2-button');
const messegeElement = document.querySelector('#messages');
let leftCellEls = [];
let rightCellEls = [];


/*-------------------------------- Functions --------------------------------*/

class ship {
        constructor(name, size) {
    this.name = name;
    this.size = size;
    this.arr = Array(size).fill(1);
    this.horizontal = true;
  };
  makeVertical () {
        this.horizontal = false;
  };
};
//5 types of ship:
const carrier = new ship('Carrier', 5);
const battleship= new ship('Battleship', 4);
const destroyer = new ship('Destroyer', 3);
const submarine = new ship('Submarine', 3);
const patrolBoat = new ship('Patrol Boat', 2);

console.log(carrier);

//Used to create both the left and the right grid in the game.
const createGrid = () => {
        for (let row=0; row< height; row++) {
                // const leftRows = [];
                // const rightRows = [];
                for (let col=0; col<width; col++) {
                        leftCellEls = document.createElement('div')
                        leftCellEls.classList.add('left-cell');
                        leftCellEls.id = `L${row}${col}`;
                        leftGridElement.appendChild(leftCellEls);
                        // leftRows.push(leftCellEls);
                        rightCellEls = document.createElement('div')
                        rightCellEls.classList.add('right-cell');
                        rightCellEls.id = `R${row}${col}`;
                        rightGridElement.appendChild(rightCellEls);
                        // rightRows.push(rightCellEls);
                };
        // leftGrid.push(leftRows);
        // rightGrid.push(rightRows);
        };
};


const updateBoard = () => {
        updateLeftBoard();
        updateRightBoard();
};

const updateLeftBoard = () => {
        for (let row=0; row<height; row++) {
                 for (let col=0; col<width; col++) {
        const index = (row * 10) + col;
        const cellEl = leftCellEls[index];
                    if (leftGrid[row][col] === 1) {
                        cellEl.classList.add('ship');
                    } else if (rightGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                        cellEl.style.color = 'red';
                        //this signifies a hit
                    } else if  (rightGrid[row][col] === 3) {
                        cellEl.textContent = 'X';
                        //This signifies a miss 
                    };
                 };
        };
};

const updateRightBoard = () => {
        for (let row=0; row<height; row++) {
                 for (let col=0; col<width; col++) {
        const index = (row * 10) + col;
        const cellEl = rightCellEls[index];
                    if (rightGrid[row][col] === 1) {
                        cellEl.classList.add('ship');
                        //this logs a square as a ship
                    } else if (rightGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                        cellEl.style.color = 'red';
                        //this signifies a hit
                    } else if  (rightGrid[row][col] === 3) {
                        cellEl.textContent = 'X';
                        //This signifies a miss 
                    };
                 };
        };
};

// const updateMessage = () => {};

const render = () => {
        updateBoard();
        // updateMessage();
};



const init = () => {
        createGrid();
        leftGrid =     [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,1,0,1,1,0,0,0,0],
                        [0,0,1,0,0,0,0,1,0,1],
                        [0,0,1,0,0,0,0,1,0,1],
                        [0,0,1,0,0,0,0,1,0,1],
                        [0,0,1,0,0,0,0,0,0,1],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,1,1,1,0,0,0,0]]
        rightGrid =    [[0,1,0,0,0,0,0,0,0,0],
                        [0,1,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [1,0,0,0,0,0,0,0,0,0],
                        [1,0,0,0,0,0,0,0,0,0],
                        [1,0,0,0,0,1,1,1,1,1],
                        [0,0,0,0,0,0,0,0,0,0],
                        [1,1,1,1,0,0,0,1,0,0],
                        [0,0,0,0,0,0,0,1,0,0],
                        [0,0,0,0,0,0,0,1,0,0]]
        p1Hits = 0;
        p2Hits = 0;
        p1Shots = 0;
        p2Shots = 0;
        p1ShipsSunk = 0;
        p1SipsSunk = 0;
        turn = 'P1';
        winner = false;
        leftCellEls = document.querySelectorAll('#left-grid div');
        rightCellEls = document.querySelectorAll('#right-grid div');
        render()
};


init();



/*-----------------------------Callback Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/


/*------------------------------- Page Load ------------------------------*/