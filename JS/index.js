let urlImg = "https://bsale-test1.herokuapp.com/api/v1/products";
let urlCategory = "https://bsale-test1.herokuapp.com/api/v1/categories";

const productSection = document.querySelector(".products-section");
const search = document.querySelector(".search");
const category = document.querySelector(".select-category");
const orderBy = document.querySelector("#orderBy");
const menu = document.querySelector(".menu");
const categorySelect = document.querySelector(".select-category");

// Para obtener todos los productos desde la api de manera asincrona

const getProducts = async () => {
  //obtengo todos los productos
  try {
    const response = await fetch(urlImg);
    const data = await response.json();

    // si hay respuesta una vez se realizae el fetch
    if (data) {
      //paso la data a la funcion renderAll
      renderAllData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// Para obtener las categorias desde la api de manera asincrona
const getCategory = async () => {
  try {
    const response = await fetch(urlCategory);
    const data = await response.json();
    if (data) {
      renderCategories(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// Para renderizar la imagen, nombre, precio, y descuento
const renderAllData = (data) => {
  const productSection = document.querySelector(".products-section");

  //  map a la data del api para insertar los productos en html
  productSection.innerHTML = "";
  //mediante el map recorro todo el json y genero el div para colocarlo en el html
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

//Para renderizar las categorias en el select
const renderCategories = (data) => {
  // inserto la primera opcion al select

  //inserto las demas opciones que vienen del api
  data.map((item, i) => {
    categorySelect.innerHTML += `
    <option value =${item.id}>${item.name}</option>`;
  });
};

//En esta funcion combino la busqueda y el filtro por precio
const SearchFunction = async (e) => {
  const search = document.querySelector(".search");
  const orderBy = document.querySelector("#orderBy");
  const category = document.querySelector(".select-category");

  const cat = category.value;
  const orderValue = orderBy.value;
  const searchValue = search.value;
  const menuValue = e.target.innerText;

  // aca valido que se ejecute la busqueda solamente si se presiona enter
  if (e.code === "Enter" && searchValue !== "") {
    try {
      const response = await fetch(
        `https://bsale-test1.herokuapp.com/api/v1/products/search?term=${searchValue}`
      );
      const data = await response.json();

      // si hay respuesta con la data se renderiza todo
      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // este if se cuando hay una busqueda y se selecciona un filtro
  if ((searchValue !== "" && orderValue) || (menuValue && cat === "")) {
    try {
      console.log("busqueda y order");
      const response =
        //esta funcion se da cuando hay una busqueda y un filtro seleccionado

        orderValue !== ""
          ? await fetch(
              `https://bsale-test1.herokuapp.com/api/v1/products/search?term=${searchValue}&${
                //dependiendo del valor de order value se cambia el parametro para cambiar el filtro a ascendente descendente
                orderValue === "d"
                  ? "desc"
                  : orderValue === "a"
                  ? "asc"
                  : orderValue === "s"
                  ? "disc"
                  : ""
              }=${
                orderValue === "d"
                  ? 1
                  : orderValue === "a"
                  ? 2
                  : orderValue === "s"
                  ? 3
                  : ""
              }`
            )
          : //esta funcion se da cuando hay una busqueda y un filtro del menu en resposive

            await fetch(
              `https://bsale-test1.herokuapp.com/api/v1/products/search?term=${searchValue}&${
                menuValue === "Precio (mayor a menor)"
                  ? "desc"
                  : menuValue === "Precio (menor a mayor)"
                  ? "asc"
                  : menuValue === "Descuento (menor a mayor)"
                  ? "disc"
                  : ""
              }=${
                menuValue === "Precio (mayor a menor)"
                  ? 1
                  : menuValue === "Precio (menor a mayor)"
                  ? 2
                  : menuValue === "Descuento (menor a mayor)"
                  ? 3
                  : ""
              }`
            );
      const data = await response.json();
      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//funcion que junta el filtro de categoria con el de precios
const orderFunction = async (e) => {
  const category = document.querySelector(".select-category");
  const orderBy = document.querySelector("#orderBy");

  const orderValue = orderBy.value;
  const cat = category.value;
  const menuValue = e.target.innerHTML;

  // si se seleccion una categoria se hace el try
  if (cat !== "Seleccione categoria") {
    try {
      //si se obtiene un valor desde el select se hace este fetch obteniendo categoria y orden
      const response =
        orderValue !== ""
          ? await fetch(
              `https://bsale-test1.herokuapp.com/api/v1/products/${cat}?${
                orderValue === "d"
                  ? "desc"
                  : orderValue === "a"
                  ? "asc"
                  : orderValue === "s"
                  ? "disc"
                  : ""
              }=${orderValue}`
            )
          : //si se obtiene un valor desde el menu en responsive se hace este fetch obteniendo categoria y orden

            await fetch(
              `https://bsale-test1.herokuapp.com/api/v1/products/${cat}?${
                menuValue === "Precio (mayor a menor)"
                  ? "desc"
                  : menuValue === "Precio (menor a mayor)"
                  ? "asc"
                  : menuValue === "Descuento (menor a mayor)"
                  ? "disc"
                  : ""
              }=${
                menuValue === "Precio (mayor a menor)"
                  ? 1
                  : menuValue === "Precio (menor a mayor)"
                  ? 2
                  : menuValue === "Descuento (menor a mayor)"
                  ? 3
                  : ""
              }`
            );
      const data = await response.json();
      // una vez obtenida la data del fetch la paso a la funcion renderAll data que coloca las imagens y nombres en el html
      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//event listener relacionado a la busqueda
search.addEventListener("keyup", SearchFunction, false);
menu.addEventListener("click", SearchFunction, false);
orderBy.addEventListener("change", SearchFunction, false);

//event listener que relaciona los filtros
category.addEventListener("change", orderFunction, false);
orderBy.addEventListener("change", orderFunction, false);
menu.addEventListener("click", orderFunction, false);
search.addEventListener("keyup", orderFunction, false);

getProducts();
getCategory();
