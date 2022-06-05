export class Sprite {
  constructor(ctx, width, height, x, y, image) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.pos = { x, y };
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
  }
}
