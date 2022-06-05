export class Player {
  constructor(ctx, platforms, background) {
    this.ctx = ctx;
    this.platforms = platforms;
    this.background = background;
    this.width = 100;
    this.height = 100;
    this.pos = {x: 100, y: 100};
    this.velocity = {x: 0, y: 0};
    this.color = 'red';
    this.isOnPlatform = false;
    this.isDead = false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.move();
    this.fall();
    this.draw();
  }

  move() {
    const platformInCollision = this.platforms.find(platform =>
      this.pos.y < platform.pos.y + platform.height &&
      this.pos.y + this.height > platform.pos.y &&
      this.pos.x + this.width + this.velocity.x >= platform.pos.x &&
      this.pos.x + this.velocity.x <= platform.pos.x + platform.width
    );
    if (platformInCollision) {
      if (this.pos.x >= platformInCollision.pos.x + platformInCollision.width) {
        this.pos.x = platformInCollision.pos.x + platformInCollision.width;
      } else {
        this.pos.x = platformInCollision.pos.x - this.width;
      }
    } else {
      if (this.pos.x + this.width + this.velocity.x < innerWidth / 2 && this.pos.x + this.velocity.x > innerWidth / 4) {
        this.pos.x += this.velocity.x;
      } else {
        if (this.pos.x + this.velocity.x <= innerWidth / 4) {
          this.pos.x = innerWidth / 4;
        } else {
          this.pos.x = innerWidth / 2 - this.width;
        }
        this.platforms.forEach(platform => platform.pos.x -= this.velocity.x);
        this.background.pos.x -= this.velocity.x / 2;
      }
    }
  }

  fall() {
    const platformInCollision = this.platforms.find(platform =>
      this.pos.y + this.height === platform.pos.y &&
      this.pos.x + this.width > platform.pos.x &&
      this.pos.x < platform.pos.x + platform.width
    );

    if (
      this.pos.y + this.height <= innerHeight &&
      !platformInCollision
    ) {
      this.velocity.y += this.velocity.y < 50 ? 5 : 0;
    }

    const newPlatformInCollision = this.platforms.find(platform =>
      this.pos.y + this.height + this.velocity.y >= platform.pos.y &&
      this.pos.y + this.height <= platform.pos.y &&
      this.pos.x + this.width > platform.pos.x &&
      this.pos.x < platform.pos.x + platform.width
    );

    if (this.pos.y + this.height + this.velocity.y < innerHeight && !newPlatformInCollision) {
      this.pos.y += this.velocity.y
      this.isOnPlatform = false;
    } else {
      if (newPlatformInCollision) {
        this.pos.y = newPlatformInCollision.pos.y - this.height;
      } else {
        this.isDead = true;
      }
      this.velocity.y = 0;
      this.isOnPlatform = true;
    }
  }
}
