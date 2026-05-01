import { apiRequest } from "./api.js";

let timerInterval;

// 🔐 CHECK ACCESS + START LAB
async function checkAccess() {
  const userId = document.getElementById("userId").value;

  if (!userId) {
    alert("Enter User ID");
    return;
  }

  try {
    console.log("🔥 Checking Access for:", userId);

    const data = await apiRequest("/control/check-access", "POST", {
      user_id: userId,
    });

    console.log("✅ Response:", data);

    document.getElementById("result").innerText = data.message;

    if (data.access) {
      startCountdown(data.booking.end_time, userId);
    }

  } catch (error) {
    console.log("❌ Error:", error);
    document.getElementById("result").innerText = "Server Error";
  }
}

// ⏳ COUNTDOWN TIMER
function startCountdown(endTime, userId) {
  clearInterval(timerInterval);

  function updateTimer() {
    const now = new Date();
    const end = new Date();

    const [h, m, s] = endTime.split(":");
    end.setHours(h, m, s);

    const diff = end - now;

    if (diff <= 0) {
      clearInterval(timerInterval);

      document.getElementById("timer").innerText =
        "Session Expired ⛔";

      autoLogout(userId);
      return;
    }

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById("timer").innerText =
      `Time Left: ${minutes}m ${seconds}s`;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// 🔴 AUTO LOGOUT
async function autoLogout(userId) {
  try {
    await apiRequest("/control/force-logout", "POST", {
      user_id: userId,
    });

    console.log("🔴 Auto Logout Done");

    alert("Session Ended ⛔");

    window.location.href = "maindashboard.html";

  } catch (error) {
    console.log("Auto Logout Error:", error);
  }
}

// ✅ Make function global (for button click)
window.checkAccess = checkAccess;