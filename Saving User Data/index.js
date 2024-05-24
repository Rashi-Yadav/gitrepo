function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/2dc919a6d60549cb9165cd9e0e60858c/appointmentData",
      userDetails
    )
    .then((response) => {
      displayUserOnScreen(response.data)
    })
    .catch((error) => console.log(error));


  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/2dc919a6d60549cb9165cd9e0e60858c/appointmentData")
    .then((response) => {
      console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => console.log(error));
  // const localStorageObj = localStorage;
  // const localStorageKeys = Object.keys(localStorageObj);

  // for(var i = 0;i<localStorageKeys.length;i++){
  //   const keys = localStorageKeys[i];
  //   const userStr = localStorageObj[keys];
  //   const userobj = JSON.parse(userStr);
  //   displayUserOnScreen(userobj)
  // }
})

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);



  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // localStorage.removeItem(userDetails.email);
    axios
      .delete(`https://crudcrud.com/api/2dc919a6d60549cb9165cd9e0e60858c/appointmentData/${userDetails._id}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  });

  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // localStorage.removeItem(userDetails.email);
    axios
      .delete(`https://crudcrud.com/api/2dc919a6d60549cb9165cd9e0e60858c/appointmentData/${userDetails._id}`)
      .then((data) => alert('Edit the details then submit'))
      .catch((err) => console.log(err));

    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    userList.appendChild(userItem)
  });
}
