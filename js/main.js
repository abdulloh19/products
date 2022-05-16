const elProductWrapper = document.querySelector(".product-wrapper");
elProductWrapper.className = "row list-unstyled g-3";

const createElement = function(tagName, className, text) {
  const createdElement = document.createElement(tagName);
  createdElement.className = className;
  
  if (text) {
    createdElement.textContent = text;
  }
  
  return createdElement;
}

const showDate = function(date) {
  let day = date.getDate();

  let month = date.getMonth() + 1;

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${date.getFullYear()}`
}

const createProduct = function(product) {
  const { id, title, img, price, model, addedDate, benefits } = product; //<--destrubrikatsiya
  
  const elProducts = createElement("li", "col-4");
  const elProductItem = createElement("div", "card");
  const elProductImg = createElement("img", "card-img-top");
  elProductImg.src = img;
  const elPoroductBody = createElement("div", "card-body");
  const elProductTitle = createElement("h3", "card-title", title);
  const elProductPrice = createElement("p", "card-text fw-bold");
  const elProductMark = createElement("mark");
  elProductMark.textContent = price;
  const elProductModel = createElement("p", "badge bg-success", model);
  const elAddedDate = new Date(addedDate)
  const elProductData = createElement("p", "card-text", showDate(elAddedDate));
  const elProductList = createElement("ul", "d-flex flex-wrap list-unstyled");
  
  for (let j = 0; j < product.benefits.length; j++) {
    
    const elProductBenefits = createElement("li", "badge bg-primary me-1 mb-1", benefits[j])
    
    elProductList.append(elProductBenefits);
  };
  
  const elProductIcons = createElement("div", "position-absolute top-0 end-0 d-flex");
  
  const elPoroductEdit = createElement("button", "btn rounded-0 btn-secondary");
  elPoroductEdit.dataset.bsToggle = "modal";
  elPoroductEdit.dataset.bsTarget = "#edit-product-modal";
  elPoroductEdit.dataset.id = id;
  const elPoroductEditIcon = createElement("i", "fa-solid fa-pen");
  elPoroductEdit.append(elPoroductEditIcon);
  elProductIcons.append(elPoroductEdit);
  
  
  const elPoroductDelete = createElement("button", "btn rounded-0 btn-danger");
  elPoroductDelete.dataset.id = id
  const elPoroductDeleteIcon = createElement("i", "fa-solid fa-trash");
  elPoroductDelete.append(elPoroductDeleteIcon);
  elProductIcons.append(elPoroductDelete);
  
  
  elProducts.append(elProductItem);
  elProductItem.append(elProductImg);
  elProductItem.append(elPoroductBody);
  elPoroductBody.append(elProductTitle)
  elPoroductBody.append(elProductPrice);
  elProductPrice.append(elProductMark);
  elPoroductBody.append(elProductModel);
  elPoroductBody.append(elProductData)
  elPoroductBody.append(elProductIcons);
  elPoroductBody.append(elProductList);
  
  return elProducts;
}

const productRender = function(productArray = products) {
  productArray.forEach(function(product) {
    const elProduct = createProduct(product)
    elProductWrapper.append(elProduct);
  })
}

const eladdProduct = document.querySelector("#add-product-form");
const elAddTitleInput = document.querySelector("#product-title");
const elAddPriceInput = document .querySelector("#price");
const elAddBenefits = document.querySelector("#benefits");
const elAddModal = new bootstrap.Modal(document.querySelector("#add-product-modal"))


productRender()

const elAddManufacturer = document.querySelector("#productManufacturer");
const elProductSelectInput = document.querySelector("#productManufacturers");
const elFilterManufarcturer = document.querySelector("#manufacturer");


for (let k = 0; k < manufacturers.length; k++) {
  const option = createElement("option", "", manufacturers[k].name)
  const editOption = createElement("option", "", manufacturers[k].name)
  const filterManufacturer = createElement("option", "", manufacturers[k].name)
  elAddManufacturer.append(option);
  elProductSelectInput.append(editOption);
  elFilterManufarcturer.append(filterManufacturer)
}

eladdProduct.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
  const titleValue = elAddTitleInput.value;
  const priceValue = elAddPriceInput.value;
  const manufacturerValue = elAddManufacturer.value;
  const benefitsValue = elAddBenefits.value;
  
  if(titleValue.trim() && priceValue.trim() && manufacturerValue && benefitsValue.trim()) {
    const addProduct = {
      id: Math.floor(Math.random() * 1000),
      title: titleValue,
      img: "https://picsum.photos/300/200",
      price: +priceValue,
      model: manufacturerValue,
      benefits: benefitsValue.split(","),
      addedDate: new Date().toDateString()
    }
    
    products.unshift(addProduct)
   const elProduct =  createProduct(addProduct);
   elProductWrapper.prepend(elProduct)

   elAddModal.hide()
   eladdProduct.reset()
  };  
})


const elProductTitleInput = document.querySelector("#edit-product-title");
const elProductPriceInput = document.querySelector("#edit-price");
const elProductBenefitsInput = document.querySelector("#edit-benefits");
const elEditForm = document.querySelector("#edit-product-form");
const elEditModal = new bootstrap.Modal(document.querySelector("#edit-product-modal"))

elProductWrapper.addEventListener("click", function(evt) {
  if(+evt.target.matches(".btn-danger")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex(function(product) {
     return product.id === clickedBtnId
    })

    products.splice(clickedBtnIndex, 1)
    elProductWrapper.innerHTML = "";
    productRender()
  }

  if (+evt.target.matches(".btn-secondary")) ;
  {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnElement = products.find(function(product) {
      return product.id === clickedBtnId;
    })

    elProductTitleInput.value = clickedBtnElement.title;
    elProductPriceInput.value = clickedBtnElement.price;
    elProductSelectInput.value = clickedBtnElement.model;
    elProductBenefitsInput.value = clickedBtnElement.benefits;

    elEditForm.dataset.id = clickedBtnId  
  }
})

elEditForm.addEventListener("submit", function(evt) {
evt.preventDefault();

const elEditTitleVal = elProductTitleInput.value;
const elPriceVal = elProductPriceInput.value;
const elSelectVal = elProductSelectInput.value;
const elBenefitsVal = elProductBenefitsInput.value;

if (elEditTitleVal && elPriceVal && elSelectVal && elBenefitsVal) {

  const elEditingProduct = {
    id: +evt.target.dataset.id,
    img: "https://picsum.photos/300/200",
    title: elProductTitleInput.value,
    price: elProductPriceInput.value,
    model: elProductSelectInput.value,
    addedDate: new Date().toISOString(),
    benefits: elProductBenefitsInput.value.split(",")
  }
  
  const elProductIndex = products.findIndex(function(product) {
    return elEditingProduct.id === product.id
  })
  products.splice(elProductIndex, 1, elEditingProduct)
  elProductWrapper.innerHTML = "";
  productRender()
  elEditModal.hide()
}
})

const elFormInput = document.querySelector("#form")
const elSearchInput = document.querySelector("#search");
const elFromInput = document.querySelector("#from");
const elToInput = document.querySelector("#to");
const elSortInput = document.querySelector("#sortby");

elFormInput.addEventListener("submit", function(evt) {
  evt.preventDefault();

  const searchInputValue = elSearchInput.value;
  const elFromValue = elFromInput.value;
  const elToValue = elToInput.value;
  const selectValue = elFilterManufarcturer.value;
  const sortValue = elSortInput.value;

  let filteredProduct = products.filter(function(product) {
    return product.title.toLowerCase().includes(searchInputValue.toLowerCase())
  }).filter(function(product) {
   return product.price >= elFromValue;
  }).filter(function(product) {
    if(elToValue) {
      return product.price <= elToValue;
    }
    return true 
  }).filter(function(product) {
    return product.model == selectValue;
  }).sort(function(a, b) {
    switch (sortValue) {
      case "1":
        if (a.name > b.name) {
          return 1
        } else if (a.name < b.name) {
          return -1
        } 
        return 0;
       case "2":
        return a.price - b.price;
        case "3":
          return b.price - a.price
      default:
        return 0
    }
  })

  elProductWrapper.innerHTML = "";
  productRender(filteredProduct);
  })
