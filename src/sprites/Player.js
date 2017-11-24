import Phaser from 'phaser'
import Inventory from './Inventory'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.anchor.setTo(2)
    this.scale.setTo(1)
    this.game.physics.arcade.enable(this)

    this.stuff = {
      potion: 0,
      gold: 0
    }
    this.speed = 300
    this.body.bounce.y = 0
    this.body.gravity.y = 0
    this.body.gravity.x = 0
    this.body.velocity.x = 0
    this.body.collideWorldBounds = true
    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    this.inventory = new Inventory({
      game: this.game,
      player: this
    })
    this.body.setSize(30, 20, 13, 30)
    this.initMouvement()
    this.initAnimation()
    this.animations.play('bottom')
    this.animations.stop()
  }

  update () {
    this.body.velocity.y = 0
    this.body.velocity.x = 0
    if (this.upButton.isDown) {
      this.animations.play('top')
      this.body.velocity.y = -this.speed
    } else if (this.downButton.isDown) {
      this.animations.play('bottom')
      this.body.velocity.y = this.speed
    } else if (this.leftButton.isDown) {
      this.animations.play('left')
      this.body.velocity.x = -this.speed
    } else if (this.rightButton.isDown) {
      this.animations.play('right')
      this.body.velocity.x = this.speed
    } else {
      this.animations.stop()
    }
    this.inventory.update()
  }

  initMouvement () {
    this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT])
  }

  initAnimation () {
    this.animations.add('left', [208, 209, 210, 211, 212, 213, 214, 215], 20, true)
    this.animations.add('right', [254, 255, 256, 257, 258, 259, 260], 20, true)
    this.animations.add('bottom', [232, 233, 234, 235, 236, 237, 238], 20, true)
    this.animations.add('top', [185, 186, 187, 188, 189, 190, 191, 192], 20, true)
  }
}
