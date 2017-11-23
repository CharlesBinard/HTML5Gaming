import Phaser from 'phaser'
export default class {
  constructor (item, game) {
    this.game = game
    this.item = item
    item.body.onCollide = new Phaser.Signal()
    item.body.onCollide.add(this.deleteItem, item)
  }

  deleteItem (item, player) {
    if (player.key === 'player') {
      if (item.key === 'potion') {
        this.music = this.game.add.audio('potion')
        this.music.play()
        player.stuff.potion++
      }
      if (item.key === 'gold') {
        this.music = this.game.add.audio('coin')
        this.music.play()
        player.stuff.gold++
      }
      item.kill()
    }
  }
}
