import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('player', 'assets/images/player.png', 65, 65)
    this.load.spritesheet('box', 'assets/images/box.png', 50, 50)
    this.load.tilemap('map1', 'assets/map1/map1.json', null, Phaser.Tilemap.TILED_JSON)

    this.load.image('map1Tiles1', 'assets/map1/tiles1.png')
    this.load.image('map1Tiles2', 'assets/map1/tiles2.png')
    this.load.image('map1Tiles3', 'assets/map1/tiles3.png')
    this.load.image('map1Tiles4', 'assets/map1/tiles4.png')
    this.load.image('potion', 'assets/images/potion.png')
    this.load.image('gold', 'assets/images/gold.png')
    this.load.image('inventory', 'assets/images/inventory.png')
    this.load.audio('gameSound', 'assets/sound/game.mp3')
    this.load.audio('drink', 'assets/sound/drink.mp3')
    this.load.audio('potion', 'assets/sound/potion.mp3')
    this.load.audio('coin', 'assets/sound/coin.mp3')

    // PNJ
    this.load.spritesheet('pnjOne', '/assets/pnj/pnjOne.png', 65, 64)
    this.load.json('speechPnj', '/assets/pnj/pnj.json')
  }

  create () {
    this.state.start('Game')
  }
}
