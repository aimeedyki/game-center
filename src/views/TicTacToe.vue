<template>
  <div>
    <div class="tictactoe-board">
      <div v-for="(n, i) in 3">
        <div v-for="(n, j) in 3">
          <Cell @click="doPlayerMove(i, j)" :value="board[i][j]"></Cell>
        </div>
      </div>
    </div>
    <div>
      <h3 v-if="gameOverText">{{ gameOverText }}</h3>
      <div v-else>
        <h3 v-if="isUserTurn">Your turn!</h3>
        <h3 v-else>Computer's turn!</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Cell from "../components/Cell.vue";

export default {
  data() {
    return {
      userMarker: "X",
      isUserTurn: true,
      gameOverText: "",
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  },

  components: {
    Cell,
  },

  methods: {
    doMove(x: number, y: number, marker: string) {
      if (this.board[x][y] !== "") {
        return;
      }
      this.board[x][y] = marker;
    },
    doPlayerMove(x: number, y: number) {
      if (!this.isUserTurn) {
        return;
      }

      this.doMove(x, y, this.userMarker);
      this.isUserTurn = false;

      if (this.isGameOver()) {
        this.gameOverText = "Game Over! Nobody wins!";
      } else if (this.isWinner(this.userMarker)) {
        this.gameOverText = "Congratulations You won!";
      } else {
        setTimeout(this.doComputerMove, 1000);
      }
    },
    doComputerMove() {
      if (this.isUserTurn) {
        return;
      }
      const computerMove = this.getRandomMove();
      const computerMarker = this.userMarker === "X" ? "O" : "X";

      this.doMove(computerMove.x, computerMove.y, computerMarker);
      if (this.isGameOver()) {
        this.gameOverText = "Game Over! Nobody wins!";
      } else if (this.isWinner(computerMarker)) {
        this.gameOverText = "You Lost!";
      } else {
        this.isUserTurn = true;
      }
    },
    getRandomMove() {
      const emptyCells = this.getEmptyCells();
      const randomMoveIndex = Math.floor(Math.random() * emptyCells.length);

      return emptyCells[randomMoveIndex];
    },
    getEmptyCells() {
      let moves = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === "") {
            moves.push({ x: i, y: j });
          }
        }
      }
      return moves;
    },
    isGameOver() {
      return this.getEmptyCells().length === 0;
    },
    isWinner(marker: string) {
      return this.playerHas3InARow(marker);
    },
    playerHas3InARow(marker: string) {
      // Horizontal rows
      for (let i = 0; i < 3; i++) {
        if (
          this.board[0][i] === marker &&
          this.board[1][i] === marker &&
          this.board[2][i] === marker
        ) {
          return true;
        }
      }

      // Vertical rows
      for (let i = 0; i < 3; i++) {
        if (
          this.board[i][0] === marker &&
          this.board[i][1] === marker &&
          this.board[i][2] === marker
        ) {
          return true;
        }
      }

      // Diagonals
      if (
        this.board[0][0] === marker &&
        this.board[1][1] === marker &&
        this.board[2][2] === marker
      ) {
        return true;
      }

      if (
        this.board[1][0] === marker &&
        this.board[1][1] === marker &&
        this.board[0][2] === marker
      ) {
        return true;
      }

      return false;
    },
  },
};
</script>
<style>
.tictactoe-board {
  display: flex;
  flex-wrap: wrap;
  width: 204px;
  height: 204px;
}
</style>
