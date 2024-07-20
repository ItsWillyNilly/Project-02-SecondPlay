const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const logoutBtn = $(".btn-logout");
const loginHandler = async (event) => {
  try {
    event.preventDefault();
    const username = $("#username").val().trim();
    const password = $("#password").val();
    const res = await $.ajax({
      url: "/api/users/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
    });
    $("#username").val("");
    $("#password").val("");
    if (res) {
      window.location.replace("/");
    }
  } catch (error) {
    alert("failed to login");
  }
}
const signupHandler = async (event) => {
  try {
    event.preventDefault();
    const username = $("#signup-username").val().trim();
    const password = $("#signup-password").val();
    const res = await $.ajax({
      url: "/api/users/signup",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
    });
    $("#username").val("");
    $("#password").val("");
    if (res) {
      window.location.replace("/");
    }
  } catch (error) {
    console.log("finderror", error)
 
    alert("failed to signup");
  }
}
const logoutHandler = async (event) => {
  try {
    await $.ajax({
      url: "/api/users/logout",
      method: "POST",
    });
    window.location.replace("/login");
  } catch (error) {
    console.log(error);
    alert("failed to logout");
  }
};


loginForm.on("submit", loginHandler);
signupForm.on("submit", signupHandler);
logoutBtn.on("click", logoutHandler);