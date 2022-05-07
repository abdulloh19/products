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
  
  const elPoroductDelete = createElement("button", "btn rounded-0 btn-secondary");
  const elPoroductDeleteIcon = createElement("i", "fa-solid fa-pen");
  elPoroductDelete.append(elPoroductDeleteIcon);
  elProductIcons.append(elPoroductDelete);
  
  const elPoroductEdit = createElement("button", "btn rounded-0 btn-danger");
  const elPoroductEditIcon = createElement("i", "fa-solid fa-trash");
  elPoroductEdit.append(elPoroductEditIcon);
  elProductIcons.append(elPoroductEdit);
  
  
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

for (let i = 0; i < products.length; i++) {
  const carrenProduct = products[i]
  
  
  const elProduct = renderProduct(carrenProduct)
  
  
  elProductWrapper.append(elProduct);
};

const eladdProduct = document.querySelector("#add-product-form");
const elAddTitleInput = document.querySelector("#product-title");
const elAddPriceInput = document .querySelector("#price");
const elAddBenefits = document.querySelector("#benefits");

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

