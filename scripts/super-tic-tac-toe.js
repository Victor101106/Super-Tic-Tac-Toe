export const victories = [
    [0, 1, 2], [3, 4, 5], 
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
]

export const PLAYER1 = 'X'
export const PLAYER2 = 'O'

export class TicTacToe {

    constructor() {
        this.board   = new Array(9)
        this.victory = undefined
        this.winner  = undefined
        this.tie     = undefined
    }

}

export class SuperTicTacToe {

    constructor() {

        this.boards = new Array(9).fill(null).map(value => new TicTacToe())
        this.turn   = PLAYER1

        this.position = undefined
        this.winner   = undefined
        this.tie      = undefined 

    }

    select(outerPosition, innerPosition) {

        if (this.winner || this.tie)
            return
    
        if (this.position && outerPosition != this.position && !this.boards[this.position].winner && !this.boards[this.position].tie)
            return

        const board = this.boards[outerPosition]

        if (board.board[innerPosition])
            return

        board.board[innerPosition] = this.turn
        
        this.check(outerPosition)

        this.position = innerPosition
        
        if (!this.winner)
            this.turn = this.turn == PLAYER1 ? PLAYER2 : PLAYER1

        return true

    }

    check(outerPosition) {

        this.checkBoard(this.boards[outerPosition])

        for (let victory of victories) {

            const board1 = this.boards[victory[0]]
            const board2 = this.boards[victory[1]]
            const board3 = this.boards[victory[2]]

            const hasAnyWinner = board1.winner || board2.winner || board3.winner
            const winnerArray  = [
                board1.winner || board1.tie, 
                board2.winner || board2.tie, 
                board3.winner || board3.tie
            ].filter(value => value != true)

            let hasWinner = !!winnerArray[0]
            for (let winner of winnerArray) {
                if (winner != winnerArray[0]) {
                    hasWinner = false
                    break
                }
            }

            if (hasAnyWinner && hasWinner) {
                this.victory = victory
                this.winner = hasAnyWinner
                return true
            }

        }

        for (let board of this.boards) {
            if (!board.winner) return false
        }

        this.tie = true

    }

    checkBoard(board) {

        for (let victory of victories) {

            const position1 = board.board[victory[0]]
            const position2 = board.board[victory[1]]
            const position3 = board.board[victory[2]]

            if (position1 && position1 == position2 && position1 == position3) {
                board.winner = position1
                return true
            }

        }

        for (let position of board.board) {
            if (!position) return false
        }

        board.tie = true

    }

}