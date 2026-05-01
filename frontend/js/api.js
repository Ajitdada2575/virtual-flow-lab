const BASE_URL = "http://localhost:5000/api";

// ===================================
// COMMON API REQUEST
// ===================================
export async function apiRequest(
endpoint,
method="GET",
body=null,
userId=null
){

try{

const token = localStorage.getItem("token");

const headers = {
"Content-Type":"application/json",
"Authorization": token || ""
};

// ✅ Send user id for dashboard route
if(userId){
headers["user_id"] = userId;
}

const res = await fetch(
`${BASE_URL}${endpoint}`,
{
method,
headers,
body: body ? JSON.stringify(body) : null
}
);

// Handle bad responses
if(!res.ok){
throw new Error("API Request Failed");
}

return await res.json();

}catch(error){

console.log("API Error:", error);

return {
message:"Server Error"
};

}

}


// ===================================
// APIs
// ===================================
export const API = {


// ---------- AUTH ----------
register:(data)=>
apiRequest(
"/auth/register",
"POST",
data
),

login:(data)=>
apiRequest(
"/auth/login",
"POST",
data
),


// ---------- BOOKINGS ----------
getBookings:()=>{

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){
return {
bookings:[]
};
}

return apiRequest(
"/bookings/my-bookings",
"GET",
null,
user.id || user.user_id
);

},

bookSlot:(data)=>
apiRequest(
"/bookings/request",
"POST",
data
),


// ---------- CONTROL (future) ----------
getActiveUsers:()=>
apiRequest(
"/control/active-users"
),

forceLogout:(data)=>
apiRequest(
"/control/force-logout",
"POST",
data
),


// ---------- FEEDBACK (future) ----------
submitFeedback:(data)=>
apiRequest(
"/feedback/submit",
"POST",
data
)

};