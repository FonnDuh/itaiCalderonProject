let users,
  firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  signinEmail = document.getElementById("signinEmail"),
  signinPassword = document.getElementById("signinPassword");

if (typeof Storage !== "undefined") {
  users = JSON.parse(localStorage.getItem("users"));
  console.log(users);
} else {
  alert("Sorry, your browser does not support Web Storage...");
}

if (users != null) {
  for (let i = 0; i < users.length; i++) {
    addToTable(
      users[i].fName,
      users[i].lName,
      users[i].email,
      users[i].pass,
      users[i].connected
    );
  }
}

function login() {
  if (typeof Storage !== "undefined") {
    if (signinEmail.value == "" && signinPassword.value == "") {
      return;
    } else if (users == null) {
      alert("משתמש לא קיים");
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (
        signinEmail.value == users[i].email &&
        signinPassword.value == users[i].pass
      ) {
        users[i].connected = "מחובר";
        localStorage.setItem("users", JSON.stringify(users));
        return;
      }
    }
    alert("משתמש לא קיים");
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function addUser() {
  if (typeof Storage !== "undefined") {
    if (
      firstName.value == "" &&
      lastName.value == "" &&
      email.value == "" &&
      password.value == ""
    ) {
      return;
    }
    if (users == null) {
      users = [
        {
          fName: firstName.value,
          lName: lastName.value,
          email: email.value,
          pass: password.value,
          connected: "מחובר",
        },
      ];
    } else {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email.value) {
          alert("השם משתמש הזה כבר תפוס. בחר/י שם משתמש אחר.");
          return;
        }
      }
      users.push({
        fName: firstName.value,
        lName: lastName.value,
        email: email.value,
        pass: password.value,
        connected: "מחובר",
      });
    }
    localStorage.setItem("users", JSON.stringify(users));
    addToTable(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
      "מחובר"
    );
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function disconnect(tag) {
  let index = tag.parentNode.parentNode.rowIndex;
  if (confirm("את/ה בטוח שברצונך לנתק את המשתמש?")) {
    let row = document.getElementById("table").rows[index];
    for (let i = 0; i < users.length; i++) {
      if (
        row.cells[0].innerHTML == users[i].fName &&
        row.cells[1].innerHTML == users[i].lName &&
        row.cells[2].innerHTML == users[i].email &&
        row.cells[3].innerHTML == users[i].pass
      ) {
        users[i].connected = "מנותק";
        localStorage.setItem("users", JSON.stringify(users));
        row.cells[4].innerHTML = "מנותק";
        tag.remove();
        return;
      }
    }
  }
}

function editUser(tag) {
  let index = tag.parentNode.parentNode.rowIndex,
    row = document.getElementById("table").rows[index],
    userIndex;
  for (let i = 0; i < users.length; i++) {
    if (
      row.cells[0].innerHTML == users[i].fName &&
      row.cells[1].innerHTML == users[i].lName &&
      row.cells[2].innerHTML == users[i].email &&
      row.cells[3].innerHTML == users[i].pass
    ) {
      userIndex = i;
    }
  }
  row.cells[0].innerHTML = `<input type="text" id="tempFname" class="form-control" value = "${row.cells[0].innerHTML}" />`;
  row.cells[1].innerHTML = `<input type="text" id="tempLname" class="form-control" value = "${row.cells[1].innerHTML}" />`;
  row.cells[2].innerHTML = `<input type="email" id="tempMail" class="form-control" value = "${row.cells[2].innerHTML}" />`;
  row.cells[3].innerHTML = `<input type="password" id="tempPass" class="form-control" value = "${row.cells[3].innerHTML}" />`;
  tag.innerHTML = `<img src="./images/check_16px.svg" alt="Check Icon"> אישור`;

  tag.onclick = () => {
    row.cells[0].innerHTML = document.getElementById("tempFname").value;
    row.cells[1].innerHTML = document.getElementById("tempLname").value;
    row.cells[2].innerHTML = document.getElementById("tempMail").value;
    row.cells[3].innerHTML = document.getElementById("tempPass").value;

    users[userIndex].fName = row.cells[0].innerHTML;
    users[userIndex].lName = row.cells[1].innerHTML;
    users[userIndex].email = row.cells[2].innerHTML;
    users[userIndex].pass = row.cells[3].innerHTML;
    localStorage.setItem("users", JSON.stringify(users));

    tag.innerHTML = `<img src="./images/edit_16px.svg" alt="Edit Icon"> עריכה`;
    tag.setAttribute("onclick", "editUser(this)");
  };
}

function addToTable(
  userFirstName,
  userLastName,
  userMail,
  userPassword,
  isConnected
) {
  let row = document.getElementById("tbody").insertRow(-1),
    fname = row.insertCell(0),
    lname = row.insertCell(1),
    mail = row.insertCell(2),
    pass = row.insertCell(3),
    status = row.insertCell(4),
    btn = row.insertCell(5);

  fname.innerHTML = userFirstName;
  lname.innerHTML = userLastName;
  mail.innerHTML = userMail;
  pass.innerHTML = userPassword;
  status.innerHTML = isConnected;
  if (isConnected == "מחובר") {
    btn.innerHTML = `<button class="tableBtn btn btn-outline-warning" onclick="disconnect(this)"><img src="./images/logout_16px.svg" alt="Exit Icon"> התנתקות</button>`;
  }
  btn.innerHTML +=
    `<button class="tableBtn btn btn-outline-danger" onclick="deleteRow(this)"><img src="./images/delete_16px.svg" alt="Delete Icon"> מחיקה</button>` +
    `<button class="tableBtn btn btn-outline-primary" onclick="editUser(this)"><img src="./images/edit_16px.svg" alt="Edit Icon"> עריכה</button>`;
}

function deleteRow(tag) {
  let index = tag.parentNode.parentNode.rowIndex;
  if (confirm("את/ה בטוח שברצונך למחוק את המשתמש?")) {
    let row = document.getElementById("table").rows[index];
    for (let i = 0; i < users.length; i++) {
      if (
        row.cells[0].innerHTML == users[i].fName &&
        row.cells[1].innerHTML == users[i].lName &&
        row.cells[2].innerHTML == users[i].email &&
        row.cells[3].innerHTML == users[i].pass
      ) {
        users.splice(i, 1);
        localStorage.setItem("users", JSON.stringify(users));
        table.deleteRow(index);
        return;
      }
    }
  }
}
