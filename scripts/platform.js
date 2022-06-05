import { Sprite } from './sprite.js';

export class Platform extends Sprite {
  constructor(ctx, width, height, x, y, image) {
    super(ctx, width, height, x, y, image);
    this.color = '#ffbe33';
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
