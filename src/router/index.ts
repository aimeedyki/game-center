import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Sudoku from "../views/Sudoku.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/sudoku", name: "Sudoku", component: Sudoku },
    {
      path: "/tic-tac-toe",
      name: "Tic Tac Toe",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/TicTacToe.vue"),
    },
  ],
});

export default router;
