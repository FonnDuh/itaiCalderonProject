const content = document.getElementById("inputPage");
let idCount = 0,
  newID,
  elementType,
  timer = setInterval(save, 5000);

if (
  localStorage.getItem("lastID") != null &&
  localStorage.getItem("elementData") != null &&
  localStorage.getItem("elementType") != null
) {
  content.innerHTML = localStorage.getItem("elementData");
  idCount = +localStorage.getItem("lastID");
  elementType = localStorage.getItem("elementType");
}

function addElement() {
  if (
    document.getElementById("width").value == "" ||
    document.getElementById("height").value == ""
  )
    return;
  let currentTime = new Date(),
    newElement,
    daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  elementType = document.getElementById("type").value;
  newID = `${elementType}-${idCount}`;
  content.innerHTML += `<${elementType} id='${newID}'></${elementType}>`;

  newElement = document.getElementById(`${elementType}-${idCount}`);
  if (elementType == "span") newElement.style.display = "inline-block"; // Element won't have intended values otherwise
  newElement.style.backgroundColor = document.getElementById("bgColor").value;
  newElement.style.width = document.getElementById("width").value + "px";
  newElement.style.height = document.getElementById("height").value + "px";
  newElement.innerText = document.getElementById("text").value;
  newElement.style.color = document.getElementById("fontColor").value;
  newElement.style.fontSize = document.getElementById("fontSize").value + "px";
  newElement.style.border = `${document.getElementById("borderSize").value}px ${
    document.getElementById("borderType").value
  } ${document.getElementById("borderColor").value}`;
  newElement.style.margin = document.getElementById("margin").value + "px";
  newElement.style.padding = document.getElementById("padding").value + "px";
  newElement.style.borderRadius =
    document.getElementById("radius").value + "px";
  newElement.style.boxShadow =
    document.getElementById("shadowX").value +
    "px " +
    document.getElementById("shadowY").value +
    "px " +
    document.getElementById("shadowBlur").value +
    "px " +
    document.getElementById("shadowSpread").value +
    "px " +
    document.getElementById("shadowColor").value;

  newElement.title = `Id: ${elementType}-${idCount} | BG-Color: ${
    document.getElementById("bgColor").value
  } | Width/Height: ${document.getElementById("width").value}px/${
    document.getElementById("height").value
  }px | Text: ${document.getElementById("text").value} | Font Color: ${
    document.getElementById("fontColor").value
  } | Font Size: ${document.getElementById("fontSize").value} | Border Size: ${
    document.getElementById("borderSize").value
  } | Border Type: ${
    document.getElementById("borderType").value
  } | Border Color: ${document.getElementById("borderColor").value} | Margin: ${
    document.getElementById("margin").value
  } | Padding: ${document.getElementById("padding").value} | Radius: ${
    document.getElementById("radius").value
  } | Shadow X: ${document.getElementById("shadowX").value} | Shadow Y: ${
    document.getElementById("shadowY").value
  } | Shadow Blue: ${
    document.getElementById("shadowBlur").value
  } | Shadow Spread: ${
    document.getElementById("shadowSpread").value
  } | Shadow Color: ${
    document.getElementById("shadowColor").value
  } | Time created: ${currentTime.getHours()}:${currentTime.getMinutes()}; ${
    daysOfWeek[currentTime.getDay()]
  }, ${currentTime.getDate()}/${
    currentTime.getMonth() + 1
  }/${currentTime.getFullYear()}`;
  idCount++;
}

function undo() {
  if (newID == null) return;
  idCount--;
  if (idCount < 0) {
    idCount = 0;
    return;
  }
  document.getElementById(`${elementType}-${idCount}`).outerHTML = "";
  save();
}

function reset() {
  content.innerHTML = "";
  idCount = 0;
}

function save() {
  if (typeof Storage !== "undefined") {
    if (content.innerHTML != null) {
      localStorage.setItem("elementData", content.innerHTML);
      localStorage.setItem("lastID", idCount);
      localStorage.setItem("elementType", elementType);
      console.log("Saved");
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function deleteData() {
  if (typeof Storage !== "undefined") {
    if (content.innerHTML != null) {
      localStorage.clear();
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}
