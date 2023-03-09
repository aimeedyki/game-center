<template>
  <div>
    <h1 class="game-title">Tic Tac Toe</h1>
    <div v-if="!hasSelectedMarker">
      <h3>Please choose a marker</h3>
      <div class="tictactoe-select">
        <input type="radio" id="x" value="X" v-model="userMarker" />
        <label for="one">X</label>
      </div>
      <div class="tictactoe-select">
        <input type="radio" id="o" value="O" v-model="userMarker" />
        <label for="two">O</label>
      </div>
      <div class="proceed-button__container">
        <Button :onClick="setHasSelectedMarker" :label="'Proceed'" />
      </div>
    </div>
    <div class="game-view" v-else>
      <div class="tictactoe-board">
        <div v-for="(n, i) in 3">
          <div v-for="(n, j) in 3">
            <Cell @click="doPlayerMove(i, j)" :value="board[i][j]"></Cell>
          </div>
        </div>
      </div>
      <div>
        <h3
          v-if="gameOverText"
          :class="{ 'game-over': !isUsersWin, 'user-win': isUsersWin }"
        >
          {{ gameOverText }}
        </h3>
        <div v-else>
          <h3 v-if="isUserTurn">Your turn!</h3>
          <h3 v-else>Computer's turn!</h3>
        </div>
      </div>
      <div v-show="showReplay" class="proceed-button__container">
        <Button :onClick="clearGame" :label="'Play Again'" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Button from "../components/Button.vue";
import Cell from "../components/Cell.vue";

export default {
  data() {
    return {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      gameOverText: "",
      hasSelectedMarker: false,
      isUserTurn: true,
      isUsersWin: false,
      showReplay: false,
      userMarker: "X",
    };
  },

  components: {
    Button,
    Cell,
  },

  methods: {
    clearGame() {
      this.hasSelectedMarker = false;
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      this.isUserTurn = true;
      this.isUsersWin = false;
      this.showReplay = false;
      this.gameOverText = "";
    },
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

      if (this.isWinner(this.userMarker)) {
        this.gameOverText = "Congratulations You won!";
        this.showReplay = true;
        this.isUsersWin = true;
      } else if (this.isGameOver()) {
        this.gameOverText = "Game Over! Nobody wins!";
        this.showReplay = true;
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
      if (this.isWinner(computerMarker)) {
        this.gameOverText = "You Lost!";
        this.showReplay = true;
      } else if (this.isGameOver()) {
        this.gameOverText = "Game Over! Nobody wins!";
        this.showReplay = true;
      } else {
        this.isUserTurn = true;
      }
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
    getRandomMove() {
      const emptyCells = this.getEmptyCells();
      const randomMoveIndex = Math.floor(Math.random() * emptyCells.length);

      return emptyCells[randomMoveIndex];
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
    setHasSelectedMarker() {
      this.hasSelectedMarker = true;
    },
  },
};
</script>
<style>
input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #758e4f;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.game-over {
  color: #b4450a;
}

.game-title {
  margin-bottom: 10px;
  text-align: center;
}

.game-view {
  display: flex;
  flex-direction: column;
  place-content: center;
  text-align: center;
}

.proceed-button__container {
  margin-top: 30px;
}

.tictactoe-board {
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  width: 192px;
  height: 204px;
}

.tictactoe-select {
  margin: 8px 16px;
}

.tictactoe-select label {
  margin: 10px;
  font-size: 20px;
}

.user-win {
  color: #758e4f;
}
</style>
