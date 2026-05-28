
// * Punto de entada de la aplicación, se encarga de renderizar el contenido HTML y configurar el contador.
import Phaser from 'phaser';
import './style.css';
import { GameScene } from './scenes/GameScene'; 

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  backgroundColor: '#1a1a2e',
  scene: [GameScene],
  pixelArt: false,
  render: {
    antialias: true
  }
};

new Phaser.Game(config);