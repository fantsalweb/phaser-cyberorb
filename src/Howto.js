Ball.HowTo = function(game) {};

Ball.HowTo.prototype = {
  create: function() {
    this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
  },
  startGame: function() {
    this.game.state.start('Game');
  }
};