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
//I want to be able to reset the game and for a new combination appear on the grid.


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


/*-------------------------------- Variables --------------------------------*/

const width = 10;
const height = 10;
let leftGrid;
let rightGrid;
let turn;
let winner;
let gameActive = false;


//P1 variables:
let p1Hits;
let p1ShipsSunk;
let p1CarrierSunk;
let p1BattleshipSunk;
let p1DestroyerSunk;
let p1SubmarineSunk;
let p1PatrolBoatSunk;

//P2 variables:
let p2Hits;
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
const mainMessegeElement = document.querySelector('#main-messages');
const p1MessageElement = document.querySelector('#p1-messages');
const p2MessageElement = document.querySelector('#p2-messages');
const columnElements = document.querySelectorAll('.column')
const instructionsElement = document.querySelector('#instructions-section');
const instructionsButtonElement = document.querySelector('#instructions-button');
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
        constructor(name, size) {
        this.name = name;
        this.size = size;
//the array constructor, if taking one argument takes the length of the array. 
//Andrew Burgess video super helpful. https://www.youtube.com/watch?v=cGZD_0RODh4
        this.arr = new Array(size).fill(0);
        this.horizontal = true;
        this.sunk = false;
        this.hits = 0;
        };

        makeVertical() {
        this.horizontal = false;
        };
};      

const p1Carrier = new Ship('Assassin', 5);
const p1Battleship= new Ship('Stag', 4);
const p1Destroyer = new Ship('Leafmimic', 3);
const p1Submarine = new Ship('Stinker', 3);
const p1PatrolBoat = new Ship('Ladybird', 2);

const p2Carrier = new Ship('Assassin', 5);
const p2Battleship = new Ship('Stag', 4);
const p2Destroyer = new Ship('Leafmimic', 3);
const p2Submarine = new Ship('Stinker', 3);
const p2PatrolBoat = new Ship('Ladybird', 2);

const p1Ships = [p1Carrier, p1Battleship, p1Destroyer, p1Submarine, p1PatrolBoat];
const p2Ships = [p2Carrier, p2Battleship, p2Destroyer, p2Submarine, p2PatrolBoat];

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

const hitTally = () => {
        const p1HitTally = () => {
                let tally = 0;
        leftGrid.forEach((row) => {
                        row.forEach((col) => {
                                if (col === 2 || col === 4) {
                                        tally += 1;
                                };
                        });
        }); p1Hits = tally
        };
        const p2HitTally = () => {
                let tally = 0;
        rightGrid.forEach((row) => {
                        row.forEach((col) => {
                                if (col === 2 || col === 4) {
                                        tally += 1;
                                };
                        });
        }); p2Hits = tally
        };
        p1HitTally();
        p2HitTally();
};

const winningShot = () => {
        if (p1Hits === 17) {
                winner = 'p2';
                declareWinner();
        } else if (p2Hits === 17) {
                winner = 'p1';
                declareWinner();
        };
};

const declareWinner = () => {
        if (winner ==='p1') {
                //message to read "Player 1 has won the game!"
                p1ButtonElement.classList.add('hidden');
                p2ButtonElement.classList.add('hidden');
                leftShipEls.forEach(cell => {
                        cell.classList.remove('covered-board');
                });
                leftGridElement.classList.remove('custom-cursor');
                rightShipEls.forEach(cell => {
                        cell.classList.remove('covered-board');
                });
                leftGridElement.classList.remove('custom-cursor');
                p1MessageElement.textContent = 'You won!';
                p2MessageElement.textContent = '';
                mainMessegeElement.textContent = 'Congratulations player 1! You have won the game!'
        } else if (winner === 'p2') {
                p1ButtonElement.classList.add('hidden');
                p2ButtonElement.classList.add('hidden');
                leftShipEls.forEach(cell => {
                        cell.classList.remove('covered-board');
                });
                leftGridElement.classList.remove('custom-cursor');
                rightShipEls.forEach(cell => {
                        cell.classList.remove('covered-board');
                });
                leftGridElement.classList.remove('custom-cursor');
                p1MessageElement.textContent = '';
                p2MessageElement.textContent = 'You won!';
                mainMessegeElement.textContent = 'Congratulations player 2! You have won the game!'
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
                    } else if (leftGrid[row][col] === 3) {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = 'X';
                        flatLeftGrid[index] = 3;
                        //This signifies a miss 
                    } else if (leftGrid[row][col] === 4) {
                       cellEl.classList.add('ship');
                       cellEl.textContent = ''; 
                        flatLeftGrid[index] = 4;
                        let bug = document.createElement('img');
                        if (cellEl.classList.contains('Assassin')) {
                                bug.src = './Assets/bugs/carrier.png'
                        } else if (cellEl.classList.contains('Stag')) {
                                bug.src = './Assets/bugs/battleship.png'
                        } else if (cellEl.classList.contains('Leafmimic')) {
                                bug.src = './Assets/bugs/destroyer.png'
                        } else if (cellEl.classList.contains('Stinker')) {
                                bug.src = './Assets/bugs/submarine.png'
                        } else if (cellEl.classList.contains('Ladybird')) {
                                bug.src = './Assets/bugs/patrol.png'
                        };
                        bug.classList.add('bug');
                        cellEl.classList.add('shipwreck');
                        cellEl.appendChild(bug); 
                    } else {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = '';
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
                       let bug = document.createElement('img');
                        if (cellEl.classList.contains('Assassin')) {
                                bug.src = './Assets/bugs/carrier.png'
                        } else if (cellEl.classList.contains('Stag')) {
                                bug.src = './Assets/bugs/battleship.png'
                        } else if (cellEl.classList.contains('Leafmimic')) {
                                bug.src = './Assets/bugs/destroyer.png'
                        } else if (cellEl.classList.contains('Stinker')) {
                                bug.src = './Assets/bugs/submarine.png'
                        } else if (cellEl.classList.contains('Ladybird')) {
                                bug.src = './Assets/bugs/patrol.png'
                        };
                        bug.classList.add('bug');
                        cellEl.appendChild(bug); 
                        cellEl.classList.add('shipwreck');
                    } else {
                        cellEl.classList.add('not-ship');
                        cellEl.textContent = '';
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
                cell.classList.add('covered-board')});
                turn = '';
                p2ButtonElement.classList.remove('hidden');
        } else if (turn === 'p2') {
                rightShipEls.forEach(cell => {
                cell.classList.add('covered-board')});
                turn = '';
                p1ButtonElement.classList.remove('hidden');
        };
};

const handleLeftClick = (event) => {
cellRow = event.target.id[1];
cellCol = event.target.id[2];
        if (turn === 'p1') {return}
        else if (turn === 'p2') {
                if (leftGrid[cellRow][cellCol] === 0) {
                        leftGrid[cellRow][cellCol] = 3;
                        mainMessegeElement.textContent = ``;
                        p2MessageElement.textContent = 'Miss!'
                        leftGridElement.classList.remove('custom-cursor');
                        rightGridElement.classList.remove('custom-cursor');
                        render()
                        p1ShipSunk();
                        p2ShipSunk();
                        hitTally();
                        switchPlayer();
                        winningShot();
                } else if (leftGrid[cellRow][cellCol] === 1) {
                        leftGrid[cellRow][cellCol] = 2;
                        mainMessegeElement.textContent = ``;
                        p2MessageElement.textContent = 'Hit!'
                        leftGridElement.classList.remove('custom-cursor');
                        rightGridElement.classList.remove('custom-cursor');
                        render();
                        p1ShipSunk();
                        p2ShipSunk();
                        hitTally();
                        switchPlayer();
                        winningShot();
                } else {return};
        };
};

const handleRightClick = (event) => {
cellRow = event.target.id[1];
cellCol = event.target.id[2];
        if (turn === 'p2') {return}
        else if (turn === 'p1') {
                if (rightGrid[cellRow][cellCol] === 0) {
                        rightGrid[cellRow][cellCol] = 3;
                        mainMessegeElement.textContent = ``;
                        p1MessageElement.textContent = 'Miss!';
                        leftGridElement.classList.remove('custom-cursor');
                        rightGridElement.classList.remove('custom-cursor');
                        render();
                        p1ShipSunk();
                        p2ShipSunk();
                        hitTally();
                        switchPlayer();
                        winningShot();
                } else if (rightGrid[cellRow][cellCol] === 1) {
                        rightGrid[cellRow][cellCol] = 2;
                        mainMessegeElement.textContent = ``;
                        p1MessageElement.textContent = 'Hit!';
                        leftGridElement.classList.remove('custom-cursor');
                        rightGridElement.classList.remove('custom-cursor');
                        render();
                        p1ShipSunk();
                        p2ShipSunk();
                        hitTally();
                        switchPlayer();
                        winningShot();
                } else {return};
        };
};

const render = () => {
        updateBoard();
};

//SHIP SUNK FUNCTIONS:
const checkSunkSquares = (boatsunk, boatarr, grid, boat, playershipssunk, boardCells, gridarr, flatgrid) => {
         boatarr.forEach((cell, index) => {
                        gridarr.push(flatgrid[cell]);
                        boatsunk = gridarr.every((cell) => {
                                return cell === 2;})                          
                });
                const ifSunk = (boatsunk, boatarr, grid, boat, playershipssunk, boardCells) => {
                        if (boatsunk) {
                                boatarr.forEach((cell) => {
                                let firstDigit;
                                let secondDigit;
                                const testing = cell.toString(10).split('')
                                        if (testing.length === 1) {
                                                firstDigit = 0;
                                                secondDigit = parseInt(testing[0]);
                                        } else {
                                                firstDigit = parseInt(testing[0]);
                                                secondDigit = parseInt(testing[1]);
                                         };
                                grid[firstDigit][secondDigit] = 4;
                                boardCells[cell].classList.add(boat);
                                });
                                if (turn === 'p1') {
                                        p2ShipsSunk += 1;
                                        p1MessageElement.textContent = `You captured their ${boat}!`;
                                } else if (turn === 'p2') {
                                        p1ShipsSunk += 1;
                                        p2MessageElement.textContent = `You captured their ${boat}!`;
                                };
                        render();
                        };
                };
        ifSunk(boatsunk, boatarr, grid , boat, playershipssunk, boardCells);
};

const p1ShipSunk = () => {
        let leftGridCarrierArr = [];
        let leftGridBattleshipArr = [];
        let leftGridDestroyerArr = [];
        let leftGridSubmarineArr = [];
        let leftGridPatrolBoatArr = [];
        checkSunkSquares(p1CarrierSunk, p1Carrier.arr,leftGrid, 'Assassin', p1ShipsSunk, leftCellEls, leftGridCarrierArr, flatLeftGrid );
        checkSunkSquares(p1BattleshipSunk, p1Battleship.arr,leftGrid, 'Stag', p1ShipsSunk, leftCellEls, leftGridBattleshipArr, flatLeftGrid);
        checkSunkSquares(p1DestroyerSunk, p1Destroyer.arr,leftGrid, 'Leafmimic', p1ShipsSunk, leftCellEls, leftGridDestroyerArr, flatLeftGrid);
        checkSunkSquares(p1SubmarineSunk, p1Submarine.arr,leftGrid, 'Stinker', p1ShipsSunk, leftCellEls, leftGridSubmarineArr, flatLeftGrid);
        checkSunkSquares(p1PatrolBoatSunk, p1PatrolBoat.arr,leftGrid, 'Ladybird', p1ShipsSunk, leftCellEls, leftGridPatrolBoatArr, flatLeftGrid);
};

const p2ShipSunk = () => {
        let rightGridCarrierArr = [];
        let rightGridBattleshipArr = [];
        let rightGridDestroyerArr = [];
        let rightGridSubmarineArr = [];
        let rightGridPatrolBoatArr = [];
        checkSunkSquares(p2CarrierSunk, p2Carrier.arr, rightGrid, 'Assassin', p2ShipsSunk, rightCellEls, rightGridCarrierArr, flatRightGrid);
        checkSunkSquares(p2BattleshipSunk, p2Battleship.arr, rightGrid, 'Stag', p2ShipsSunk, rightCellEls, rightGridBattleshipArr, flatRightGrid);
        checkSunkSquares(p2DestroyerSunk, p2Destroyer.arr, rightGrid, 'Leafmimic', p2ShipsSunk, rightCellEls, rightGridDestroyerArr, flatRightGrid);
        checkSunkSquares(p2SubmarineSunk, p2Submarine.arr, rightGrid, 'Stinker', p2ShipsSunk, rightCellEls, rightGridSubmarineArr, flatRightGrid);
        checkSunkSquares(p2PatrolBoatSunk, p2PatrolBoat.arr, rightGrid, 'Ladybird', p2ShipsSunk, rightCellEls, rightGridPatrolBoatArr, flatRightGrid);
};

const randomShipBoards = () => {
        let index = 0;
        let rowIndex = 10;
        let colIndex = 10;
        let piecesPlaced = 0;
        const placeShip = (ship, size, grid) => {
                let orientation = Math.floor(Math.random() * 2);
                //this is for vertical placement
                if (orientation === 0) {
                ship.horizontal = false;
                index = 0;
                rowIndex = 10;
                colIndex = 10;
                let correctPlacement = false;
                let furtherCorrectPlacement = false;
                let finalCorrectPlacement = false;
                        while (correctPlacement === false || furtherCorrectPlacement === false || finalCorrectPlacement === false) {
                        correctPlacement = false;
                        furtherCorrectPlacement = false;
                        finalCorrectPlacement = false;
                        const generateNumber = () => {
                                        index = Math.floor(Math.random() * 100);
                                        const testing = index.toString().split('')
                                        if (testing.length === 1) {
                                                rowIndex = 0;
                                                colIndex = parseInt(testing[0]);
                                        } else {
                                                rowIndex = parseInt(testing[0]);
                                                colIndex = parseInt(testing[1]);
                                        };   
                                };
                                generateNumber()
                                while ((rowIndex > width - size)) {
                                        generateNumber();
                                };
                                const checkPlacement = (ship, size, grid) => {
                                        let placementCount = 0;
                                        let theRowIndex = rowIndex;
                                        for (let cell=0; cell<size; cell++) {
                                                if (grid[theRowIndex][colIndex]) {
                                                        placementCount = 0;
                                                        return;
                                                } else {
                                                        placementCount++;
                                                        theRowIndex++;
                                                        if (placementCount === size) {
                                                        correctPlacement = true;                                                        
                                                        const furtherCheck = (ship, size, grid) => {
                                                        let furtherplacementCount = 0;
                                                                let furtherRIndex = rowIndex;
                                                                for (let cell=0; cell<size; cell++) {
                                                                        if (colIndex === 9) {
                                                                                if (grid[furtherRIndex][colIndex - 1]) {
                                                                                        furtherplacementCount = 0;
                                                                                        furtherCorrectPlacement = false;
                                                                                        return;
                                                                                } else {
                                                                                        furtherRIndex++;
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        };
                                                                                };
                                                                        } else if (colIndex === 0) {
                                                                                if (grid[furtherRIndex][colIndex + 1]) {
                                                                                        furtherplacementCount = 0;
                                                                                        furtherCorrectPlacement = false;
                                                                                        return;
                                                                                } else {
                                                                                        furtherRIndex++;
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        };
                                                                                };
                                                                        } else {
                                                                                if ((grid[furtherRIndex][colIndex + 1]) ||
                                                                                (grid[furtherRIndex][colIndex - 1])) {
                                                                                furtherplacementCount = 0;
                                                                                furtherCorrectPlacement = false;
                                                                                return;  
                                                                                } else {
                                                                                        furtherRIndex++
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        };
                                                                                };
                                                                        };
                                                                };
                                                        };
                                                        const finalCheck = (ship, size, grid) => {
                                                                let finalRIndex = rowIndex;
                                                                        if (rowIndex + (size-1) === 9) {
                                                                                if (grid[finalRIndex - 1][colIndex]) {
                                                                                        return;
                                                                                } else {
                                                                                        finalCorrectPlacement = true;
                                                                                        };
                                                                        } else if (rowIndex === 0) {
                                                                                if (grid[finalRIndex + size][colIndex]) {
                                                                                        return;
                                                                                } else {
                                                                                        finalCorrectPlacement = true;
                                                                                } 
                                                                        } else {
                                                                                if ((grid[finalRIndex + size][colIndex]) ||
                                                                                (grid[finalRIndex - 1][colIndex])) {
                                                                                return;  
                                                                                } else {
                                                                                        finalCorrectPlacement = true;
                                                                                        };
                                                                        };
                                                        };        
                                                furtherCheck(ship, size, grid);
                                                finalCheck(ship, size, grid);
                                                };
                                        };
                                                
                                        };
                                };
                                checkPlacement(ship, size, grid);
                        };
                                        const placePiece = (ship, size, grid) => {
                                                if (finalCorrectPlacement) {
                                                        for (let cell=0; cell<size; cell++) {
                                                        grid[rowIndex][colIndex] = 1;
                                                        ship.arr[cell] = index;
                                                        rowIndex++;
                                                        index += 10;
                                                        piecesPlaced++;
                                                        };
                                                };
                                        };
                        placePiece(ship, size, grid);
                } else {
                //this is for horizontal placement
                ship.horizontal = true;
                index = 0;
                rowIndex = 10;
                colIndex = 10;
                let correctPlacement = false;
                let furtherCorrectPlacement = false;
                let finalCorrectPlacement = false;
                while (correctPlacement === false || furtherCorrectPlacement === false || finalCorrectPlacement === false) {
                correctPlacement = false;
                furtherCorrectPlacement = false;
                finalCorrectPlacement = false;
                                const generateNumber = () => {
                                        index = Math.floor(Math.random() * 100); 
                                        const testing = index.toString().split('')
                                        if (testing.length === 1) {
                                                rowIndex = 0;
                                                colIndex = parseInt(testing[0]);
                                        } else {
                                                rowIndex = parseInt(testing[0]);
                                                colIndex = parseInt(testing[1]);
                                        };   
                                };
                        generateNumber()
                                        while ((colIndex > width - size)) {
                                                generateNumber();
                        };
                                const checkPlacement = (ship, size, grid) => {
                                        let placementCount = 0;
                                        let columnIndex = colIndex;
                                        for (let cell=0; cell<size; cell++) {
                                                if ((grid[rowIndex][columnIndex])) {
                                                        placementCount = 0;
                                                        return;
                                                } else {
                                                        placementCount++;
                                                        columnIndex++;
                                                        if (placementCount === size - 1) {
                                                        correctPlacement = true;
                                                        const furtherCheck = (ship, size, grid) => {
                                                        let furtherplacementCount = 0;
                                                                let furtherCIndex = colIndex;
                                                                for (let cell=0; cell<size; cell++) {
                                                                        if (rowIndex === 9) {
                                                                                if (grid[rowIndex - 1][furtherCIndex]) {
                                                                                        furtherplacementCount = 0;
                                                                                        furtherCorrectPlacement = false;
                                                                                        return;
                                                                                } else {
                                                                                        furtherCIndex++;
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        };
                                                                                };
                                                                        } else if (rowIndex === 0) {
                                                                                if (grid[rowIndex + 1][furtherCIndex]) {
                                                                                        furtherplacementCount = 0;
                                                                                        furtherCorrectPlacement = false;
                                                                                        return;
                                                                                } else {
                                                                                        furtherCIndex++;
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        furtherCorrectPlacement = false;
                                                                                        };
                                                                                };
                                                                        } else {
                                                                                if ((grid[rowIndex + 1][furtherCIndex]) ||
                                                                                (grid[rowIndex - 1][furtherCIndex])) {
                                                                                furtherplacementCount = 0;
                                                                                furtherCorrectPlacement = false;
                                                                                return;  
                                                                                } else {
                                                                                        furtherCIndex++
                                                                                        furtherplacementCount++;
                                                                                        if (furtherplacementCount === size) {
                                                                                        furtherCorrectPlacement = true;
                                                                                        };
                                                                                };
                                                                        };
                                                                };
                                                        };
                                                        const finalCheck = (ship, size, grid) => {
                                                        let finalCIndex = colIndex;
                                                                if (colIndex + (size-1) === 9) {
                                                                        if (grid[rowIndex][finalCIndex - 1]) {
                                                                                return;
                                                                        } else {
                                                                                finalCorrectPlacement = true;
                                                                                };
                                                                } else if (colIndex === 0) {
                                                                        if (grid[rowIndex][finalCIndex + size]) {
                                                                                return;
                                                                        } else {
                                                                                finalCorrectPlacement = true;
                                                                        } 
                                                                } else {
                                                                        if ((grid[rowIndex][finalCIndex + size]) ||
                                                                        grid[rowIndex][finalCIndex - 1]) {
                                                                        return;  
                                                                        } else {
                                                                                finalCorrectPlacement = true;
                                                                                };
                                                                };
                                                        };
                                                        furtherCheck(ship, size, grid);
                                                        finalCheck(ship, size, grid);
                                                        };
                                                };
                                        };
                                };
                        checkPlacement(ship, size, grid);                                     
                };
                                const placePiece = (ship, size, grid) => {
                                        if (finalCorrectPlacement) {
                                                for (let cell=0; cell<size; cell++) {
                                                grid[rowIndex][colIndex] = 1;
                                                ship.arr[cell] = index;
                                                colIndex++;
                                                index++;
                                                piecesPlaced++;
                                                };
                                        };
                                };
                placePiece(ship, size, grid); 
        };
};
p1Ships.forEach(ship => placeShip(ship, ship.size, leftGrid))
p2Ships.forEach(ship => placeShip(ship, ship.size, rightGrid))
};

const resetGame = () => {
        rightCellEls.forEach(cell => {
                cell.classList.remove('ship');
                cell.classList.remove('not-ship');
                cell.textContent = '';
                cell.classList.remove('covered-board');
                cell.classList.remove('Assassin');
                cell.classList.remove('Stag');
                cell.classList.remove('Leafmimic');
                cell.classList.remove('Stinker');
                cell.classList.remove('Ladybird');
                cell.classList.remove('shipwreck');
        });
        rightGridElement.classList.add('custom-cursor');
        p1MessageElement.textContent = '';
        p2MessageElement.textContent = '';
        mainMessegeElement.textContent = '';
        leftCellEls.forEach(cell => {
                cell.classList.remove('ship')
                cell.classList.remove('not-ship');
                cell.textContent = ''
                cell.classList.remove('covered-board');
                cell.classList.remove('Assassin');
                cell.classList.remove('Stag');
                cell.classList.remove('Leafmimic');
                cell.classList.remove('Stinker');
                cell.classList.remove('Ladybird');
                cell.classList.remove('shipwreck');
        });
        leftGridElement.classList.remove('custom-cursor');
        p2ButtonElement.classList.add('hidden');
        p1ButtonElement.classList.add('hidden');
};

const init = () => {
        leftGrid =     [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]]
        rightGrid =    [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]]
        randomShipBoards();     
        p1Hits = 0;
        p2Hits = 0;
        p1ShipsSunk = 0;
        p2ShipsSunk = 0;
        turn = 'p1';
        winner = false;
        mainMessegeElement.textContent = `Player 1 take your turn.`
        flatLeftGrid = leftGrid.flat();
        flatRightGrid = rightGrid.flat();
        render()
        rightShipEls = document.querySelectorAll('.right-cell.ship');
        rightShipEls.forEach(cell => {
                cell.classList.add('covered-board')});
        leftGridElement.classList.remove('custom-cursor');

};

const createDomElements = () => {
        leftCellEls = document.querySelectorAll('#left-grid div');
        rightCellEls = document.querySelectorAll('#right-grid div');
        columnElements.forEach(col => {col.classList.remove('hidden')})
        leftCellEls.forEach(cell => {cell.addEventListener('click', handleLeftClick)
        });
        rightCellEls.forEach(cell => {cell.addEventListener('click', handleRightClick)
        });

};

const gameActivate = () => {
        if (gameActive === false) {
                return} else {
                createGrid();
                createDomElements();
                init();
                render();
                }
};


/*----------------------------- Event Listeners -----------------------------*/


//Event listener for the P1 button of the game:
p1ButtonElement.addEventListener('click', (event) => {
        if (turn) {return
        } else {leftShipEls.forEach(cell => {
        cell.classList.remove('covered-board')})
        leftGridElement.classList.remove('custom-cursor');
        rightGridElement.classList.add('custom-cursor');
        p1ButtonElement.classList.add('hidden');
        turn = 'p1';
        p1MessageElement.textContent = '';
        p2MessageElement.textContent = '';
        mainMessegeElement.textContent = `Player 1 take your turn.`
        };
});

//Event listener for the P2 button of the game:
p2ButtonElement.addEventListener('click', (event) => {
        if (turn) {return
        } else {rightShipEls.forEach(cell => {
        cell.classList.remove('covered-board')})
        rightGridElement.classList.remove('custom-cursor');
        leftGridElement.classList.add('custom-cursor');
        p2ButtonElement.classList.add('hidden');
        turn = 'p2';
        p1MessageElement.textContent = '';
        p2MessageElement.textContent = '';
        mainMessegeElement.textContent = `Player 2 take your turn.`
        };
});

//Event listener for the start button of the game:
startButtonElement.addEventListener('click', (event) => {
        gameActive = true;
        gameActivate();
        startButtonElement.classList.add('hidden');
        resetButtonElement.classList.remove('hidden');
});

resetButtonElement.addEventListener('click', (event) => {
        resetGame();
        init();     
});

instructionsButtonElement.addEventListener('click', () => {
        instructionsElement.classList.toggle('hidden');
})

