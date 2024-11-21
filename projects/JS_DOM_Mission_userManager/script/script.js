let users;
const firstName = document.getElementById("firstName"),
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
  users.map((user) => {
    addToTable(user.fName, user.lName, user.email, user.pass, user.connected);
  });
}

document.getElementById("signinForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  if (typeof Storage !== "undefined") {
    const user = users.find(
      (user) =>
        user.email == signinEmail.value && user.pass == signinPassword.value
    );

    if (user) {
      if (user.connected === "מחובר") {
        signinEmail.value = "";
        signinPassword.value = "";
        alert("משתמש כבר מחובר");
        return;
      }
      user.connected = "מחובר";
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById("tbody").innerHTML = "";
      users.map((user) => {
        addToTable(
          user.fName,
          user.lName,
          user.email,
          user.pass,
          user.connected
        );
      });
    } else {
      signinEmail.value = "";
      signinPassword.value = "";
      alert("משתמש לא קיים");
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
});

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

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
          connected: "מנותק",
        },
      ];
    } else {
      if (
        users.some(
          (user) => user.email.toLowerCase() === email.value.toLowerCase()
        )
      ) {
        alert("השם משתמש הזה כבר תפוס. בחר/י שם משתמש אחר.");
        return;
      }

      users.push({
        fName: firstName.value,
        lName: lastName.value,
        email: email.value,
        pass: password.value,
        connected: "מנותק",
      });
    }
    localStorage.setItem("users", JSON.stringify(users));
    addToTable(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
      "מנותק"
    );
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
});

function addToTable(
  userFirstName,
  userLastName,
  userMail,
  userPassword,
  isConnected
) {
  const row = document.getElementById("tbody").insertRow(-1),
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
  btn.innerHTML =
    isConnected == "מחובר"
      ? `<button class="tableBtn btn btn-outline-warning" onclick="disconnect(this)"><img src="./images/logout_16px.svg" alt="Exit Icon"> התנתקות</button>`
      : "";
  btn.innerHTML +=
    `<button class="tableBtn btn btn-outline-danger" onclick="removeRow(this)"><img src="./images/delete_16px.svg" alt="Delete Icon"> מחיקה</button>` +
    `<button class="tableBtn btn btn-outline-primary" onclick="editUser(this)"><img src="./images/edit_16px.svg" alt="Edit Icon"> עריכה</button>`;
}

function disconnect(tag) {
  const row =
      document.getElementById("table").rows[tag.parentNode.parentNode.rowIndex],
    userIndex = users.findIndex(
      (user) =>
        user.fName.toLowerCase() === row.cells[0].innerHTML.toLowerCase() &&
        user.lName.toLowerCase() === row.cells[1].innerHTML.toLowerCase() &&
        user.email.toLowerCase() === row.cells[2].innerHTML.toLowerCase() &&
        user.pass === row.cells[3].innerHTML
    );

  if (confirm("את/ה בטוח שברצונך לנתק את המשתמש?")) {
    users[userIndex].connected = "מנותק";
    localStorage.setItem("users", JSON.stringify(users));
    row.cells[4].innerHTML = "מנותק";
    tag.remove();
  }
}

function editUser(tag) {
  const row =
      document.getElementById("table").rows[tag.parentNode.parentNode.rowIndex],
    tablefName = row.cells[0],
    tablelName = row.cells[1],
    tableMail = row.cells[2],
    tablePass = row.cells[3],
    userIndex = users.findIndex(
      (user) =>
        user.fName.toLowerCase() === tablefName.innerHTML.toLowerCase() &&
        user.lName.toLowerCase() === tablelName.innerHTML.toLowerCase() &&
        user.email.toLowerCase() === tableMail.innerHTML.toLowerCase() &&
        user.pass === tablePass.innerHTML
    );

  if (tag.innerHTML.includes("עריכה")) {
    tablefName.innerHTML = `<input type="text" id="tempFname${userIndex}" class="form-control" value="${tablefName.innerHTML}" />`;
    tablelName.innerHTML = `<input type="text" id="tempLname${userIndex}" class="form-control" value="${tablelName.innerHTML}" />`;
    tableMail.innerHTML = `<input type="email" id="tempMail${userIndex}" class="form-control" value="${tableMail.innerHTML}" />`;
    tablePass.innerHTML = `<input type="password" id="tempPass${userIndex}" class="form-control" value="${tablePass.innerHTML}" />`;
    tag.innerHTML = `<img src="./images/check_16px.svg" alt="Check Icon"> אישור`;

    tag.onclick = () => {
      const fNameInput = document.getElementById(`tempFname${userIndex}`),
        lNameInput = document.getElementById(`tempLname${userIndex}`),
        emailInput = document.getElementById(`tempMail${userIndex}`),
        passInput = document.getElementById(`tempPass${userIndex}`);

      if (
        fNameInput &&
        lNameInput &&
        emailInput &&
        passInput &&
        fNameInput.value !== "" &&
        lNameInput.value !== "" &&
        emailInput.value !== "" &&
        passInput.value !== ""
      ) {
        users[userIndex].fName = fNameInput.value;
        users[userIndex].lName = lNameInput.value;
        users[userIndex].email = emailInput.value;
        users[userIndex].pass = passInput.value;
        localStorage.setItem("users", JSON.stringify(users));

        tablefName.innerHTML = users[userIndex].fName;
        tablelName.innerHTML = users[userIndex].lName;
        tableMail.innerHTML = users[userIndex].email;
        tablePass.innerHTML = users[userIndex].pass;

        tag.innerHTML = `<img src="./images/edit_16px.svg" alt="Edit Icon"> עריכה`;
        tag.onclick = () => editUser(tag);
      }
    };
  }
}

function removeRow(tag) {
  const index = tag.parentNode.parentNode.rowIndex;

  if (confirm("את/ה בטוח שברצונך למחוק את המשתמש?")) {
    const row = document.getElementById("table").rows[index],
      userIndex = users.findIndex(
        (user) =>
          user.fName.toLowerCase() === row.cells[0].innerHTML.toLowerCase() &&
          user.lName.toLowerCase() === row.cells[1].innerHTML.toLowerCase() &&
          user.email.toLowerCase() === row.cells[2].innerHTML.toLowerCase() &&
          user.pass === row.cells[3].innerHTML
      );
    users.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    table.deleteRow(index);
  }
}
