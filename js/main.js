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

const renderProduct = function(product) {
  
  const elProducts = createElement("li", "col-4");
  const elProductItem = createElement("div", "card");
  const elProductImg = createElement("img", "card-img-top");
  elProductImg.src = product.img;
  const elPoroductBody = createElement("div", "card-body");
  const elProductTitle = createElement("h3", "card-title", product.title);
  const elProductPrice = createElement("p", "card-text fw-bold");
  const elProductMark = createElement("mark");
  elProductMark.textContent = product.price;
  const elProductModel = createElement("p", "badge bg-success", product.model);
  const addedDate = new Date(product.addedDate)
  const elProductData = createElement("p", "card-text", `${addedDate.getDate()}.${(addedDate.getMonth() + 1)}.${addedDate.getFullYear()}`);
  const elProductList = createElement("ul", "d-flex flex-wrap list-unstyled");
  
  for (let j = 0; j < product.benefits.length; j++) {
    
    const elProductBenefits = createElement("li", "badge bg-primary me-1 mb-1", product.benefits[j])
    
    elProductList.append(elProductBenefits);
  };
  
  const elProductIcons = createElement("div", "position-absolute top-0 end-0 d-flex");
  
  const elPoroductEdit = createElement("button", "btn rounded-0 btn-secondary");
  elPoroductEdit.dataset.bsToggle = "modal";
  elPoroductEdit.dataset.bsTarget = "#edit-product-modal";
  elPoroductEdit.dataset.id = product.id;
  const elPoroductEditIcon = createElement("i", "fa-solid fa-pen");
  elPoroductEdit.append(elPoroductEditIcon);
  elProductIcons.append(elPoroductEdit);
  
  
  const elPoroductDelete = createElement("button", "btn rounded-0 btn-danger");
  elPoroductDelete.dataset.id = product.id
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

const productRender = function(product) {
  products.forEach(function(product) {
    const elProduct = renderProduct(product)
    elProductWrapper.append(elProduct);
  })
}

const eladdProduct = document.querySelector("#add-product-form");
const elAddTitleInput = document.querySelector("#product-title");
const elAddPriceInput = document .querySelector("#price");
const elAddBenefits = document.querySelector("#benefits");

productRender()

const elAddManufacturer = document.querySelector("#productManufacturer");

for (let k = 0; k < manufacturers.length; k++) {
  const option = createElement("option", "", manufacturers[k].name)
  elAddManufacturer.append(option);
}

eladdProduct.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
  const titleValue = elAddTitleInput.value;
  const priceValue = elAddPriceInput.value;
  const manufacturerValue = elAddManufacturer.value;
  const benefitsValue = elAddBenefits.value;
  
  if(titleValue.trim() && priceValue.trim() && manufacturerValue && benefitsValue.trim()) {
    const addProduct = {
      title: titleValue,
      img: "https://picsum.photos/300/200",
      price: +priceValue,
      model: manufacturerValue,
      benefits: benefitsValue.split(" "),
      addedDate: new Date().toDateString()
    }
    
    products.unshift(addProduct)
   const elProduct =  renderProduct(addProduct);
   elProductWrapper.prepend(elProduct)
    
   eladdProduct.reset()
  };  
})


const elProductTitleInput = document.querySelector("#edit-product-title");

const elProductPriceInput = document.querySelector("#edit-price");
const elProductSelectInput = document.querySelector("#productManufacturers");
const elProductBenefitsInput = document.querySelector("#edit-benefits");
const elEditForm = document.querySelector("#edit-product-form")

elProductWrapper.addEventListener("click", function(evt) {
  if(evt.target.matches(".btn-danger")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex(function(product) {
     return product.id === clickedBtnId
    })

    products.splice(clickedBtnIndex, 1)
    elProductWrapper.innerHTML = "";
    productRender()
  }

  if (evt.target.matches(".btn-secondary")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnElement = products.find(function(product) {
      return product.id === clickedBtnId;
    })

    elProductTitleInput.value = clickedBtnElement.title,
    elProductPriceInput.value = clickedBtnElement.price,
    elProductSelectInput.value = clickedBtnElement.model,
    elProductBenefitsInput.value = clickedBtnElement.benefits
  }
})

elEditForm.addEventListener("submit", function(evt) {
evt.preventDefault();

  const elEditingProduct = {
    id: evt.target.dataset.id,
    title: elProductTitleInput.value,
    price: elProductPriceInput.value,
    model: elProductSelectInput.value,
    addedDate: new Date().toISOString(),
    benefits: elProductBenefitsInput.value
  }

  const elProductIndex = products.findIndex(function(product) {
    return elEditingProduct.id === product.id
  })
  products.splice(elProductIndex, 1, elEditingProduct)
  elProductWrapper.innerHTML = "";
  productRender()
})

