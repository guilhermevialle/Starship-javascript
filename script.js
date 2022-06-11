const game = document.querySelector(".game");
const player = document.querySelector(".player");
const fire = document.querySelector(".fire");
var allEnemies = document.querySelectorAll(".enemy");
const gameover = document.querySelector(".gameover");
const score = document.querySelector(".score");
var kills = 0;

const observer = new MutationObserver((list) => {
  allEnemies = document.querySelectorAll(".enemy");
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});

const reload = (() => {
  gameover.addEventListener("click", () => {
    window.location.reload();
  });
})();

const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateEnemies = setInterval(() => {
  let enemy = document.createElement("img");
  enemy.className = "enemy";
  enemy.src = "./sprites/enemy.png";
  enemy.style.left =
    getRandomValue(0, game.clientWidth - game.clientWidth * 0.07) + "px";
  game.appendChild(enemy);
}, getRandomValue(1400, 2200));

allEnemies.forEach((e) => {
  e.style.left =
    getRandomValue(0, game.clientWidth - game.clientWidth * 0.07) + "px";
});

var moveFireTogether = () => {
  let side = player.clientWidth / 2 + player.offsetLeft;
  fire.style.left = side - 7.5 + "px";
};
moveFireTogether();

const movePlayer = () => {
  window.onkeydown = (e) => {
    if (e.keyCode == 37) {
      player.style.left = player.offsetLeft - 15 + "px";
      moveFireTogether();
    } else if (e.keyCode == 39) {
      player.style.left = player.offsetLeft + 15 + "px";
      moveFireTogether();
    } else if (e.keyCode == 32) {
      attack();
    } else {
      return;
    }
  };
};
movePlayer();

window.onclick = () => {
  attack();
};

const attack = () => {
  moveFireTogether();
  fire.classList.add("fired");

  setTimeout(() => {
    fire.classList.remove("fired");
  }, 1000);
};

const checkCollision = (elm1, elm2) => {
  var elm1Rect = elm1.getBoundingClientRect();
  var elm2Rect = elm2.getBoundingClientRect();

  return (
    elm1Rect.right >= elm2Rect.left &&
    elm1Rect.left <= elm2Rect.right &&
    elm1Rect.bottom >= elm2Rect.top &&
    elm1Rect.top <= elm2Rect.bottom
  );
};

const aimFix = setInterval(() => {
  allEnemies.forEach((enemy) => {
    let fireBottom = game.offsetHeight - (fire.offsetTop + fire.offsetHeight);
    let enemyBottom =
      game.offsetHeight - (enemy.offsetTop + enemy.offsetHeight);

    if (enemyBottom < 80) {
      clearInterval(aimFix);

      allEnemies.forEach((e) => {
        e.style.animation = "none";
        e.style.bottom = e.offsetHeight + "px";
      });
      gameover.style.display = "block";
      clearInterval(generateEnemies);
    }
    if (fireBottom > 80) {
      window.FunctionName = moveFireTogether = () => {
        return false;
      };
    } else {
      window.FunctionName = moveFireTogether = () => {
        let side = player.clientWidth / 2 + player.offsetLeft;
        fire.style.left = side - 7.5 + "px";
      };
    }
    if (checkCollision(fire, enemy)) {
      enemy.remove();
      kills++;
      score.innerText = kills;
      console.log(kills);

      let colision = document.createElement("img");
      colision.className = "impact";
      colision.src = "./sprites/impact.png";

      colision.style.bottom = enemyBottom + "px";
      colision.style.left = enemy.style.left;
      game.appendChild(colision);

      setTimeout(() => {
        colision.style.display = "none";
      }, 50);
    }
  });
}, 10);
