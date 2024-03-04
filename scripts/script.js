import { PLAYER1, PLAYER2, SuperTicTacToe } from "./super-tic-tac-toe.js"

const superTicTacToe = new SuperTicTacToe()

function select(event) {

    const outerPosition = Number(event.target.parentNode.id)
    const innerPosition = Number(event.target.id)

    const outerslots = document.getElementsByClassName('outerslot')

    for (let outslot of outerslots)
        outslot.style.backgroundColor = 'rgba(0, 0, 0, 0)'

    if (superTicTacToe.select(outerPosition, innerPosition)) {

        const outerslot = outerslots[outerPosition]
        const innerslot = outerslot.getElementsByClassName('innerslot')[innerPosition]
        const turnDiv = document.getElementById('turn')
        
        innerslot.classList.add(superTicTacToe.turn == PLAYER1 ? 'circle' : 'cross')
        turnDiv.classList = superTicTacToe.turn == PLAYER1 ? 'cross' : 'circle'

        if (superTicTacToe.boards[outerPosition].winner) {
            outerslot.classList.add(superTicTacToe.boards[outerPosition].winner == PLAYER1 ? 'cross' : 'circle')
        }

    }

    if (superTicTacToe.winner) {
        
        for (let position of superTicTacToe.victory) {
            
            const outerslot = outerslots[position]
            
            outerslot.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
            outerslot.classList.add(superTicTacToe.turn == PLAYER2 ? 'cross' : 'circle')

        }

        return

    }

    if (superTicTacToe.position !== undefined && !superTicTacToe.boards[superTicTacToe.position].winner && !superTicTacToe.boards[superTicTacToe.position].tie)
        return outerslots[superTicTacToe.position].style.backgroundColor = 'rgba(0, 0, 0, 0.05)'

    for (let [ position, board ] of superTicTacToe.boards.entries()) {
        if (!board.winner && !board.tie) {
            outerslots[position].style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
        }
    }

}

window.onload = function() {

    const innerSlots = document.getElementsByClassName('innerslot')
    
    for (let innerslot of innerSlots) {
        innerslot.onclick = select
    }

}