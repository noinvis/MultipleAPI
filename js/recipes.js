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
    return err;
  }
}

window.onload = () => {
  fetchData(`/recipes?limit=${limit}&skip=0`, createCard);
  fetchData(`/recipes/tags`, createCategory);
};

function createCard(data) {
  const fragment = document.createDocumentFragment();
  data.recipes.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <div class="main">
                <img src="${item.image}" alt="">
            </div>
            <div class="card__pad">
                <div class="card__between">
                    <p>Name:</p>
                    <p class="name">${item.name}</p>
                </div>
                <div class="card__between">
                    <p>Type:</p>
                    <p class="name">${item.mealType}</p>
                </div>
                <div class="card__between">
                    <p>Rating:</p>
                    <p class="name">${item.rating}</p>
                </div>
            </div>
        `;
    fragment.appendChild(div);
  });
  wrapperEl.appendChild(fragment);
}

btnEl.onclick = () => {
  offset++;
  fetchData(`/recipes?limit=${limit}&skip=${offset * limit}`, createCard);
};

function createCategory(tags) {
  const fragment = document.createDocumentFragment();
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    li.onclick = () => {
      document.querySelectorAll(".collection li").forEach((item) => {
        item.classList.remove("active");
      });
      li.classList.add("active");
      wrapperEl.innerHTML = "";
      fetchData(`/recipes/tag/${tag}`, createCard);
    };
    fragment.appendChild(li);
  });
  collectionEl.appendChild(fragment);
}
