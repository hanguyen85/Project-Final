const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  toggleLocalStorage();
  toggleRootClass();
});

function toggleRootClass() {
  const current = document.documentElement.getAttribute("data-bs-theme");
  const inverted = current == "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", inverted);
}

function toggleLocalStorage() {
  if (isLight()) {
    localStorage.removeItem("light");
  } else {
    localStorage.setItem("light", "set");
  }
}

function isLight() {
  return localStorage.getItem("light");
}

if (isLight()) {
  toggleRootClass();
}

//Room
function validateRoomForm() {
  var roomNumber = document.getElementById("roomNumber").value;
  var price = document.getElementById("price").value;
  var utilities = document.getElementById("utilities").value;
  var roomNumberError = document.getElementById("roomNumberError");
  var priceError = document.getElementById("priceError");
  var utilitiesError = document.getElementById("utilitiesError");

  roomNumberError.innerHTML = "";
  priceError.innerHTML = "";
  utilitiesError.innerHTML = "";

  if (roomNumber == "") {
    roomNumberError.innerHTML = "Please enter room number";
  }
  if (price == "") {
    priceError.innerHTML = "Please enter price";
  }
  if (utilities == "") {
    utilitiesError.innerHTML = "Please enter utilities";
  }
  if (price < 0) {
    priceError.innerHTML = "Price cannot be negative";
  }
  if (isNaN(roomNumber)) {
    roomNumberError.innerHTML = "Room Number must be a number";
  }
  if (isNaN(price)) {
    priceError.innerHTML = "Price must be a number";
  }
  if (price > 100 || price < 0) {
    priceError.innerHTML = "Price must be between 0 and 100";
  }

  //Check if an error is displayed. If there is a form is not sent
  if (
    roomNumberError.innerHTML ||
    priceError.innerHTML ||
    utilitiesError.innerHTML
  ) {
    return false;
  } else {
    return true;
  }
}

//Room Type
function validateRoomType() {
  var roomName = document.getElementById("roomName").value;
  var description = document.getElementById("description").value;
  var maxPeople = document.getElementById("maxPeople").value;
  var image = document.getElementById("image").value;
  var roomNameError = document.getElementById("roomNameError");
  var descriptionError = document.getElementById("descriptionError");
  var maxPeopleError = document.getElementById("maxPeopleError");
  var imageError = document.getElementById("imageError");

  roomNameError.innerHTML = "";
  descriptionError.innerHTML = "";
  maxPeopleError.innerHTML = "";
  imageError.innerHTML = "";

  if (roomName == "") {
    roomNameError.innerHTML = "Please enter room name";
  }
  if (description == "") {
    descriptionError.innerHTML = "Please enter description";
  }
  if (maxPeople == "") {
    maxPeopleError.innerHTML = "Please enter max people";
  }
  if (image == "") {
    imageError.innerHTML = "Please enter image URL";
  }
  if (maxPeople > 5 || maxPeople < 1) {
    maxPeopleError.innerHTML = "Max people must be between 1 and 5";
  }
  if (isNaN(maxPeople)) {
    maxPeopleError.innerHTML = "Max people must be a number";
  }

  if (
    roomNameError.innerHTML ||
    descriptionError.innerHTML ||
    maxPeopleError.innerHTML ||
    imageError.innerHTML
  ) {
    return false;
  } else {
    return true;
  }
}

//Check Contact us
function validateContact() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value.trim();
  var usernameError = document.getElementById("usernameError");
  var emailError = document.getElementById("emailError");
  var messageError = document.getElementById("messageError");

  usernameError.innerHTML = "";
  emailError.innerHTML = "";
  messageError.innerHTML = "";

  if (username == "") {
    usernameError.innerHTML = "Please enter username";
  }
  if (email == "") {
    emailError.innerHTML = "Please enter email";
  }
  if (message == "") {
    messageError.innerHTML = "Please enter message";
  }

  if (
    usernameError.innerHTML ||
    emailError.innerHTML ||
    messageError.innerHTML
  ) {
    return false;
  } else {
    return true;
  }
}
