class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    ghost1 = createSprite(100, 200);
    ghost1.addImage(ghost1Img);
    ghost1.scale = 0.5;
    ghost2 = createSprite(300, 200);
    ghost2.addImage(ghost2Img);
    ghost2.scale = 0.5;
    ghost3 = createSprite(500, 200);
    ghost3.addImage(ghost3Img);
    ghost3.scale = 0.5;
    ghost4 = createSprite(700, 200);
    ghost4.addImage(ghost4Img);
    ghost4.scale = 0.5;
    ghosts = [ghost1, ghost2, ghost3, ghost4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(bg2, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y = 200;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        x = 500 - allPlayers[plr].distance;
        ghosts[index - 1].x = x;
        ghosts[index - 1].y = y;
        // console.log(index, player.index)

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          ghosts[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = ghosts[index - 1].y;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (player.distance > 3800) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
  }
}
