const tbody = document.getElementById("tbody"),
  getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
let answer, num1, num2, operator;

function createEx() {
  num1 = getRandomNumber(1, document.getElementById("difficulty").value);
  num2 = getRandomNumber(1, document.getElementById("difficulty").value);
  operator = document.getElementById("operator").value;
  if (operator == "random") {
    switch (getRandomNumber(1, 4)) {
      case 1:
        operator = "+";
        break;
      case 2:
        operator = "-";
        break;
      case 3:
        operator = "*";
        break;
      case 4:
        operator = "/";
        break;
      default:
        break;
    }
  }
  answer = eval(num1 + operator + num2).toFixed(2);
  document.getElementById(
    "question"
  ).innerText = `${num1} ${operator} ${num2} = `;
}
createEx();

function checkAnswer() {
  const input = document.getElementById("answer");
  if (input.value == "") {
    return;
  }
  const row = tbody.insertRow(-1),
    ex = row.insertCell(0),
    rightAnswer = row.insertCell(1),
    wrongAnswer = row.insertCell(2),
    points = row.insertCell(3);
  if (input.value == answer) {
    ex.innerHTML = `${num1} ${operator} ${num2}`;
    rightAnswer.innerHTML = answer;
    wrongAnswer.innerHTML = "אין";
    points.innerHTML = 10;
    document.getElementById("correctCount").innerText++;
    document.getElementById("pointstCount").innerText =
      +document.getElementById("pointstCount").innerText + 10;
  } else {
    ex.innerHTML = `${num1} ${operator} ${num2}`;
    rightAnswer.innerHTML = answer;
    wrongAnswer.innerHTML = eval(input.value);
    points.innerHTML = 0;
    document.getElementById("wrongCount").innerText++;
  }

  document.getElementById("answer").value = "";
  createEx();
}

function reset() {
  tbody.innerHTML = "";
  document.getElementById("correctCount").innerText = 0;
  document.getElementById("wrongCount").innerText = 0;
  document.getElementById("pointstCount").innerText = 0;
}
