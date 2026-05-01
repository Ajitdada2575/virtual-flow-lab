function formatDateTime(dt){
return dt.replace("T"," ") + ":00";
}


// Load logged user details
function loadUserData(){

const user =
JSON.parse(localStorage.getItem("user"));

if(!user){
window.location.href="login.html";
return;
}

document.getElementById("userId").value =
user.id || user.user_id;

document.getElementById("name").value =
user.name;

document.getElementById("email").value =
user.email;

}

window.onload = loadUserData;



async function bookSlot(){

const user_id =
document.getElementById("userId").value;

const slot_id =
document.getElementById("slotId").value;

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

let start_time =
document.getElementById("startTime").value;

let end_time =
document.getElementById("endTime").value;


if(
!user_id ||
!slot_id ||
!name ||
!email ||
!start_time ||
!end_time
){
alert("Fill all fields");
return;
}


// format datetime
start_time = formatDateTime(start_time);
end_time = formatDateTime(end_time);


try{

const res = await fetch(
"http://localhost:5000/api/bookings/request",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id,
slot_id,
name,
email,
start_time,
end_time
})
}
);

const data = await res.json();

document.getElementById("result").innerHTML =
"Request sent to admin ✅ Redirecting...";


// OPTIONAL store pending booking locally
localStorage.setItem(
"pending_slot",
JSON.stringify({
slot_id,
start_time,
end_time,
status:"pending"
})
);


// Auto Redirect
setTimeout(()=>{

window.location.href=
"maindashboard.html";

},2000);


}catch(error){

console.log(error);

document.getElementById("result").innerText=
"Server Error";

}

}