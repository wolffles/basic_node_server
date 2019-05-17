


// ------------------- local storage ---------------------------s
// setting local and sessions storage
localStorage.setItem('choosingHat', 'ceral');
sessionStorage.setItem('breakfast', 'eggs')

// getting value for key in local storage
console.log(localStorage.getItem('breakfast'))
console.log(sessionStorage.getItem("breakfast"));


// ---------------- practice cookies ----------------
let time = new Date();// uses your time zone
let day = new Date();
let month = new Date();
let year = new Date();
let expired = new Date();
expired.setTime(time - (5 * 60 * 1000)); // 5 minutes in the past
time.setTime(time.getTime() + (5*60*1000)) // 5 minutes in the future
day.setDate(day.getDate() + 1)
month.setMonth(day.getMonth() + 1)
year.setFullYear(day.getFullYear() + 1)

// returns in your timezone
console.log(expired);
console.log(time) 
console.log(year)
console.log(day)
console.log(month)

// expire date needs to be in UTC or GMT (greenwich time)
document.cookie = "time=5 mins; expires="+time.toUTCString()+"; path=/storage"
document.cookie = "day=1 day; expires=" + day.toUTCString() + "; path=/storage";
document.cookie = "month=1 month; expires=" + month.toUTCString() + "; path=/storage";
document.cookie = "year=1 year; expires=" + year.toUTCString() + "; path=/storage";
console.log(document.cookie)


// ------------------------ choosing hat problem--------------
// if localstorage has already been stored
  if (!localStorage.getItem('body')){
    localStorage.setItem('body', choosingHat())
    console.log('localstorage hit')
  }
  const localBody = document.querySelector('body')
  localBody.style.backgroundColor = localStorage.getItem("body");

//session storage only last while in tab or redirected
  sessionStorage.setItem('body', choosingHat2())  
  const sessionText = document.querySelector('body')
  sessionText.style.color = sessionStorage.getItem("body");


  //------------------------- cookie storage ---------------------
  if(!readCookies(document.cookie).body){
    document.cookie = "body="+choosingHat3()+";expires="+time.toUTCString()+";path=/storage";
    console.log("cookie storage hit");
  }else{
    const cookieBoxShadow = document.querySelector('table')
    cookieBoxShadow.style.backgroundColor = readCookies(document.cookie).body
  }

  



// ----------------------private functions -----------------
function addTime(int){
  let minutes = new Date()
  minutes.setTime(time.getTime() + (int * 60 * 1000))
  return minutes
}
// creates a cookie object
function readCookies(cookies){
  cookies = cookies.split(';')
  let obj = {}
  cookies.forEach((cookie)=>{
    cookie = cookie.split('=')
    obj[cookie[0].trim()] = cookie[1].trim()
  })
  return obj
}


function choosingHat(){
  let num = Math.random()
  let plum = .7
  return num <= plum ? "plum" : "skyblue";
}
function choosingHat2() {
  let num = Math.random();
  let plum = 0.4;
  return num <= plum ? "orange" : "green";
}
function choosingHat3() {
  let num = Math.random();
  let plum = 0.5;
  return num <= plum ? "white" : "grey";
}


// ----------------------page functions -------------------

//sets expiration date in the past
function clearCookies(){
  document.cookie = "time=value; expires=" + expired.toUTCString() + "; path=/storage";
  document.cookie = "day=wolfie; expires=" + expired.toUTCString() + "; path=/storage";
  document.cookie = "month=wolfie; expires=" + expired.toUTCString() + "; path=/storage";
  document.cookie = "year=wolfie; expires=" + expired.toUTCString() + "; path=/storage";
}

// clears both local and session
function clearStorage(){
  localStorage.clear()
  sessionStorage.clear();
}


// remember to add the toUTCString() for expiry dates
const cookieForm = document.querySelector('form')
function addCookie(e){
  e.preventDefault()
  document.cookie = e.target[0].value+"="+e.target[1].value+"; expires="+addTime(e.target[2].value).toUTCString()+'; path=/storage'
}
cookieForm.addEventListener("submit", addCookie);