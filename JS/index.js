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

const renderCategories = (data) => {
  // inserto la primera opcion al select

  //inserto las demas opciones que vienen del api
  data.map((item, i) => {
    categorySelect.innerHTML += `
    <option value =${item.id}>${item.name}</option>`;
  });
};

// event listener para poder usar el filtro de categoria y de ordenar juntos
// uso un map para poder usar los dos a la vez dependiendo si hay en uno u otro un cabio se realiza el fethc
[category, orderBy].map((element, i) =>
  element.addEventListener("change", async (e) => {
    const cat = category.value;
    const ord = orderBy.value;

    //dependiendo del valor de category u orderBy paso los parametros, si solo hay categoria lo demas no se envia
    //si paso ambos se junta la busqueda y el filtro de ordenar por precio
    try {
      const response = await fetch(
        `https://bsale-test1.herokuapp.com/api/v1/products/${cat}?${
          ord === "d" ? "desc" : ord === "a" ? "asc" : ord === "s" ? "disc" : ""
        }=${ord}`
      );
      const data = await response.json();
      // una vez obtenida la data del fetch la paso a la funcion renderAll data que coloca las imagens y nombres en el html
      if (data) {
        renderAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  })
);


// Event listener del buscador no pude hacerlo funcionar con los otros filtros 
search.addEventListener("keyup", async (e) => {
  const ord = menu.innerText;

  if (events === "Enter") {
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
  }
});


//event listener de los filtros en resposive no lo pude hacer funcionar en combinado con las categorias y el buscador
//debido a que es otro tipo de evento, en cambio en la version web los dos son select y use event change
menu.addEventListener("click", async (e) => {
  const ord = e.target.innerHTML;

  try {
    const response = await fetch(
      `https://bsale-test1.herokuapp.com/api/v1/products?${
        ord === "Precio (mayor a menor)"
          ? "desc"
          : ord === "Precio (menor a mayor)"
          ? "asc"
          : ord === "Descuento (menor a mayor)"
          ? "disc"
          : ""
      }=${ord}`
    );
    const data = await response.json();

    if (data) {
      renderAllData(data);
    }
  } catch (error) {
    console.log(error);
  }
});

//Event listener para el buscador

getProducts();
getCategory();
