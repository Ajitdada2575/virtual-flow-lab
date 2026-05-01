import { API } from "./api.js";

const user = JSON.parse(localStorage.getItem("user"));

if (!user){
window.location.href="first.html";
}

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("name").innerText =
user.name || "User";

document.getElementById("username").innerText =
user.name || "User";

loadDashboard();

// auto refresh
setInterval(loadDashboard,5000);

});


// =============================
// DASHBOARD
// =============================
async function loadDashboard(){

try{

const data = await API.getBookings();

console.log("API:",data);

const bookings = Array.isArray(data)
? data
: (data.bookings || []);

console.log("Bookings:",bookings);

const now = new Date();


// --------------------
// COMPLETED / TERMINATED
// --------------------
const completed =
bookings.filter(b =>
b.status?.toLowerCase()==="completed" ||
b.status?.toLowerCase()==="terminated" ||
(
b.status?.toLowerCase()==="approved" &&
new Date(b.end_time) < now
)
);


// --------------------
// UPCOMING / LIVE
// only future/live approved
// --------------------
const upcoming =
bookings.filter(b =>
b.status?.toLowerCase()==="approved" &&
new Date(b.end_time) >= now
);


// stats
document.getElementById("upcoming").innerText =
upcoming.length;

document.getElementById("completed").innerText =
completed.length;


// --------------------
// TOTAL LAB HOURS
// --------------------
let hours = 0;

completed.forEach(slot=>{

const start =
new Date(slot.start_time);

const end =
new Date(slot.end_time);

if(!isNaN(start) && !isNaN(end)){
hours +=
(end-start)/(1000*60*60);
}

});

document.getElementById("hours").innerText =
hours.toFixed(1);


// --------------------
// NEXT SLOT (nearest future)
// --------------------
if(upcoming.length>0){

upcoming.sort(
(a,b)=>
new Date(a.start_time) -
new Date(b.start_time)
);

const next = upcoming[0];
// ✅ SAVE SLOT TIME FOR LAB
localStorage.setItem("start_time", next.start_time);
localStorage.setItem("end_time", next.end_time);


document.getElementById("experiment").innerText =
next.experiment ||
"Flow Control Experiment";

document.getElementById("time").innerText =
formatDate(next.start_time) +
" → " +
formatDate(next.end_time);


// live button
checkTime(
next.start_time,
next.end_time
);

}else{

document.getElementById("experiment").innerText =
"No Upcoming Slot";

document.getElementById("time").innerText =
"--";

const btn=
document.getElementById("enterBtn");

btn.disabled=true;
btn.innerText="No Live Slot";

}

}catch(e){

console.log("Dashboard Error:",e);

}

}



// =============================
// ENTER LAB ENABLE DURING LIVE SLOT
// =============================
function checkTime(start,end){

const now=new Date();

const startTime=new Date(start);
const endTime=new Date(end);

const btn=
document.getElementById("enterBtn");


if(
now>=startTime &&
now<=endTime
){

btn.disabled=false;
btn.innerText="🟢 Enter Lab";

}
else if(now < startTime){

btn.disabled=true;
btn.innerText="Slot Not Live";

}
else{

btn.disabled=true;
btn.innerText="Session Over";

}

}



// =============================
function formatDate(date){

const d=new Date(date);

if(isNaN(d)) return "Invalid Slot Time";

return d.toLocaleString(
'en-IN',
{
day:'numeric',
month:'short',
year:'numeric',
hour:'numeric',
minute:'2-digit'
}
);

}



// =============================
window.logout=()=>{
localStorage.clear();
window.location.href="first.html";
};

window.goBooking=()=>{
window.location.href="dashboard.html";
};

window.enterLab = function(){

const startTime = localStorage.getItem("start_time");
const endTime = localStorage.getItem("end_time");

console.log("Sending to lab:", startTime, endTime); // 🔥 DEBUG

if(!startTime || !endTime){
alert("No slot data found ❌");
return;
}

window.location.href =
`lab.html?start=${encodeURIComponent(startTime)}&end=${encodeURIComponent(endTime)}`;

};