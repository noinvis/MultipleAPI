const API_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper");
const btnEl = document.querySelector(".btn")
const collectionEl = document.querySelector(".collection")
let limit = 8
let offset = 0

async function fetchData(endpoint, callback) {
    try{
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        callback(data);
    }
    catch(err){
        return err
    }
}

window.onload = () => {
  fetchData(`/products?limit=${limit}&skip=0`, createCard);
  fetchData(`/products/category-list`, createCategory);
};

function createCard(data) {
    const fragment = document.createDocumentFragment()
    data.products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <div class="main">
                <img src=${product.thumbnail} alt="">
            </div>
            <div class="card__pad">
                <div class="card__between">
                    <p>Title:</p>
                    <p class="name">${product.title}</p>
                </div>
                <div class="card__between">
                    <p>Category:</p>
                    <p class="name">${product.category}</p>
                </div>
                <div class="card__between">
                    <p>Price:</p>
                    <p class="name">${product.price}</p>
                </div>
            </div>
        `;
        fragment.appendChild(div)
    });
    wrapperEl.appendChild(fragment)
}

btnEl.onclick = () => {
    offset++
    fetchData(`/products?limit=${limit}&skip=${8 * offset}`, createCard);

}
function createCategory(data) {
    const fragment = document.createDocumentFragment()
    data.forEach(category => {
        const li = document.createElement("li")
        li.textContent = category;
        li.onclick = () => {
            document.querySelectorAll(".collection li").forEach(item => {
                item.classList.remove("active");
            });
            li.classList.add("active");
            wrapperEl.innerHTML = "";
            fetchData(`/products/category/${category}`, createCard);
        };
        fragment.appendChild(li);
    });
    collectionEl.appendChild(fragment);
}
