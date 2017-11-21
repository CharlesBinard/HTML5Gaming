import Phaser from 'phaser'
export default class {
  constructor (item) {
    this.item = item
    item.body.onCollide = new Phaser.Signal()
    item.body.onCollide.add(this.moveItem, item)
  }

  moveItem (item, player) {
    if (player.key === 'player') {

    }
  }
}
