Ball.Game = function(game) {};
Ball.Game.prototype = {
  create: function() {
    this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
    this.ball.anchor.set(0.5);
    this.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.setSize(18, 18);
    this.ball.body.bounce.set(0.3, 0.3);
    this.keys = this.game.input.keyboard.createCursorKeys();
    window.addEventListener("deviceorientation", this.handleOrientation, true);
    this.hole = this.add.sprite(Ball._WIDTH*0.5, 90, 'hole');
    this.physics.enable(this.hole, Phaser.Physics.ARCADE);
    this.hole.anchor.set(0.5);
    this.hole.body.setSize(2, 2);
  },
  initLevels: function() {
    this.levelData = [
      [
        { x: 96, y: 224, t: 'w'}
      ],
      [
        { x: 72, y: 320, t: 'w'},
        { x: 200, y: 320, t: 'h'},
        { x: 72, y: 150, t: 'w'}
      ]
    ]
    for(var i=0; i<this.maxLevels; i++) {
      var newLevel = this.add.group();
      newLevel.enableBody = true;
      newLevel.physicsBodyType = Phaser.Physics.ARCADE;
      for(var e=0; e<this.levelData[i].length; e++) {
        var item = this.levelData[i][e];
        newLevel.create(item.x, item.y, 'element-'+item.t);
      }
      newLevel.setAll('body.immovable', true);
      newLevel.visible = false;
      this.levels.push(newLevel);
    }
  },
  showLevel: function(level) {
    var lvl = level | this.level;
    if(this.levels[lvl-2]) {
      this.levels[lvl-2].visible = false;
    }
    this.levels[lvl-1].visible = true;
  }, 
  updateCounter: function() {},
  managePause: function() {},
  manageAudio: function() {},
  update: function() {
    if(this.keys.left.isDown) {
      this.ball.body.velocity.x -= this.movementForce;
    }
    else if(this.keys.right.isDown) {
      this.ball.body.velocity.x += this.movementForce;
    }
    if(this.keys.up.isDown) {
      this.ball.body.velocity.y -= this.movementForce;
    }
    else if(this.keys.down.isDown) {
      this.ball.body.velocity.y += this.movementForce;
    }
    this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
    this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
  },
  wallCollision: function() {},
  handleOrientation: function(e) {},
  finishLevel: function() {}
};