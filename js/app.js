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

//MAIN CHALLENGES:
//1. Working out how to work with newly created HTML elements in JS. 
// And then how to cache them in the DOM after creating them. They are different to the tracked variable and standard cached elements as they need to be declared in global scope, 
// but then properly cached in function scope after they've been created.
//2. Working out the inheritance ordering in CSS was really hard. What I eventually realised is that creating a CSS block with multiple classes is more specific so wins on inheritance than a block for just a single class.
//After this, if the blocks have the same specificity then its the lower block that wins on inheritance, hence why .cell.ship.covered-board was lower than the other sections.
//3. Another classic thing that I keep finding difficult is selecting multiple elements but the treating them as a singular variable not an array. 
// I declared the leftShipEls and rightShipEls and even though they are literally puralised I couldn't work out for ages why my IF statement wasn't working! Turns out I needed to iterate through them duh!
//Similarly to the leftCellEls & rightCellEls arrays I have now declared them as arrays which helps to remember they are arrays.
//4.

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
let leftShipEls = [];
let rightShipEls = [];

/*-------------------------------- Functions --------------------------------*/

//this is to declare new ship objects with various properties 
// - name, size (in cells), as an array (for later refactors), whether sunk and how many hits.
//need to be capitalised.
class Ship {
        constructor(name, size) {
    this.name = name;
    this.size = size;
//the array constructor, if taking one argument takes the length of the array. 
//Andrew Burgess video super helpful. https://www.youtube.com/watch?v=cGZD_0RODh4
    this.arr = new Array(size).fill(1);
    this.horizontal = true;
    this.sunk = false;
    this.hits = 0;
  };

  makeVertical () {
        this.horizontal = false;
  };
};
//5 types of ship that each player gets:
const carrier = new Ship('Carrier', 5);
const battleship= new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);
const submarine = new Ship('Submarine', 3);
const patrolBoat = new Ship('Patrol Boat', 2);

// console.log(carrier);

//Used to create both the left and the right grid in the game.
const createGrid = () => {
        for (let row=0; row< height; row++) {
                for (let col=0; col<width; col++) {
                //create all the cells on the left hand grind
                        leftCellEls = document.createElement('div')
                //give the left hand grid cells all a class list of left-cell
                        leftCellEls.classList.add('left-cell');
                //give all the left hand cells a class of cell.
                        leftCellEls.classList.add('cell');
                //give each of the cells a unique id: e.g. L43
                        leftCellEls.id = `L${row}${col}`;
                //append all the left cell div elements to the left-grid div element
                        leftGridElement.appendChild(leftCellEls);
                //do everything above to the right board
                        rightCellEls = document.createElement('div')
                        rightCellEls.classList.add('right-cell');
                        rightCellEls.classList.add('cell');
                        rightCellEls.id = `R${row}${col}`;
                        rightGridElement.appendChild(rightCellEls);
                };
        };
};


const updateBoard = () => {
        updateLeftBoard();
        updateRightBoard();
};

const updateLeftBoard = () => {
        //cycle through all the cells of the left grid
        for (let row=0; row<height; row++) {
                 for (let col=0; col<width; col++) {
        // asign each of the iterations an index
        const index = (row * 10) + col;
        //assign a variable to each cell interation.
        const cellEl = leftCellEls[index];
        //cycle through the left grid 2D array and if any elements have a value of 1 add the class of ship to the corresponding div cell          
                if (leftGrid[row][col] === 1) {
                        cellEl.classList.add('ship');
                    } else if (leftGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                        //this signifies a hit
                    } else if  (leftGrid[row][col] === 3) {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = 'X';
                        //This signifies a miss 
                    } else {
                        cellEl.classList.add('not-ship');
                    };
                 };
        };
};

//Key for the below: 0 is a blank square, 1 is an untouched ship, 2 is a hit ship, 3 is a missed square.
const updateRightBoard = () => {
        for (let row=0; row<height; row++) {
                 for (let col=0; col<width; col++) {
        const index = (row * 10) + col;
        const cellEl = rightCellEls[index];
                    if (rightGrid[row][col] === 1) {
                        cellEl.classList.add('ship');
                    } else if (rightGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                    } else if  (rightGrid[row][col] === 3) {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = 'X';
                    } else {
                        cellEl.classList.add('not-ship');
                    };
                 };
        };
};

//this function checks for whether turn is equal to p1 or p2 and covers the other board
const whichPlayer = () => {
        leftShipEls = document.querySelectorAll('.left-cell.ship');
        rightShipEls = document.querySelectorAll('.right-cell.ship');
        // console.log(rightShipEls);
        if (turn === 'p1') {
        rightShipEls.forEach(cell => {
                cell.classList.add('covered-board')})
        leftShipEls.forEach(cell => {
                cell.classList.remove('covered-board')})
        } else if (turn === 'p2') {
        leftShipEls.forEach(cell => {
                cell.classList.add('covered-board')})
        rightShipEls.forEach(cell => {
                cell.classList.remove('covered-board')})
        };
};
// const updateMessage = () => {};

const handleLeftClick = (event) => {
        cellRow = event.target.id[1];
        cellCol = event.target.id[2];
     if (leftGrid[cellRow][cellCol] === 0) {
        
     }
};

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
        turn = 'p1';
        winner = false;
        leftCellEls = document.querySelectorAll('#left-grid div');
        rightCellEls = document.querySelectorAll('#right-grid div');
        render()
};


init();
whichPlayer();



/*-----------------------------Callback Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
// leftCellEls.forEach(cell => {cell.addEventListener('mouseover', )});
leftCellEls.forEach(cell => {cell.addEventListener('click', handleLeftClick)
});
// rightCellEls.forEach(cell => {cell.addEventListener('click', handleRightClick)
// });
/*------------------------------- Page Load ------------------------------*/