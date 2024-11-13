const easy = [
    "🚗",
    "🚗",
    "🚓",
    "🚓",
    "🚕",
    "🚕",
    "🛻",
    "🛻",
    "🚌",
    "🚌",
    "🚑",
    "🚑",
    "🚒",
    "🚒",
    "✈️",
    "✈️",
  ],
  medium = [
    "🚗",
    "🚗",
    "🚓",
    "🚓",
    "🚕",
    "🚕",
    "🛻",
    "🛻",
    "🚌",
    "🚌",
    "🚑",
    "🚑",
    "🚒",
    "🚒",
    "✈️",
    "✈️",
    "🚁",
    "🚁",
    "🛸",
    "🛸",
  ],
  hard = [
    "🚗",
    "🚗",
    "🚓",
    "🚓",
    "🚕",
    "🚕",
    "🛻",
    "🛻",
    "🚌",
    "🚌",
    "🚑",
    "🚑",
    "🚒",
    "🚒",
    "✈️",
    "✈️",
    "🚁",
    "🚁",
    "🛸",
    "🛸",
    "🚤",
    "🚤",
    "🚢",
    "🚢",
  ];

function createBoard(diff) {
  let game_emojis;
  switch (diff) {
    case 1:
      game_emojis = [...easy].sort(() => Math.random() - 0.5);
      document.getElementById("board").style.gridTemplateColumns =
        "repeat(4, 1fr)";
      break;
    case 2:
      game_emojis = [...medium].sort(() => Math.random() - 0.5);
      document.getElementById("board").style.gridTemplateColumns =
        "repeat(5, 1fr)";
      break;
    case 3:
      game_emojis = [...hard].sort(() => Math.random() - 0.5);
      document.getElementById("board").style.gridTemplateColumns =
        "repeat(6, 1fr)";
      break;
  }
  document.getElementById("diffSelect").style.display = "none";
  document.getElementById("board").innerHTML = "";
  for (let i = 0; i < game_emojis.length; i++) {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = game_emojis[i];
    document.querySelector("#board").append(item);
    item.onclick = function () {
      this.classList.add("boxOpen");
      setTimeout(function () {
        if (document.querySelectorAll(".boxOpen").length > 1) {
          if (
            document.querySelectorAll(".boxOpen")[1].innerHTML ==
            document.querySelectorAll(".boxOpen")[0].innerHTML
          ) {
            document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch");
            document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch");
            document
              .querySelectorAll(".boxOpen")[1]
              .classList.remove("boxOpen");
            document
              .querySelectorAll(".boxOpen")[0]
              .classList.remove("boxOpen");
            if (
              document.querySelectorAll(".boxMatch").length ==
              game_emojis.length
            ) {
              alert("You Win!");
              reset();
            }
          } else {
            document
              .querySelectorAll(".boxOpen")[1]
              .classList.remove("boxOpen");
            document
              .querySelectorAll(".boxOpen")[0]
              .classList.remove("boxOpen");
          }
        }
      }, 750);
    };
  }
}

function reset() {
  location.reload();
}
