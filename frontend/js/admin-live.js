async function loadActiveUsers() {
  try {
    const res = await fetch("http://localhost:5000/api/control/active-users");

    const data = await res.json();

    const table = document.getElementById("liveUsers");
    table.innerHTML = "";

    data.forEach((user) => {
      const row = `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.slot_id}</td>
          <td>${user.start_time}</td>
          <td>${user.end_time}</td>
        </tr>
      `;

      table.innerHTML += row;
    });
  } catch (error) {
    console.log(error);
  }
}

// Load Immediately
loadActiveUsers();

// Auto Refresh Every 5 sec
setInterval(loadActiveUsers, 5000);
