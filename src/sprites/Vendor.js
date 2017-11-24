import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, pnjId, player }) {
    super(game, x, y, asset)
    this.player = player
    this.buyDescribe = null
    this.buy = false
    this.game = game
    this.nbCollid = 2
    this.info = null
    this.anchor.setTo(1)
    this.scale.setTo(1)
    this.game.physics.arcade.enable(this)
    this.body.bounce.y = 0
    this.body.mass = 0
    this.body.gravity.y = 0
    this.body.gravity.x = 0
    this.body.velocity.x = 0
    this.body.collideWorldBounds = true
    this.body.immovable = true
    this.body.setSize(30, 50, 17, 35)
    this.speech = this.game.cache.getJSON('speechPnj')
    Object.keys(this.speech).map((perso) => {
      if (perso === pnjId) {
        this.info = this.speech[perso]
      }
    })

    this.body.onCollide = new Phaser.Signal()
    this.body.onCollide.add(this.dialog, this)
  }

  dialog (pnj, player) {
    if (player.key === 'player') {
      if (this.nbCollid % 2 === 0 || this.buy) {
        this.openDialog()
        this.game.input.keyboard.onDownCallback = (e) => {
          if (e.keyCode === 13 && this.game.paused) {
            this.buy = false
            console.log(this.buy)
            this.closeDialog()
          }
        }
      }
      this.nbCollid++
    }
  }

  openPnjInventory () {
    console.log('Open inventory PNj')
    this.bg = this.game.add.sprite(this.game.camera.x + 200, 210, 'inventory')
    this.bg.scale.setTo(0.5)
    this.bg.fixedToCamera = true

    this.potion = this.game.add.sprite(this.game.camera.x + 250, 300, 'potion')
    this.potion.scale.setTo(0.2)
    this.potion.fixedToCamera = true

    this.potion.inputEnabled = true
    this.potion.events.onInputDown.add(this.buyPotion, this)
  }

  closePnjInventory () {
    console.log('Close PNJ INVENTORY')
    this.bg.destroy()
    if (this.potion) {
      this.potion.destroy()
    }
  }

  openDialog () {
    if (this.game.paused === false) {
      console.log('Open Dialog')
      this.player.inventory.openInventory()
      if (this.buy === false) {
        this.openPnjInventory()
      }
      this.game.openByPnj = true
      this.game.paused = true
      this.vendorSpeech = this.game.add.text(this.game.camera.x + (this.game.width / 2), this.game.camera.y + (this.game.width / 2), this.info.text, { font: '30px Arial', fill: '#fff' })
      this.vendorSpeech.anchor.setTo(0.5, 0.5)
      this.vendorSpeech.setTextBounds(0, 100, 800, 100)
    }
  }

  closeDialog () {
    this.game.openByPnj = false
    this.game.paused = false
    this.player.inventory.closeInventory()
    this.vendorSpeech.destroy()
    if (this.buy === false) {
      this.closePnjInventory()
    }
    if (this.buyDescribe) {
      setTimeout(() => {
        this.buyDescribe.destroy()
      }, 2000)
    }
  }

  buyPotion () {
    if (this.player.stuff.gold && this.player.stuff.gold > 0) {
      this.player.stuff.gold--
      this.player.stuff.potion++
      this.buy = true

      this.buyDescribe = this.game.add.text(this.game.camera.width / 2, this.game.camera.width / 2, 'Vous avez acheter une 1 Potion', { font: '30px Arial', fill: '#fff' })
      this.buyDescribe.anchor.setTo(0.5, 0.5)
      this.buyDescribe.setTextBounds(0, 100, 800, 100)
      this.buyDescribe.fixedToCamera = true
      this.closeDialog()
      this.openDialog()
    }
  }
}