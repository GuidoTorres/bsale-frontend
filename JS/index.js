let urlImg = "https://bsale-test1.herokuapp.com/api/v1/products";
let urlCategory = "https://bsale-test1.herokuapp.com/api/v1/categories";

const category = document.querySelector(".select-category");
const search = document.querySelector(".search");
const productSection = document.querySelector(".products-section");
const orderBy = document.querySelector(".select-order");

// Para obtener los productos desde la api

const getProducts = async () => {
  try {
    const response = await fetch(urlImg);
    const data = await response.json();

    if (data) {
      renderAllData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// Para obtener las categorias desde la api
const getCategory = async () => {
  try {
    const response = await fetch(urlCategory);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Para renderizar la imagen, nombre, precio, y descuento
const renderAllData = (data) => {
  const productSection = document.querySelector(".products-section");

  //  map a la data del api para insertar los productos en html
  productSection.innerHTML = "";

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

const filterData = async () => {
  // Listener para la seleccion de categorias
  const data1 = "";
  category.addEventListener("change", async (e) => {
    console.log(e.target.value);
    try {
      const response = await fetch(
        `https://bsale-test1.herokuapp.com/api/v1/products/${e.target.value}`
      );
      const data = await response.json();

      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  });

  //Listener para los filtros
  orderBy.addEventListener("change", async (e) => {
    try {
      const response = await fetch(
        `https://bsale-test1.herokuapp.com/api/v1/products?${
          e.target.value === "1"
            ? "desc"
            : e.target.value === "2"
            ? "asc"
            : e.target.value === "3"
            ? "disc"
            : ""
        }=${e.target.value}`
      );
      console.log(response);
      const data = await response.json();

      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

// Listener para el buscador
search.addEventListener("keyup", async (e) => {
  //peticion usando ajax

  try {
    const response = await fetch(
      `https://bsale-test1.herokuapp.com/api/v1/products/search?term=${e.target.value}`
    );
    const data = await response.json();

    if (data) {
      renderAllData(data);
    }
  } catch (error) {
    console.log(error);
  }
});

// Listener para el select e input de materialize de materialize
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var sel = document.querySelectorAll("select");
  var instances = M.Dropdown.init(elems, {
    coverTrigger: false,
    constrainWidth: false,
  });
  var instances = M.FormSelect.init(sel, {
    constrainWidth: false,
    coverTrigger: false,
  });
});

getProducts();
getCategory();
