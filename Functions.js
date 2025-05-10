const board = document.getElementById('Board')
const state = document.getElementById('currentState')
const cells = document.querySelectorAll('[data-cell]')
const restart = document.getElementById('Restart')
let Turn = true//true = x false = o
let gameState = true
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]   
];
for (let i =0;i<cells.length;i++){
    cells[i].addEventListener('click',click)
}

restart.addEventListener('click',restartgame)

function click(e){
    let cell = e.target
    let char = Turn? "x":"o"
    if(cell.textContent !== "" || gameState===false)return
    setCharacter(cell,char)
    if(checkWin(char)){
        state.textContent = `${char.toUpperCase()} player has won!!`
        gameState = false
        return
    }
    if(isDraw()){
        state.textContent = "It is a draw";
        gameState = false;
        return
    }
    swapTurns()
}
function setCharacter(cell,char){
    cell.textContent = char
    cell.classList.add(char)
}
function currentTurn(){
    return Turn? "x":"o"
}
function currentState(){
    state.textContent = `It is ${currentTurn()}'s turn to play`;
}
function swapTurns(){
    Turn = !Turn
    currentState()
}
function checkWin(char) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(char);
        });
    });
}
function isDraw(){
    return [...cells].every(cell =>{
        return ((cell.textContent !== "")? true:false)
    });
}
function restartgame(){
    Turn = true;
    gameState = true;
    state.textContent = "It is x's turn to play";
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove('x','o')
    });
}
