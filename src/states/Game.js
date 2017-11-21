/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Potion from '../sprites/Potion'
import Gold from '../sprites/Gold'
import Box from '../sprites/Box'
export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.items = []
    this.box = []

    this.level = this.game.add.tilemap('map1')
    this.level.addTilesetImage('tiles1', 'map1Tiles1')
    this.level.addTilesetImage('tiles2', 'map1Tiles2')
    this.level.addTilesetImage('tiles3', 'map1Tiles3')
    this.level.addTilesetImage('tiles4', 'map1Tiles4')

    this.solLayer = this.level.createLayer('SolLayer')
    this.backgroundlayer = this.level.createLayer('BackgroundLayer')
    this.waterLayer = this.level.createLayer('WaterLayer')
    this.groundLayer = this.level.createLayer('GroundLayer')
    this.backgroundlayer2 = this.level.createLayer('BackgroundLayer2')
    this.groundLayer2 = this.level.createLayer('GroundLayer2')

    this.game.physics.arcade.enable(this.groundLayer)
    this.game.physics.arcade.enable(this.groundLayer2)
    this.game.physics.arcade.enable(this.waterLayer)

    this.level.setCollisionBetween(0, 10000, true, 'GroundLayer')
    this.level.setCollisionBetween(0, 10000, true, 'GroundLayer2')
    this.level.setCollisionBetween(0, 10000, true, 'WaterLayer')
    this.groundLayer.resizeWorld()
    this.createItems()

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player'
    })
    this.game.add.existing(this.player)

    // Change the world size to match the size of this layer
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
    this.game.physics.arcade.collide(this.player, this.groundLayer2)
    this.game.physics.arcade.collide(this.player, this.waterLayer)
    this.items.map(item => {
      this.game.physics.arcade.collide(this.player, item)
    })
    this.box.map(b => {
      this.game.physics.arcade.collide(this.player, b)
      this.game.physics.arcade.collide(b, this.groundLayer)
      this.game.physics.arcade.collide(b, this.groundLayer2)
      this.game.physics.arcade.collide(b, this.waterLayer)
    })
  }
  createItems () {
    // create items
    if (this.level.objects['ObjectLayer']) {
      const objects = this.level.objects['ObjectLayer']
      objects.forEach(object => {
        if (object.type === 'potion') {
          this.items.push(new Potion({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'potion'
          }))
        } else if (object.type === 'gold') {
          this.items.push(new Gold({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'gold'
          }))
        } else if (object.type === 'box') {
          console.log('box')
          this.box.push(new Box({
            game: this.game,
            x: object.x,
            y: object.y,
            asset: 'box'
          }))
        }
      })
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.body(this.groundLayer)
      this.game.debug.bodyInfo(this.player, 32, 32)
      this.game.debug.body(this.player)
    }
  }
}
