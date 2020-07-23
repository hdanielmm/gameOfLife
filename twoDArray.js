function process_input(input) {
  //su código acá
  var params = input.split(":");

  params[0] = Function('"use strict"; return ' + params[0])();
  params[1] = parseInt(params[1]);
  
  console.table(params[0]);
  
  return board_next_step(params[0], params[1]);
}


function board_next_step(initial_board, steps) {
  let count = 0;
  let nexto = [];
  for(let i = 0; i < initial_board.length; i++) {
    nexto[i] = initial_board[i].slice();
  }

  while (count < steps) {
    console.log('count', count);
    let aux = [];
    for(let i = 0; i < nexto.length; i++) {
      aux[i] = nexto[i].slice();
    }
    console.table(aux);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    
    for (let i = 0; i < aux.length; i++) {
      for (let j = 0; j < aux[0].length; j++) {
        let state = aux[i][j];
        
        console.log(`aux[${i}][${j}]: `, aux[i][j]);
        console.log("aux entrada", aux);

        const neighbors = countNeighbors(aux, i, j);
        console.log("neighbors", neighbors);

        if (state == 0 && neighbors == 3) {
          nexto[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          nexto[i][j] = 0;
        } else {
          nexto[i][j] = state;
        }
      }
    }
    count++;
  }
  const result = nexto.join();
  return result;
}

const countNeighbors = (grid, x, y) => {
  const numberRows = grid.length;
  const numberCols = grid[0].length;

  let sum = 0;
  
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (x + i + numberRows) % numberRows;
      const col = (y + j + numberCols) % numberCols;
      if(Math.abs(col - y) < 2) {
        if(Math.abs(row -x) < 2) {
          console.log(`grid[${row}][${col}]: `, grid[row][col]);
      
          sum += grid[row][col];

        }
      }
  
    }
  }
  sum -= grid[x][y];
  return sum;
}

const input = "[[1,0,0],[0,1,1],[1,1,0]]:1";

console.log(process_input(input));