// Signup
if (document.getElementById("signupForm")) {
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let user = {
        name: name.value,
        college: college.value,
        email: email.value,
        mobile: mobile.value,
        password: password.value,
      };

      localStorage.setItem(user.email, JSON.stringify(user));
      alert("Registration Successful!");
      window.location.href = "login.html";
    });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem(loginEmail.value));

    if (user && user.password === loginPassword.value) {
      localStorage.setItem("currentUser", loginEmail.value);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Credentials");
    }
  });
}

// Slot Display
if (document.getElementById("slots")) {
  let slotsDiv = document.getElementById("slots");
  let slots = ["10:00-10:15", "10:15-10:30", "10:30-10:45"];

  slots.forEach((slot) => {
    let btn = document.createElement("button");
    btn.innerText = slot;
    btn.className = "btn";
    btn.onclick = function () {
      bookSlot(slot);
    };
    slotsDiv.appendChild(btn);
  });
}

// Booking Function
function bookSlot(slot) {
  let currentUser = localStorage.getItem("currentUser");
  let user = JSON.parse(localStorage.getItem(currentUser));

  let booking = {
    user: user.name,
    email: user.email,
    slot: slot,
    status: "Pending",
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking Request Sent to Admin!");
}

// Admin Panel
if (document.getElementById("adminRequests")) {
  let adminDiv = document.getElementById("adminRequests");
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.forEach((booking, index) => {
    if (booking.status === "Pending") {
      let div = document.createElement("div");
      div.innerHTML = `
                <p>${booking.user} - ${booking.slot}</p>
                <button onclick="approve(${index})" class="btn">Approve</button>
                <button onclick="reject(${index})" class="btn logout">Reject</button>
            `;
      adminDiv.appendChild(div);
    }
  });
}

function approve(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  bookings[index].status = "Approved";
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Approved!");
  location.reload();
}

function reject(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings"));
  bookings[index].status = "Rejected";
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Rejected!");
  location.reload();
}
