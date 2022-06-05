import { Controller } from './controller.js';
import { Platform } from './platform.js';
import { Player } from './player.js';
import level1 from '../assets/levels/level-1.json' assert {type: 'json'};
import { Sprite } from './sprite.js';

// Get canvas element from document to display the game
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Get context to draw on the canvas
const ctx = canvas.getContext('2d');

// The image for background creation
const backgroundImg = new Image();
backgroundImg.src = '../assets/images/background.webp';

let background, platforms, player, controller;

// Instantiate all game objects
function load() {
  // Background creation
  background = new Sprite(
    ctx,
    backgroundImg.width * innerHeight / backgroundImg.height,
    innerHeight,
    0,
    0,
    backgroundImg
  );
  
  // Platforms creation
  platforms = level1.platforms.map(p => new Platform(ctx, p.width, p.height, p.x, innerHeight - p.y));
  
  // Player creation
  player = new Player(ctx, platforms, background);

  // Controller creation
  controller = new Controller(player);
}

// Game loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  background.draw();
  platforms.forEach(platform => platform.draw());
  player.update();
  if (player.isDead) {
    load();
  }
}

load();
animate();
