const API_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper");
const btnEl = document.querySelector(".btn");
const collectionEl = document.querySelector(".collection");
let limit = 8;
let offset = 0;

async function fetchData(endpoint, callback) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    callback(data);
  } catch (err) {
    console.error(err);
  }
}

window.onload = () => {
  fetchData(`/users?limit=${limit}&skip=0`, createCard);
};

function createCard(data) {
  const fragment = document.createDocumentFragment();
  data.users.forEach((user) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="main">
        <img src="${user.image}" alt="">
      </div>
      <div class="card__pad">
        <div class="card__between">
          <p>Fullname:</p>
          <p class="name">${user.firstName} ${user.lastName}</p>
        </div>
        <div class="card__between">
          <p>Age:</p>
          <p class="name">${user.age}</p>
        </div>
        <div class="card__between">
          <p>Country:</p>
          <p class="name">${user.address.city}</p>
        </div>
        <div class="card__between">
          <p>Phone:</p>
          <p class="name">${user.phone}</p>
        </div>
      </div>
    `;
    fragment.appendChild(div);
  });
  wrapperEl.appendChild(fragment);
}

btnEl.onclick = () => {
  offset++;
  fetchData(`/users?limit=${limit}&skip=${offset * limit}`, createCard);
};
