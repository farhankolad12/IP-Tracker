const API_KEY = "at_2O7qGq0QJ5kA6ZzQJ8qoB7uuPYIwQ";
const submitBtn = document.getElementById("submit");
const inputIP = document.getElementById("input-ip");

// GET MAP FOR CURRENT USER //
const getMap = (lat, long) => {
  const map = L.map("map", {
    center: [lat, long],
    zoom: 100,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  const marker = L.marker([lat, long]).addTo(map);
};

// GET MAP FOR OTHER USERS//
const getMapPeople = (lat, long) => {
  const el = document.createElement("div");
  el.setAttribute("id", `map${Math.floor(Math.random() * 30)}`);
  el.setAttribute(
    "style",
    " z-index: -1;position: absolute;top: 35.4%;height: 85%;width: 100%;"
  );
  document.querySelector(".main").append(el);
  const map = L.map(`${el.getAttribute("id")}`, {
    center: [lat, long],
    zoom: 100,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  const marker = L.marker([lat, long]).addTo(map);
};

// IP INFO FOR CURRENT USER //
const userIP = async () => {
  const res = await fetch("https://api.ipify.org/?format=json");
  const data = await res.json();
  const IP = data.ip;
  const resIP = await fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${IP}`
  );
  const dataIP = await resIP.json();
  console.log(dataIP);
  let output = "";
  output += `
  <div class="ip">
                <p>IP ADDRESS</p>
                <h3>${dataIP.ip}</h3>
            </div>
            <div class="border"></div>
            <div class="location">
                <p>LOCATION</p>
                <h3>${dataIP.location.city}, ${dataIP.location.region} ${dataIP.location.postalCode}</h3>
            </div>
            <div class="border"></div>
            <div class="time-zone">
                <p>TIMEZONE</p>
                <h3>UTC${dataIP.location.timezone}</h3>
            </div>
            <div class="border"></div>
            <div class="isp">
                <p>ISP</p>
                <h3>${dataIP.isp}</h3>
            </div>
  `;
  const latititude = dataIP.location.lat;
  const longitude = dataIP.location.lng;
  getMap(latititude, longitude);
  document.querySelector(".ip-container").innerHTML = output;
};

// IP INFO FOR OTHER USER //
const getUserInfo = async (e) => {
  document.querySelector("#map") ? document.querySelector("#map").remove() : "";
  e.preventDefault();
  if (inputIP.value == "") {
    alert("No IP");
  } else {
    const resIP = await fetch(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${inputIP.value}`
    );
    const dataIP = await resIP.json();
    console.log(dataIP);
    let output = "";
    output += `
  <div class="ip">
                <p>IP ADDRESS</p>
                <h3>${dataIP.ip}</h3>
            </div>
            <div class="border"></div>
            <div class="location">
                <p>LOCATION</p>
                <h3>${dataIP.location.city}, ${dataIP.location.region} ${dataIP.location.postalCode}</h3>
            </div>
            <div class="border"></div>
            <div class="time-zone">
                <p>TIMEZONE</p>
                <h3>UTC${dataIP.location.timezone}</h3>
            </div>
            <div class="border"></div>
            <div class="isp">
                <p>ISP</p>
                <h3>${dataIP.isp}</h3>
            </div>
  `;
    const latititude = dataIP.location.lat;
    const longitude = dataIP.location.lng;
    getMapPeople(latititude, longitude);
    document.querySelector(".ip-container").innerHTML = output;
  }
};

submitBtn.addEventListener("click", getUserInfo);
document.addEventListener("DOMContentLoaded", userIP);
