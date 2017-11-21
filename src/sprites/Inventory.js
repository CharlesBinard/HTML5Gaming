import Phaser from 'phaser'
export default class extends Phaser.State {
  constructor (player, game, stuff) {
    super()
    this.player = player
    this.game = game

    this.isOpen = false
    this.stuff = stuff
    this.tween = null
    this.popup = game.add.sprite(400, 300, 'inventory')
    this.popup.alpha = 10
    this.popup.anchor.set(1)
    this.popup.inputEnabled = true
    this.popup.input.enableDrag()
    this.popup.fixedToCamera = true

    this.game.input.keyboard.onDownCallback = (e) => {
      if (e.keyCode === 73) { // 73 = I
        if (this.isOpen) {
          this.isOpen = false
          this.close()
        } else {
          this.isOpen = true
          this.open()
        }
      }
    }
  }

  open () {
    if ((this.tween !== null && this.tween.isRunning) || this.popup.scale.x === 1) {
      return
    }
    this.tween = this.game.add.tween(this.popup.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true)
  }

  close () {
    if ((this.tween && this.tween.isRunning) || this.popup.scale.x === 0.1) {
      return
    }
    this.tween = this.game.add.tween(this.popup.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true)
  }
}
