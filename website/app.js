/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=742ffe5f6920153c0e73ee04acc40406';
 
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){ 
    console.log("performAction");
    //Create a new date instance dynamically with JS
    let d = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonth = monthNames[d.getMonth()];
    let newDate = newMonth+' '+ d.getDate()+', '+ d.getFullYear();
    const newZIP = document.getElementById('zip').value;
    const newCountry = document.getElementById('country').value;
    const content = document.getElementById('feelings').value;
    getWeather (baseURL, newZIP, newCountry, apiKey)
    .then (function(data){
      console.log("Data returned by getWeather")
      console.log(data)
      postWeather('/', {temp: data, date: newDate, feelings: content})
    })
    .then(()=>updateUI());
};

const getWeather = async (baseURL, zip, country, key)=>{
  console.log("getWeather");
  const response = await fetch (`${baseURL + zip},${country}${key}`) 
     try {
      const newData = await response.json();
      const temp = newData.main.temp;      
      return(temp);
    }catch(error) {
      console.log("error", error);
    }
};

const postWeather = async ( url = '', data = {})=>{
  console.log("postWeather");
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },      
    body: JSON.stringify(data), 
  });
  try {
    const newData = await response.json();
    console.log("Data returned by the POST fetch made by postWeather")
    console.log(newData)
    return newData;
  }catch(error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  console.log("updateUI");
  const request = await fetch('/aa');
  try{
    const allData = await request.json();
    console.log("Data returned by GET fetch");
    console.log(allData);
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.feelings;
  }catch(error){
    console.log("error", error);
  }
}