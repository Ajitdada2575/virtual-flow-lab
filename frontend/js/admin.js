window.currentView = "bookings";

// 🔄 Auto Refresh Active Users Every 5 Sec
setInterval(() => {
  if (window.currentView === "active") {
    loadActiveUsers();
  }
}, 5000);

// 📊 Load All Bookings
async function loadBookings() {
  try {
    window.currentView = "bookings";

    const res = await fetch("http://localhost:5000/api/bookings");
    const data = await res.json();

    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='8'>No Bookings Found</td></tr>";
      return;
    }

    data.forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.slot_id}</td>
          <td>${item.start_time}</td>
          <td>${item.end_time}</td>
          <td>${item.status}</td>
          <td>-</td>
        </tr>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

// 👨‍💻 Load Live Active Users
async function loadActiveUsers() {
  try {
    window.currentView = "active";

    const res = await fetch("http://localhost:5000/api/control/active-users");
    const data = await res.json();

    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='8'>No Active Users</td></tr>";
      return;
    }

    data.forEach((user) => {
      tbody.innerHTML += `
        <tr class="active">
          <td>${user.user_id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.slot_id}</td>
          <td>${user.start_time}</td>
          <td>${user.end_time}</td>
          <td>🟢 Active</td>
          <td>
            <button onclick="forceLogout(${user.user_id})">
              🔴 Force Logout
            </button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

// 🔴 Force Logout
async function forceLogout(userId) {
  try {
    const res = await fetch(
      "http://localhost:5000/api/control/force-logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }
    );

    const data = await res.json();

    alert(data.message || "User Logged Out 🔴");

    loadActiveUsers();

  } catch (error) {
    console.log(error);
  }
}
import { apiRequest } from "./api.js";

//const users = await apiRequest("/control/active-users");
// 📜 Load Session Logs
async function loadSessionLogs() {
  try {

    window.currentView = "logs";

    const res = await fetch(
      "http://localhost:5000/api/control/session-logs"
    );

    const data = await res.json();

    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML =
        "<tr><td colspan='8'>No Session Logs Found</td></tr>";
      return;
    }
    document.getElementById("stats").innerText =
  `Active Users: ${data.length}`;

    data.forEach((log) => {
      tbody.innerHTML += `
        <tr>
          <td>${log.user_id}</td>
          <td>${log.name}</td>
          <td>${log.email}</td>
          <td>${log.slot_id}</td>
          <td>${log.login_time}</td>
          <td>${log.logout_time || "-"}</td>
          <td>${log.status}</td>
          <td>-</td>
        </tr>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}
// 📝 Load Feedback Data
async function loadFeedback(){

  const res = await fetch("http://localhost:5000/api/feedback");
  const data = await res.json();

  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";

  data.forEach(f => {

    tbody.innerHTML += `
      <tr>
        <td>${f.id}</td>
        <td>${f.user_id}</td>
        <td>${f.booking_id}</td>
        <td>${f.rating}</td>
        <td>${f.comments}</td>
        <td>${f.created_at}</td>
      </tr>
    `;

  });

}
// ✅ Make global
window.loadFeedback = loadFeedback;
// ✅ Make Global
window.loadSessionLogs = loadSessionLogs;