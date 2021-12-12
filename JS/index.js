let urlImg = "http://localhost:3000/api/v1/products";
let urlCategory = "http://localhost:3000/api/v1/categories";

// get all products

const getProducts = async () => {
  try {
    const response = await fetch(urlImg);
    const data = await response.json();

    if (data) {
      renderData(data);
    }
  } catch (error) {
    console.log(error);
  }
};
const getCategory = async () => {
  try {
    const response = await fetch(urlCategory);
    const data = await response.json();
    if (data) {
      renderCategories(data);
    } else {
      console.log("no hay data");
    }
  } catch (error) {
    console.log(error);
  }
};

const renderData = (data, info) => {
  const productSection = document.querySelector(".products-section");

  //   productSection.parentNode.removeChild(productSection);
  data.map((item, i) => {
    productSection.innerHTML += `
    <div>
    <img src= "${item.url_image}"/>
    <label>${item.name}</label>
    <span>
    <p>$ ${item.price}</p>
    ${
      parseInt(item.discount) !== 0 ? `<p>Descuento: ${item.discount}%</p>` : ""
    }
    </span>
    </div>`;
  });
};

const renderCategories = (category) => {
  console.log(category);
  const selectContainer = document.querySelector(".select-wrapper");
  const select = selectContainer.querySelector("select");
  console.log(selectContainer);
  console.log(select);

  category.length > 0 &&
    category.map((item, i) => {
      select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });
};

const search = document.querySelector(".search");

search.addEventListener("keyup", (e) => {
  var request = new XMLHttpRequest();

  // Instantiating the request object
  request.onload = function () {
    e.preventDefault();

    renderData(request.response, "search");
    console.log(request.response);
  };
  request.open(
    "GET",
    `http://localhost:3000/api/v1/products/search?term=${e.target.value}`
  );

  request.responseType = "json";
  request.send();
});

getProducts();
getCategory();
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {
    coverTrigger: false,
    constrainWidth: false,
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sel = document.querySelectorAll("select");
  var instances = M.FormSelect.init(sel, {});
});
