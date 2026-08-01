// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, columns) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const rowValues = readlineSync.question(`Enter row ${i + 1}: `)
      .trim()
      .split(/\s+/)
      .map(Number);
    matrix.push(rowValues);
  }

  return matrix;
}

function displayMatrix(matrix) {
  const widths = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = String(matrix[row][col]);
      widths[col] = Math.max(widths[col] || 0, value.length);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    let line = '';

    for (let col = 0; col < matrix[row].length; col++) {
      line += String(matrix[row][col]).padEnd(widths[col] + 1);
    }

    console.log(line.trim());
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const transposed = [];

  for (let col = 0; col < columns; col++) {
    const newRow = [];
    for (let row = 0; row < rows; row++) {
      newRow.push(matrix[row][col]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

function addMatrices(matrixA, matrixB) {
  const result = [];

  for (let row = 0; row < matrixA.length; row++) {
    const newRow = [];
    for (let col = 0; col < matrixA[row].length; col++) {
      newRow.push(matrixA[row][col] + matrixB[row][col]);
    }
    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let rowA = 0; rowA < rowsA; rowA++) {
    const newRow = [];
    for (let colB = 0; colB < colsB; colB++) {
      let sum = 0;
      for (let index = 0; index < colsA; index++) {
        sum += matrixA[rowA][index] * matrixB[index][colB];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  console.log('1. Transpose a matrix');
  console.log('2. Add two matrices');
  console.log('3. Multiply two matrices');
  const choice = readlineSync.questionInt('Choose an operation (1-3): ');

  if (choice === 1) {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const columns = readlineSync.questionInt('Enter number of columns: ');
    const matrix = readMatrix(rows, columns);

    console.log('Original Matrix:');
    displayMatrix(matrix);
    console.log('Transposed Matrix:');
    displayMatrix(transposeMatrix(matrix));
  } else if (choice === 2) {
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const columns = readlineSync.questionInt('Enter number of columns: ');
    const matrixA = readMatrix(rows, columns);
    const matrixB = readMatrix(rows, columns);

    console.log('Matrix A:');
    displayMatrix(matrixA);
    console.log('Matrix B:');
    displayMatrix(matrixB);
    console.log('Sum Matrix:');
    displayMatrix(addMatrices(matrixA, matrixB));
  } else if (choice === 3) {
    const rowsA = readlineSync.questionInt('Enter number of rows for matrix A: ');
    const colsA = readlineSync.questionInt('Enter number of columns for matrix A: ');
    const rowsB = readlineSync.questionInt('Enter number of rows for matrix B: ');
    const colsB = readlineSync.questionInt('Enter number of columns for matrix B: ');

    if (colsA !== rowsB) {
      console.log('Error: The number of columns in matrix A must match the number of rows in matrix B.');
      return;
    }

    const matrixA = readMatrix(rowsA, colsA);
    const matrixB = readMatrix(rowsB, colsB);

    console.log('Matrix A:');
    displayMatrix(matrixA);
    console.log('Matrix B:');
    displayMatrix(matrixB);
    console.log('Product Matrix:');
    displayMatrix(multiplyMatrices(matrixA, matrixB));
  } else {
    console.log('Error: Invalid choice.');
  }
}

main();

