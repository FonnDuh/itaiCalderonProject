const tbody = document.getElementById("tbody");
let rowCount = 0;

function addItem() {
  let nameInput = document.getElementById("itemName"),
    amountInput = document.getElementById("amount"),
    priceInput = document.getElementById("itemPrice"),
    currency = document.getElementById("currency");

  if (nameInput.value == "") {
    document.getElementById("error").style.display = "inline-block";
    setTimeout(function () {
      document.getElementById("error").style.display = "none";
    }, 3000);
    return;
  } else if (priceInput.value == "") {
    priceInput.value = 0;
  }
  if (amountInput.value == "") {
    amountInput.value = 1;
  }
  document.getElementById("error").style.display = "none";
  rowCount++;

  let row = tbody.insertRow(-1),
    tag = row.insertCell(0),
    name = row.insertCell(1),
    amount = row.insertCell(2),
    price = row.insertCell(3),
    totalPrice = row.insertCell(4),
    btn = row.insertCell(5);

  row.id = "row-" + rowCount;
  tag.scope = "row";
  tag.innerHTML = rowCount;
  name.innerHTML = nameInput.value;
  amount.innerHTML = amountInput.value;
  price.innerHTML = priceInput.value + currency.value;
  totalPrice.innerHTML =
    eval(+amountInput.value * +priceInput.value) + currency.value;
  btn.innerHTML = `<button class="deleteItem btn btn-outline-warning" onclick="deleteRow('row-${rowCount}')">X</button>`;

  document.getElementById("totalAmount").innerText = `(${rowCount})`;
  nameInput.value = "";
  amountInput.value = "";
  priceInput.value = "";
}

function deleteRow(tag) {
  let rows = document.getElementById("table").rows;

  if (rowCount < 1) {
    rowCount = 1;
    document.getElementById("totalAmount").innerText = "(0)";
  } else {
    rowCount--;
    document.getElementById("totalAmount").innerText = `(${rowCount})`;
  }
  tbody.removeChild(document.getElementById(tag));

  for (let i = 1; i <= rows.length; i++) {
    // ! Shows error in browser console but still works.
    table.rows[i].cells[0].innerText = i;
  }
}

function printData() {
  if (tbody.innerHTML == "") {
    return;
  }
  let table = document.getElementById("table");
  table.border = "1";
  newWin = window.open("");
  newWin.document.write(table.outerHTML);
  table.border = "0";
  newWin.print();
  newWin.close();
}
