let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]
let human = 'O'
let ai = 'X'

let currentPlayer = human







function setup() {
  createCanvas(450, 450);

  aiMove()
}

function eq3(a, b, c) {
  return (a == b && b == c & a != '')
}

function checkState() {
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (eq3(board[i][0], board[i][1], board[i][2])) {

      winner = board[i][0]

      
    }
  }

  for (let i = 0; i < 3; i++) {
    
    if (eq3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i]
      
    }
  }

  if (eq3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0]
  }

  if (eq3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2]
  }

  let emptySpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        emptySpots++;
      }
    }
  }

  if (winner == null && emptySpots == 0) {
    return 'tie';
  }

  return winner;

}

function move() {
  if (currentPlayer == human) {
    position = [floor(mouseX / (width / 3)), floor(mouseY / (height / 3))]
    let x = position[0]
    let y = position[1]

    if (board[x][y] == '')
      board[x][y] = human
    currentPlayer = ai;
    aiMove()
  }


}

function mouseClicked() {
  move()
}

function draw() {


  background(220);

  let w = width / 3;
  let h = height / 3;
  line(0, h, 3 * w, h);
  line(0, 2 * h, 3 * w, 2 * h)
  line(w, 0, w, 3 * h);
  line(2 * w, 0, 2 * w, 3 * h);
  line(0, 2 * h, 3 * w, 2 * h)
  for (let i = 0; i < 3; i++) {

    for (let j = 0; j < 3; j++) {

      let x = w * i + w / 2
      let y = h * j + h / 2

      let spot = board[i][j]

      if (spot == ai) {
        let xDelta = w / 5;

        line(x - xDelta, y - xDelta, x + xDelta, y + xDelta)
        line(x + xDelta, y - xDelta, x - xDelta, y + xDelta)
      } else if (spot == human) {
        noFill()
        ellipse(x, y, w / 2)
      }


    }
  }
  let winner = checkState();
  if (winner != null) {
    noLoop();
    if(winner=='X')
      alert('ai kazandı')
    else if(winner=='O')
      alert('human kazandı')
    else
      alert('berabere')
  }
}


function aiMove() {
  let move;
  let bestScore = -Infinity

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai;

        let score = minimax(board, 0, false)
        board[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = {
            i,
            j
          };
        }
      }

    }

  }
  board[move.i][move.j] = ai
  currentPlayer = human


}
let scores = {
  X: 10,
  O: -10,
  tie: 0

}


function minimax(board, depth, isMaximazing) {
  let result = checkState()
  if (result !== null) {
    return scores[result]
  }
  if (isMaximazing) {
    let bestScore = -Infinity;
    for (let i = 0; i<3;i++) {
      for (let j = 0; j<3;j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore)

        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore)

        }
      }
    }
    return bestScore;
  }
}