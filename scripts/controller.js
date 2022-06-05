export class Controller {
  constructor(player) {
    this.player = player;
    this.keyDownEvent = addEventListener('keydown', ({code}) => this.onKeyDown(code));
    this.keyUpEvent = addEventListener('keyup', ({code}) => this.onKeyUp(code));
  }

  onKeyDown(code) {
    switch (code) {
      case 'KeyD':
        this.player.velocity.x = 20;
        break;
      case 'KeyA':
        this.player.velocity.x = -20;
        break;
      case 'Space':
        this.player.velocity.y = this.player.isOnPlatform ? -50 : 0;
        break;
    }
  }

  onKeyUp(code) {
    switch (code) {
      case 'KeyD':
      case 'KeyA':
        this.player.velocity.x = 0;
        break;
    }
  }
}
