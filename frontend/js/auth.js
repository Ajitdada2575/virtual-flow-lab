import { API } from "./api.js";

async function loginUser() {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {

    console.log("🔥 Login Clicked");

    const data = await API.login({
      email,
      password
    });

    console.log("✅ Response:", data);

    if (data.user) {

      // Save logged user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // save token if backend sends it
      if(data.token){
        localStorage.setItem(
          "token",
          data.token
        );
      }

      document.getElementById("result").innerText =
        "Login Success ✅ Redirecting...";

      // ✅ Go to Main Dashboard (FIXED)
      setTimeout(() => {
        window.location.href = "maindashboard.html";
      }, 800);

    } else {

      document.getElementById("result").innerText =
        data.message || "Invalid Login";

    }

  } catch (error) {

    console.log("❌ Error:", error);

    document.getElementById("result").innerText =
      "Server Error";

  }

}

window.loginUser = loginUser;