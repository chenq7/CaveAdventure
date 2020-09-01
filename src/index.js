import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";
import WinScreen from "./scenes/WinScreen";
import GameOver from "./scenes/GameOver";
import Shop from "./scenes/Shop";
import "./styles/reset.css";
import "./styles/index.css";

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
    },
  },
  scene: [MainMenu, Shop, Game, WinScreen, GameOver]
};

var game = new Phaser.Game(config);
