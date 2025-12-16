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
let turn;
let winner;
let boatSunk;

//P1 variables:
let p1Hits;
let p1Shots;
let p1ShipsSunk;
let p1CarrierSunk;
let p1BattleshipSunk;
let p1DestroyerSunk;
let p1SubmarineSunk;
let p1PatrolBoatSunk;

//P2 variables:
let p2Hits;
let p2Shots;
let p2ShipsSunk;
let p2CarrierSunk;
let p2BattleshipSunk;
let p2DestroyerSunk;
let p2SubmarineSunk;
let p2PatrolBoatSunk;
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
let flatLeftGrid;
let flatRightGrid; 


/*-------------------------------- Functions --------------------------------*/

//this is to declare new ship objects with various properties 
// - name, size (in cells), as an array (for later refactors), whether sunk and how many hits.
//need to be capitalised.
class Ship {
        constructor(name, size, arr) {
    this.name = name;
    this.size = size;
//the array constructor, if taking one argument takes the length of the array. 
//Andrew Burgess video super helpful. https://www.youtube.com/watch?v=cGZD_0RODh4
this.matrix = new Array(size).fill(1);
this.arr = arr;
    this.horizontal = true;
    this.sunk = false;
    this.hits = 0;
  };

  makeVertical () {
        this.horizontal = false;
  };
};
//5 types of ship that each player gets:
const p1Carrier = new Ship('Carrier', 5, [32,42,52,62,72]);
const p1Battleship= new Ship('Battleship', 4, [49,59,69,79]);
const p1Destroyer = new Ship('Destroyer', 3, [47,57,67]);
const p1Submarine = new Ship('Submarine', 3, [93,94,95]);
const p1PatrolBoat = new Ship('Patrol Boat', 2, [34,35]);

const p2Carrier = new Ship('Carrier', 5, [55,56,57,58,59]);
const p2Battleship= new Ship('Battleship', 4, [70,71,72,73]);
const p2Destroyer = new Ship('Destroyer', 3, [30,40,50]);
const p2Submarine = new Ship('Submarine', 3, [77,87,97]);
const p2PatrolBoat = new Ship('Patrol Boat', 2, [1,11]);

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
                        flatLeftGrid[index] = 1;
                    } else if (leftGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                        flatLeftGrid[index] = 2;
                        //this signifies a hit
                    } else if  (leftGrid[row][col] === 3) {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = 'X';
                        flatLeftGrid[index] = 3;
                        //This signifies a miss 
                    } else if (leftGrid[row][col] === 4) {
                       cellEl.classList.add('ship');
                       cellEl.textContent = ''; 
                        flatLeftGrid[index] = 4;
                        let wreck = document.createElement('img');
                        wreck.src = "./assets/shipwreck.png";
                        cellEl.appendChild(wreck); 
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
                        flatRightGrid[index] = 1;
                    } else if (rightGrid[row][col] === 2) {
                        cellEl.classList.add('ship');
                        cellEl.textContent = 'X';
                        flatRightGrid[index] = 2;
                    } else if  (rightGrid[row][col] === 3) {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = 'X';
                        flatRightGrid[index] = 3;
                    } else if (rightGrid[row][col] === 4) {
                       cellEl.classList.add('ship');
                       cellEl.textContent = ''; 
                       flatRightGrid[index] = 4;
                        let wreck = document.createElement('img');
                        wreck.src = "./assets/shipwreck.png";
                        cellEl.appendChild(wreck); 
                    } else {
                        cellEl.classList.add('not-ship');
                    };
                 };
        };
};

//this function checks for whether turn is equal to p1 or p2 and covers the other board
const switchPlayer = () => {
        leftShipEls = document.querySelectorAll('.left-cell.ship');
        rightShipEls = document.querySelectorAll('.right-cell.ship');
        if (turn === 'p1') {
        leftShipEls.forEach(cell => {
                cell.classList.add('covered-board')})
        turn = '';
        p2ButtonElement.classList.remove('hidden');
        } else if (turn === 'p2') {
        rightShipEls.forEach(cell => {
                cell.classList.add('covered-board')})
        turn = '';
        p1ButtonElement.classList.remove('hidden');
        };
};


// const updateMessage = () => {};

const handleLeftClick = (event) => {
        cellRow = event.target.id[1];
        cellCol = event.target.id[2];
     if (turn === 'p1') {return}
     else if (turn === 'p2') {
     if (leftGrid[cellRow][cellCol] === 0) {
        leftGrid[cellRow][cellCol] = 3;
        render()
        switchPlayer();
        p1ShipSunk();
        p2ShipSunk();
     } else if (leftGrid[cellRow][cellCol] === 1) {
        leftGrid[cellRow][cellCol] = 2;
        render();
        switchPlayer();
        p1ShipSunk();
        p2ShipSunk();
     } else {return};
};
};

const handleRightClick = (event) => {
        cellRow = event.target.id[1];
        cellCol = event.target.id[2];
        console.log(event.target.id)
     if (turn === 'p2') {return}
     else if (turn === 'p1') {
     if (rightGrid[cellRow][cellCol] === 0) {
        rightGrid[cellRow][cellCol] = 3;
        render();
        switchPlayer();
        p1ShipSunk();
        p2ShipSunk();
        console.log(leftGrid);
console.log(rightGrid);
     } else if (rightGrid[cellRow][cellCol] === 1) {
        rightGrid[cellRow][cellCol] = 2;
        render();
        switchPlayer();
        p1ShipSunk();
        p2ShipSunk();
     } else {return};
};
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
        flatLeftGrid = leftGrid.flat();
        flatRightGrid = rightGrid.flat();
        render()
        rightShipEls = document.querySelectorAll('.right-cell.ship');
         rightShipEls.forEach(cell => {
                cell.classList.add('covered-board')})
};


init();
// switchPlayer()
console.log(turn)
console.log(p1ButtonElement)


/*-----------------------------Callback Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
// leftCellEls.forEach(cell => {cell.addEventListener('mouseover', )});

// rightCellEls.forEach(cell => {cell.addEventListener('click', handleRightClick)
// });

leftCellEls.forEach(cell => {cell.addEventListener('click', handleLeftClick)
});
 rightCellEls.forEach(cell => {cell.addEventListener('click', handleRightClick)
});
p1ButtonElement.addEventListener('click', (event) => {
        if (turn) {return
        } else {leftShipEls.forEach(cell => {
        cell.classList.remove('covered-board')})
        p1ButtonElement.classList.add('hidden');
        turn = 'p1';
}
})
p2ButtonElement.addEventListener('click', (event) => {
        if (turn) {return
        } else {rightShipEls.forEach(cell => {
        cell.classList.remove('covered-board')})
        p2ButtonElement.classList.add('hidden');
        turn = 'p2';
}
})
/*------------------------------- Page Load ------------------------------*/
//SHIP SUNK FUNCTIONS:
const ifSunk = (boatarr) => {
        if (boatSunk) {
                boatarr.forEach((cell) => {
                let firstDigit = (parseInt(((cell + 10).toString()).charAt(0)))-1
                let secondDigit = parseInt(((cell + 10).toString()).charAt(1))
                leftGrid[firstDigit][secondDigit] = 4;
                render();
                });
        };
};

const checkSunkSquares = (boatarr, leftgridarr) => {
         boatarr.forEach((cell, index) => {
                        leftgridarr.push(flatLeftGrid[cell]);
                        boatSunk = leftgridarr.every((cell) => {
                                return cell === 2;})                          
                });
                ifSunk(p1Carrier.arr);
};
//P1 ships sunk
const p1ShipSunk = () => {
        let leftGridCarrierArr = [];
        let leftGridBattleshipArr = [];
        let leftGridDestroyerArr = [];
        let leftGridSubmarineArr = [];
        let leftGridPatrolBoatArr = [];
        checkSunkSquares(p1Carrier.arr,leftGridCarrierArr);
        checkSunkSquares(p1Battleship.arr,leftGridBattleshipArr);
        checkSunkSquares(p1Destroyer.arr,leftGridDestroyerArr);
        checkSunkSquares(p1Submarine.arr,leftGridSubmarineArr);
        checkSunkSquares(p1PatrolBoat.arr,leftGridPatrolBoatArr);
                //  p1Carrier.arr.forEach((cell, index) => {
                //         leftGridCarrierArr.push(flatLeftGrid[cell]);
                //         p1CarrierSunk = leftGridCarrierArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p1CarrierSunk, p1Carrier.arr);
                // p1Battleship.arr.forEach((cell, index) => {
                //         leftGridBattleshipArr.push(flatLeftGrid[cell]);
                //         p1BattleshipSunk = leftGridBattleshipArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p1BattleshipSunk, p1Battleship.arr);
                //  p1Destroyer.arr.forEach((cell, index) => {
                //         leftGridDestroyerArr.push(flatLeftGrid[cell]);
                //         p1DestroyerSunk = leftGridDestroyerArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p1DestroyerSunk, p1Destroyer.arr);
                //  p1Submarine.arr.forEach((cell, index) => {
                //         leftGridSubmarineArr.push(flatLeftGrid[cell]);
                //         p1SubmarineSunk = leftGridSubmarineArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p1SubmarineSunk, p1Submarine.arr);
                //  p1PatrolBoat.arr.forEach((cell, index) => {
                //         leftGridPatrolBoatArr.push(flatLeftGrid[cell]);
                //                 // console.log(leftGridCarrierArr);
                //         p1PatrolBoatSunk = leftGridPatrolBoatArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p1PatrolBoatSunk, p1PatrolBoat.arr);
};

const p2ShipSunk = () => {
        let rightGridCarrierArr = [];
        let rightGridBattleshipArr = [];
        let rightGridDestroyerArr = [];
        let rightGridSubmarineArr = [];
        let rightGridPatrolBoatArr = [];
        checkSunkSquares(p2Carrier.arr,rightGridCarrierArr);
        checkSunkSquares(p2Battleship.arr,rightGridBattleshipArr);
        checkSunkSquares(p2Destroyer.arr,rightGridDestroyerArr);
        checkSunkSquares(p2Submarine.arr,rightGridSubmarineArr);
        checkSunkSquares(p2PatrolBoat.arr,rightGridPatrolBoatArr);
                // p2Carrier.arr.forEach((cell, index) => {
                //         rightGridCarrierArr.push(flatRightGrid[cell]);
                //         p2CarrierSunk = rightGridCarrierArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p2CarrierSunk, p2Carrier.arr);
                // p2Battleship.arr.forEach((cell, index) => {
                //         rightGridBattleshipArr.push(flatRightGrid[cell]);
                //         p2BattleshipSunk = rightGridBattleshipArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p2BattleshipSunk, p2Battleship.arr);
                //  p2Destroyer.arr.forEach((cell, index) => {
                //         rightGridDestroyerArr.push(flatRightGrid[cell]);
                //         p2DestroyerSunk = rightGridDestroyerArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p2DestroyerSunk, p2Destroyer.arr);
                //  p2Submarine.arr.forEach((cell, index) => {
                //         rightGridSubmarineArr.push(flatRightGrid[cell]);
                //         p2SubmarineSunk = rightGridSubmarineArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p2SubmarineSunk, p2Submarine.arr);
                //  p2PatrolBoat.arr.forEach((cell, index) => {
                //         rightGridPatrolBoatArr.push(flatRightGrid[cell]);
                //                 // console.log(leftGridCarrierArr);
                //         p2PatrolBoatSunk = rightGridPatrolBoatArr.every((cell) => {
                //                 return cell === 2;})                          
                // });
                // ifSunk(p2PatrolBoatSunk, p2PatrolBoat.arr);
};

//  wreck = document.createElement('img');
//                  wreck.src = "./assets/shipwreck.png";
//                 .appendChild(wreck);  