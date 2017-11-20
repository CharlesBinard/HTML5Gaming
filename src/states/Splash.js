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
    this.load.tilemap('map1', 'assets/map1/map1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('map1Tiles1', 'assets/map1/tiles1.png')
    this.load.image('map1Tiles2', 'assets/map1/tiles2.png')
    this.load.image('map1Tiles3', 'assets/map1/tiles3.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')
  }

  create () {
    this.state.start('Game')
  }
}
