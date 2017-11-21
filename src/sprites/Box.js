import Phaser from 'phaser'
// import Item from '../lib/Item'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.anchor.setTo(1)
    this.scale.setTo(1)
    this.game.physics.arcade.enable(this)
    this.body.mass = 0
    this.body.collideWorldBonds = true

    this.game.add.existing(this)
  }
}
