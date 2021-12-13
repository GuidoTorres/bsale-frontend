let urlImg = "https://bsale-test1.herokuapp.com/api/v1/products";
let urlCategory = "https://bsale-test1.herokuapp.com/api/v1/categories";

const productSection = document.querySelector(".products-section");
const search = document.querySelector(".search");
const category = document.querySelector(".select-category");
const orderBy = document.querySelector("#orderBy");

// Para obtener todos los productos desde la api

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

// event listener para poder usar el filtro de categoria y de ordenar por a la vez
[category, orderBy].map((element, i) =>
  element.addEventListener("change", async (e) => {
    console.log(category.value);

    const cat = category.value;
    const ord = orderBy.value;

    try {
      const response = await fetch(
        `https://bsale-test1.herokuapp.com/api/v1/products/${cat}?${
          ord === "d" ? "desc" : ord === "a" ? "asc" : ord === "s" ? "disc" : ""
        }=${ord}`
      );
      const data = await response.json();

      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  })
);

//Event listener para el buscador
search.addEventListener("keyup", async (e) => {
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

// Listener para que funcione el select y el input de materialize, es copiar y pegar de la documentacion
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
