import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor ({game, player}) {
    super(game)
    this.inventory()
    this.stuff = player.stuff
    this.player = player
  }

  inventory () {
    this.game.input.keyboard.onPressCallback = (e) => {
      if (e === 'i' && !this.game.openByPnj) {
        if (this.game.paused === false) {
          this.openInventory()
        } else {
          this.closeInventory()
        }
      }
    }
  }

  openInventory () {
    this.player.openByPnj = false
    if (this.game.paused === false) {
      this.game.paused = true
      this.bg = this.game.add.sprite(this.game.camera.x, this.game.camera.y + 200, 'inventory')
      this.bg.scale.setTo(0.5)

      this.nameInventory = this.game.add.text(this.game.camera.x + 190, this.game.camera.y + 170, 'Inventaire', { font: '30px Arial', fill: '#000000' })
      this.nameInventory.anchor.setTo(0.5, 0.5)
      this.nameInventory.setTextBounds(0, 100, 800, 100)
      this.nameInventory.fixedToCamera = true

      this.posItem = {
        x: this.game.camera.x + 50,
        y: this.game.camera.y + 100 + 200
      }
      this.posTxt = {
        x: this.game.camera.x + 125,
        y: this.game.camera.y + 22 + 200
      }

      if (this.stuff.potion && this.stuff.potion > 0) {
        this.potion = this.game.add.sprite(this.posItem.x, this.posItem.y, 'potion')
        this.potion.scale.setTo(0.15)
        this.potion.inputEnabled = true
        this.nbPotion = this.game.add.text(this.posTxt.x, this.posTxt.y, 'X ' + this.stuff.potion, { font: '26px Arial' })
        this.nbPotion.anchor.setTo(0.5, 0.5)
        this.nbPotion.setTextBounds(0, 100, 800, 100)
        this.potion.events.onInputDown.add(this.effectPotion, this)
        this.posItem.y += 50
        this.posTxt.y += 58
      }

      if (this.stuff.gold && this.stuff.gold > 0) {
        this.coin = this.game.add.sprite(this.posItem.x, this.posItem.y, 'gold')
        this.coin.scale.setTo(0.13)
        this.nbCoin = this.game.add.text(this.posTxt.x, this.posTxt.y, 'X' + this.stuff.gold, { font: '26px Arial' })
        this.nbCoin.anchor.setTo(0.5, 0.5)
        this.nbCoin.setTextBounds(0, 100, 800, 100)
        this.posItem.y += 50
        this.posTxt.y += 58
      }
    }
  }

  closeInventory () {
    this.game.paused = false
    this.bg.destroy()
    this.nameInventory.destroy()
    if (this.potion) {
      this.potion.destroy()
      this.nbPotion.destroy()
    }
    if (this.coin) {
      this.coin.destroy()
      this.nbCoin.destroy()
    }
  }

  effectPotion () {
    if (this.stuff.potion && this.stuff.potion > 0 && !this.game.openByPnj) {
      this.closeInventory()
      this.music = this.game.add.audio('drink')
      this.music.play()
      var actualSpeed = this.player.speed
      this.player.speed += 300
      var effectText = 'Vous courez plus vite pendant 10 secondes'
      this.infoText = this.game.add.text(this.game.camera.width / 2, this.game.camera.width / 2, effectText, { font: '30px Arial', fill: '#fff' })
      this.infoText.anchor.setTo(0.5, 0.5)
      this.infoText.setTextBounds(0, 100, 800, 100)
      this.infoText.fixedToCamera = true
      setTimeout(() => {
        this.player.speed = actualSpeed
        this.infoText.destroy()
      }, 10000)
      this.stuff.potion--
    }
  }
}
