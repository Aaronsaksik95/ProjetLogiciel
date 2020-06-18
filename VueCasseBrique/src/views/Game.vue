<template>
  <div>
    <div v-if="this.user.RoleId" class="Game p-5">
      <div v-if="this.niveau">
        <div v-if="getNiveau >= this.$route.params.id || this.$route.params.id == 1">
          <div class="d-flex">
            <div class="mr-5">
              <h2 class="border-bottom border-info m-1">Niveau {{$route.params.id}}</h2>
              <audio id="briqueCasse" src="../assets/Son/briqueCasse.mp3"></audio>
              <audio id="briqueTouche" src="../assets/Son/briqueTouche.mp3"></audio>
              <audio id="gameOver" src="../assets/Son/gameOver.mp3"></audio>
              <audio id="win" src="../assets/Son/win.mp3"></audio>
              <audio id="joker" src="../assets/Son/joker.mp3"></audio>
              <audio id="jokerM" src="../assets/Son/jokerM.mp3"></audio>
              <audio id="vie" src="../assets/Son/live.mp3"></audio>
              <audio id="music" src="../assets/Son/music.mp3"></audio>

              <div class="mt-3">
                <router-link class="btn btn-light m-2 d-block" to="/">
                  <h4 class="m-0">
                    <span class="text-info">M</span> E N U
                  </h4>
                </router-link>
                <button class="restart btn btn-light m-2">
                  <h4 class="m-0">
                    <span class="text-info">A</span> G A I N
                  </h4>
                </button>
                <router-link class="btn btn-light m-2" to="/niveau">
                  <h4 class="m-0">
                    <span class="text-info">L</span> E V E L
                  </h4>
                </router-link>
              </div>
              <h4 class="w-100 mt-2 border-bottom">Infos</h4>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="score" width="130" height="30"></canvas>
                <canvas class="bg-light d-block m-2" id="live" width="130" height="30"></canvas>
              </div>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="vitesse" width="130" height="30"></canvas>
                <canvas class="bg-light d-block m-2" id="paddle" width="130" height="30"></canvas>
              </div>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="balle" width="130" height="30"></canvas>
              </div>
              <h4 class="w-100 mt-2 border-bottom">Bonus</h4>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="transP" width="130" height="30"></canvas>
                <canvas class="bg-light d-block m-2" id="paddleP" width="130" height="30"></canvas>
              </div>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="balleP" width="130" height="30"></canvas>
              </div>
              <h4 class="w-100 mt-2 border-bottom">Malus</h4>
              <div class="d-flex">
                <canvas class="bg-light d-block m-2" id="balleM" width="130" height="30"></canvas>
                <canvas class="bg-light d-block m-2" id="paddleM" width="130" height="30"></canvas>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div v-if="this.$route.params.id != 1">
                  <router-link
                    class="btn btn-dark m-2 p-0 pl-3 pr-3"
                    :to="{path: '/redirect/' + this.niveauPrec}"
                  >⟵Précédent</router-link>
                </div>
                <div class="mt-2" v-on:click="Sound">
                  <img
                    class="img"
                    v-if="this.audio.music > 0 || this.audio.son > 0"
                    src="../assets/soundOff.png"
                    alt
                  />
                  <img class="img" v-else src="../assets/sound.png" alt />
                </div>
                <div v-if="this.avancementMax > this.$route.params.id && this.niveauMax > this.$route.params.id">
                  <router-link
                    class="btn btn-dark m-2 p-0 pl-3 pr-3"
                    :to="{path: '/redirect/' + this.niveauSuiv}"
                  >Suivant⟶</router-link>
                </div>
              </div>
            </div>

            <canvas class="loserCanva bg-light shadow" id="myCanvas" width="1000" height="650"></canvas>
          </div>
          <div class="w-50 float-right">
            <h2 class="loserH1 d-none text-danger float-left mt-3 ml-5">G A M E - O V E R</h2>
            <small
              class="small float-left"
            >Appuyez sur l'écran pour lancer la partie ou mettre pause.</small>
          </div>
        </div>
        <div v-else class="h3 text-danger">
          Veuillez terminer le
          <router-link class="h3" to="/niveau">Niveau précédent</router-link>.
        </div>
      </div>
      <div v-else class="h3 text-danger">
        Ce niveau n'existe pas
        <router-link class="h3" to="/niveau">Revenir au Niveau</router-link>.
      </div>
    </div>
    <div v-else class="h3 text-danger p-5">
      Veuillez vous
      <router-link class="h3" to="/authentication">connecter ou vous inscrire</router-link>.
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: [],
      theUser: [],
      niveau: [],
      niveauMax: 0,
      avancementMax: 0,
      niveauSuiv: parseInt(this.$route.params.id) + 1,
      niveauPrec: parseInt(this.$route.params.id) - 1,
      getNiveau: localStorage.getItem("niveau"),
      getToken: localStorage.getItem("token"),
      audio: []
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    await axios
      .get("http://localhost:5000/user/" + this.user.id)
      .then(response => (this.theUser = response.data));
    await axios
      .get("http://localhost:5000/niveau/" + this.$route.params.id)
      .then(response => (this.niveau = response.data));
    await axios
      .get("http://localhost:5000/avancement/max/" + this.user.id)
      .then(response => (this.avancementMax = response.data));
      console.log(this.avancementMax)
    await axios
      .get("http://localhost:5000/niveau/")
      .then(response => (this.niveauMax = response.data));
      console.log(this.niveauMax)
    await axios
      .get("http://localhost:5000/audio/" + this.user.id)
      .then(response => (this.audio = response.data));

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var scoreC = document.getElementById("score");
    var ctxSc = scoreC.getContext("2d");
    var liveC = document.getElementById("live");
    var ctxLi = liveC.getContext("2d");
    var vitesseC = document.getElementById("vitesse");
    var ctxVi = vitesseC.getContext("2d");
    var paddle = document.getElementById("paddle");
    var ctxPa = paddle.getContext("2d");
    var balle = document.getElementById("balle");
    var ctxBa = balle.getContext("2d");
    var transP = document.getElementById("transP");
    var ctxTr = transP.getContext("2d");
    var paddleP = document.getElementById("paddleP");
    var ctxPaP = paddleP.getContext("2d");
    var balleP = document.getElementById("balleP");
    var ctxBaP = balleP.getContext("2d");
    var balleM = document.getElementById("balleM");
    var ctxBaM = balleM.getContext("2d");
    var paddleM = document.getElementById("paddleM");
    var ctxPaM = paddleM.getContext("2d");
    var ballRadius = this.niveau.balle;
    var ballRadiusJ = 10;
    var id = this.niveau.id + 1;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = this.niveau.vitesse;
    var vitesse = this.niveau.vitesse;
    var dy = -this.niveau.vitesse;
    var paddleHeight = 10;
    var paddleWidth = this.niveau.paddle;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = this.niveau.rowBlock;
    var brickColumnCount = this.niveau.columnBlock;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 60;
    var brickOffsetLeft = 38;
    var score = 0;
    var lives = 3;
    var timeGhost = 0;
    var timePaddleE = 0;
    var timeBalleE = 0;
    var timeBalleS = 0;
    var timePaddleS = 0;
    var intervalIdG;
    var intervalIdPB;
    var intervalIdBB;
    var intervalIdBM;
    var intervalIdPM;
    var trans = false;
    var testPB = false;
    var testPM = false;
    var testBB = false;
    var testBM = false;
    var espaceTest = false;
    var colorMain = this.niveau.colorMain;
    var strongBlock = this.niveau.strongBlock;
    var colorLive = "#FF00C9";
    var colorTab = [
      this.niveau.colorMain,
      this.niveau.color1,
      this.niveau.color2,
      this.niveau.color3
    ];
    var musicV = this.audio.music / 10;
    var sonV = this.audio.son / 10;

    var bricks = [];
    for (var c = 0; c <= brickRowCount; c++) {
      bricks[c] = [];
      for (var r = 0; r <= brickColumnCount; r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: Math.floor(Math.random() * strongBlock) + 1,
          joker: Math.floor(Math.random() * 20),
          count: 3
        };
      }
    }
    var restart = document.querySelector(".restart");
    var canva = document.querySelector(".loserCanva");

    document.addEventListener("keydown", keyDownHandler, false);
    canva.addEventListener("click", keySpace, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    restart.addEventListener("click", Restart, false);

    function Restart() {
      document.location.reload(true);
    }
    function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      }
    }
    function keySpace() {
      espaceTest = !espaceTest;
    }

    function mouseMoveHandler(e) {
      if (espaceTest == true) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2;
        }
      }
    }
    function TimerGhost() {
      intervalIdG = setInterval(function() {
        timeGhost--;
      }, 1000);
    }
    function TimerPaddleB() {
      intervalIdPB = setInterval(function() {
        timePaddleE--;
      }, 1000);
    }
    function TimerBalleB() {
      intervalIdBB = setInterval(function() {
        timeBalleE--;
      }, 1000);
    }
    function TimerBalleM() {
      intervalIdBM = setInterval(function() {
        timeBalleS--;
      }, 1000);
    }
    function TimerPaddleM() {
      intervalIdPM = setInterval(function() {
        timePaddleS--;
      }, 1000);
    }
    function BriqueCasse() {
      var son = document.querySelector("#briqueCasse");
      son.volume = sonV;
      son.play();
      return son;
    }
    function BriqueTouche() {
      var son = document.querySelector("#briqueTouche");
      son.volume = sonV;
      son.play();
      return son;
    }
    function GameOver() {
      var son = document.querySelector("#gameOver");
      son.volume = sonV;
      son.play();
      return son;
    }
    function Win() {
      var son = document.querySelector("#win");
      son.volume = sonV;
      son.play();
      return son;
    }
    function Joker() {
      var son = document.querySelector("#joker");
      son.volume = sonV;
      son.play();
      return son;
    }
    function JokerM() {
      var son = document.querySelector("#jokerM");
      son.volume = sonV;
      son.play();
      return son;
    }
    function Vie() {
      var son = document.querySelector("#vie");
      son.volume = sonV;
      son.play();
      return son;
    }
    function Music() {
      var son = document.querySelector("#music");
      son.loop = true;
      son.volume = musicV;
      son.play();
      return son;
    }
    function MusicStop() {
      return document.querySelector("#music").pause();
    }

    function collisionDetection() {
      for (var c = 0; c < brickRowCount; c++) {
        for (var r = 0; r < brickColumnCount; r++) {
          var b = bricks[c][r];
          if (b.status != 0 && b.status != 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              if (trans == false) {
                dy = -dy;
              }
              BriqueTouche();
              b.status = b.status - 1;
            }
          } else if (b.status == 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              if (trans == false) {
                dy = -dy;
              }
              b.status = 0;
              BriqueCasse();
              score++;
              if (score == brickRowCount * brickColumnCount) {
                Win();
                dy = 0;
                dx = 0;
                localStorage.setItem("niveau", id);
                setTimeout(function() {
                  window.location.href = "/avancement/" + id;
                }, 2000);
              }
            }
          } else if (b.status == 0) {
            // if (b.joker != 0) {
            if (b.joker != 0 && b.joker <= 6) {
              var xJ = b.x;
              var yJ = b.y + b.count;
              if (b.joker == 1) {
                drawTrans(xJ, yJ);
              } else if (b.joker == 2) {
                drawPaddleB(xJ, yJ);
              } else if (b.joker == 3) {
                drawBalleB(xJ, yJ);
              } else if (b.joker == 4) {
                drawBalleM(xJ, yJ);
              } else if (b.joker == 5) {
                drawPaddleM(xJ, yJ);
              } else if (b.joker == 6) {
                drawLive(xJ, yJ);
              }
              b.count = b.count + 2;
              if (
                yJ > canvas.height - b.y + 60 &&
                yJ < 650 - b.y + paddleHeight + 60
              ) {
                if (xJ > paddleX && xJ < paddleX + paddleWidth) {
                  if (b.joker == 1 && trans == false) {
                    Joker();
                    transP.classList.replace("bg-light", "bg-success");
                    timeGhost = 10;
                    trans = true;
                    TimerGhost();
                    setTimeout(function() {
                      clearInterval(intervalIdG);
                      transP.classList.replace("bg-success", "bg-light");
                      timeGhost = 0;
                      trans = false;
                    }, 10000);
                  } else if (b.joker == 2) {
                    if (paddleWidth <= 250 && testPB == false) {
                      Joker();
                      testPB = true;
                      paddleP.classList.replace("bg-light", "bg-success");
                      timePaddleE = 10;
                      TimerPaddleB();
                      paddleWidth = paddleWidth + 30;
                      setTimeout(function() {
                        clearInterval(intervalIdPB);
                        paddleP.classList.replace("bg-success", "bg-light");
                        timePaddleE = 0;
                        paddleWidth = paddleWidth - 30;
                        testPB = false;
                      }, 10000);
                    }
                  } else if (b.joker == 3 && testBB == false) {
                    if (ballRadius <= 25) {
                      Joker();
                      testBB = true;
                      balleP.classList.replace("bg-light", "bg-success");
                      timeBalleE = 10;
                      TimerBalleB();
                      ballRadius = ballRadius + 6;
                      setTimeout(function() {
                        clearInterval(intervalIdBB);
                        balleP.classList.replace("bg-success", "bg-light");
                        timeBalleE = 0;
                        ballRadius = ballRadius - 6;
                        testBB = false;
                      }, 10000);
                    }
                  } else if (b.joker == 4 && testBM == false) {
                    if (ballRadius >= 10) {
                      JokerM();
                      testBM = true;
                      balleM.classList.replace("bg-light", "bg-danger");
                      timeBalleS = 10;
                      TimerBalleM();
                      ballRadius = ballRadius - 6;
                      setTimeout(function() {
                        clearInterval(intervalIdBM);
                        balleM.classList.replace("bg-danger", "bg-light");
                        timeBalleS = 0;
                        ballRadius = ballRadius + 6;
                        testBM = false;
                      }, 10000);
                    }
                  } else if (b.joker == 5 && testPM == false) {
                    if (paddleWidth >= 100) {
                      JokerM();
                      testPM = true;
                      paddleM.classList.replace("bg-light", "bg-danger");
                      timePaddleS = 10;
                      TimerPaddleM();
                      paddleWidth = paddleWidth - 30;
                      setTimeout(function() {
                        clearInterval(intervalIdPM);
                        paddleM.classList.replace("bg-danger", "bg-light");
                        timePaddleS = 0;
                        paddleWidth = paddleWidth + 30;
                        testPM = false;
                      }, 10000);
                    }
                  } else if (b.joker == 6) {
                    if (lives < 5) {
                      Vie();
                      lives++;

                      colorLive = "#000";
                      setTimeout(function() {
                        colorLive = "#FF00C9";
                        setTimeout(function() {
                          colorLive = "#000";
                          setTimeout(function() {
                            colorLive = "#FF00C9";
                            setTimeout(function() {
                              colorLive = "#000";
                              setTimeout(function() {
                                colorLive = "#FF00C9";
                                setTimeout(function() {
                                  colorLive = "#000";
                                  setTimeout(function() {
                                    colorLive = "#FF00C9";
                                  }, 300);
                                }, 300);
                              }, 300);
                            }, 300);
                          }, 300);
                        }, 300);
                      }, 300);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = colorMain;
      ctx.fill();
      ctx.closePath();
    }
    function drawTrans(xJ, yJ) {
      ctx.beginPath();
      ctx.arc(xJ, yJ, ballRadiusJ, 0, Math.PI * 2);
      ctx.fillStyle = "#d1d1d1";
      ctx.fill();
      ctx.closePath();
    }
    function drawLive(xJ, yJ) {
      ctx.beginPath();
      ctx.arc(xJ, yJ, ballRadiusJ, 0, Math.PI * 2);
      ctx.fillStyle = "#FF00C9";
      ctx.fill();
      ctx.closePath();
    }
    function drawBalleB(xJ, yJ) {
      ctx.beginPath();
      ctx.arc(xJ, yJ, ballRadiusJ, 0, Math.PI * 2);
      ctx.fillStyle = "#00FF7C";
      ctx.fill();
      ctx.closePath();
    }
    function drawBalleM(xJ, yJ) {
      ctx.beginPath();
      ctx.arc(xJ, yJ, ballRadiusJ, 0, Math.PI * 2);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddleB(xJ, yJ) {
      ctx.beginPath();
      ctx.rect(xJ, yJ, 20, 5);
      ctx.fillStyle = "#00FF7C";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddleM(xJ, yJ) {
      ctx.beginPath();
      ctx.rect(xJ, yJ, 20, 5);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.fillStyle = colorMain;
      ctx.fill();
      ctx.closePath();
    }
    function drawBricks() {
      for (var c = 0; c < brickRowCount; c++) {
        for (var r = 0; r < brickColumnCount; r++) {
          if (bricks[c][r].status != 0) {
            var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            if (bricks[c][r].status == 4) {
              ctx.fillStyle = colorTab[3];
            } else if (bricks[c][r].status == 3) {
              ctx.fillStyle = colorTab[2];
            } else if (bricks[c][r].status == 2) {
              ctx.fillStyle = colorTab[1];
            } else if (bricks[c][r].status == 1) {
              ctx.fillStyle = colorTab[0];
            }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
    function writePause() {
      ctx.fillStyle = colorMain;
      ctx.font = "30px Arial";
      ctx.fillText("Appuyer sur l'écran", 370, 300);
    }
    function writeScore() {
      ctxSc.clearRect(0, 0, canvas.width, canvas.height);
      ctxSc.font = "bold 20px serif";
      ctxSc.fillStyle = "#28a745";
      ctxSc.fillText("Score: " + score, 8, 20);
    }
    function writeBalle() {
      ctxBa.clearRect(0, 0, canvas.width, canvas.height);
      ctxBa.font = "bold 20px serif";
      ctxBa.fillStyle = "#ffc107";
      ctxBa.fillText("Balle: " + ballRadius, 8, 20);
    }
    function writeTransP() {
      ctxTr.clearRect(0, 0, canvas.width, canvas.height);
      ctxTr.font = "20px serif";
      ctxTr.fillStyle = "#000";
      ctxTr.fillText("Ghost: " + timeGhost + " s", 8, 20);
    }
    function writePaddleP() {
      ctxPaP.clearRect(0, 0, canvas.width, canvas.height);
      ctxPaP.font = "20px serif";
      ctxPaP.fillStyle = "#000";
      ctxPaP.fillText("Paddle +: " + timePaddleE + " s", 8, 20);
    }
    function writeBalleP() {
      ctxBaP.clearRect(0, 0, canvas.width, canvas.height);
      ctxBaP.font = "20px serif";
      ctxBaP.fillStyle = "#000";
      ctxBaP.fillText("Ball +: " + timeBalleE + " s", 8, 20);
    }
    function writeBalleM() {
      ctxBaM.clearRect(0, 0, canvas.width, canvas.height);
      ctxBaM.font = "20px serif";
      ctxBaM.fillStyle = "#000";
      ctxBaM.fillText("Ball -: " + timeBalleS + " s", 8, 20);
    }
    function writePaddleM() {
      ctxPaM.clearRect(0, 0, canvas.width, canvas.height);
      ctxPaM.font = "20px serif";
      ctxPaM.fillStyle = "#000";
      ctxPaM.fillText("Paddle -: " + timePaddleS + " s", 8, 20);
    }
    function writeLives() {
      ctxLi.clearRect(0, 0, canvas.width, canvas.height);
      ctxLi.font = "bold 20px serif";
      ctxLi.fillStyle = colorLive;
      ctxLi.fillText("Lives: " + lives, 8, 20);
    }
    async function writeVitesse() {
      ctxVi.clearRect(0, 0, canvas.width, canvas.height);
      ctxVi.font = "bold 20px serif";
      ctxVi.fillStyle = "#dc3545";
      ctxVi.fillText("Vitesse: " + vitesse, 8, 20);
    }
    async function writePaddle() {
      ctxPa.clearRect(0, 0, canvas.width, canvas.height);
      ctxPa.font = "bold 20px serif";
      ctxPa.fillStyle = "#17a2b8";
      ctxPa.fillText("Paddle: " + paddleWidth, 8, 20);
    }
    function draw() {
      var loserH1 = document.querySelector(".loserH1");
      var small = document.querySelector(".small");
      var loserCanva = document.querySelector(".loserCanva");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      writeScore();
      writeLives();
      writeBalle();
      writeTransP();
      writePaddleP();
      writeBalleP();
      writeBalleM();
      writePaddleM();
      writeVitesse();
      writePaddle();
      if (espaceTest == true) {
        Music();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
          dx = -dx;
        }
        if (y + dy < ballRadius) {
          dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
          if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
          } else {
            lives--;
            if (!lives) {
              GameOver();
              loserH1.classList.remove("d-none");
              small.classList.add("d-none");
              loserCanva.classList.replace("bg-light", "bg-dark");
              dy = 0;
              dx = 0;
            } else {
              x = canvas.width / 2;
              y = canvas.height - 30;
              dx = vitesse;
              dy = -vitesse;
              paddleX = (canvas.width - paddleWidth) / 2;
            }
          }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
          paddleX -= 7;
        }

        x += dx;
        y += dy;
      } else {
        writePause();
        MusicStop();
      }
      requestAnimationFrame(draw);
    }
    draw();
  },
  methods: {
    Sound() {
      if (this.audio.music == 0) {
        axios.put("http://localhost:5000/audio/" + this.user.id, {
          son: 5,
          music: 5
        });
      } else if (this.audio.son == 0) {
        axios.put("http://localhost:5000/audio/" + this.user.id, {
          son: 5,
          music: 5
        });
      } else if (this.audio.music > 0) {
        axios.put("http://localhost:5000/audio/" + this.user.id, {
          son: 0,
          music: 0
        });
      } else if (this.audio.son > 0) {
        axios.put("http://localhost:5000/audio/" + this.user.id, {
          son: 0,
          music: 0
        });
      }
      document.location.reload(true);
    }
  }
};
</script>
<style scoped>
.img {
  width: 20px;
  height: 20px;
}
</style>
