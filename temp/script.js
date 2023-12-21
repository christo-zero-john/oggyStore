const brandBox = document.getElementById("brand");
const colorBox = document.getElementById("color");
const qualityBox = document.getElementById("quality");
const sizeBox = document.getElementById("size");
const productsSection = document.getElementById("productsSection");

let Shoes = []; // This will hold the shoe data
let brandOptions = [];
let colorOptions = [];
let qualityOptions = [];
let sizeOptions = [];

let brand = "choose";
let color = "choose";
let quality = "choose";
let size = "choose";

initialize();

function fetchShoe() {
  return fetch(
    `https://opensheet.elk.sh/1tKC71sx60LqlV3rCIOjB8CxcPhRxhG2javuDB_O0WA4/shoes`
  )
  .then((res) => res.json())
  .then((shoes) => {
    // Sort shoes by price in ascending order
    shoes.sort((a, b) => a.price - b.price);
    return shoes;
  })
  .catch((error) => {
    console.error("Error fetching shoes:", error);
  });
}


function initialize() {
  fetchShoe()
    .then((shoes) => {
      Shoes = shoes;
      extractOptions();
      renderOptions();
      renderProducts();
    })
    .catch((error) => {
      console.error("Error fetching shoes data:", error);
    });
}

function extractOptions() {
  brandOptions = Array.from(new Set(Shoes.map((shoe) => shoe.brand)));
  colorOptions = Array.from(new Set(Shoes.map((shoe) => shoe.color)));
  qualityOptions = Array.from(new Set(Shoes.map((shoe) => shoe.quality)));
  sizeOptions = Array.from(new Set(Shoes.map((shoe) => shoe.size)));
}

function renderOptions() {
  renderSelectOptions(brandBox, brandOptions);
  renderSelectOptions(colorBox, colorOptions);
  renderSelectOptions(qualityBox, qualityOptions);
  renderSelectOptions(sizeBox, sizeOptions);
}

function renderSelectOptions(selectElement, options) {
  selectElement.innerHTML = `<option value="choose">Choose ${selectElement.id}</option>`;
  options.forEach((option) => {
    selectElement.innerHTML += `<option value="${option}">${option}</option>`;
  });
}

function updateColorOptions(brand) {
  const filteredColors = Shoes.filter((shoe) => shoe.brand === brand).map(
    (shoe) => shoe.color
  );
  colorOptions = Array.from(new Set(filteredColors));
}

function updateQualityOptions(brand, color) {
  const filteredQualities = Shoes.filter(
    (shoe) => shoe.brand === brand && shoe.color === color
  ).map((shoe) => shoe.quality);
  qualityOptions = Array.from(new Set(filteredQualities));
}

function updateSizeOptions(brand, color, quality) {
  const filteredShoes = Shoes.filter(shoe => shoe.brand === brand && shoe.color === color && shoe.quality === quality);
  
  let sizesArray = [];
  filteredShoes.forEach(shoe => {
    const sizesString = shoe.size.split(','); // Split the string by commas
    const sizesAsNumbers = sizesString.map(size => parseInt(size.trim(), 10)); // Convert sizes to numbers
    
    sizesArray = sizesArray.concat(sizesAsNumbers); // Concatenate sizes to the array
  });

  const uniqueSizes = Array.from(new Set(sizesArray)); // Create an array of unique sizes
  const combinedSizes = uniqueSizes.join(','); // Join all unique sizes into a single string

  sizeOptions = [combinedSizes]; // Create an array with a single option containing all sizes
}


function printSizeOptions() {
  sizeBox.innerHTML = `<option value="choose">Choose Size</option>`;
  sizeOptions.forEach(size => {
    sizeBox.innerHTML += `<option value="${size}">${size}</option>`; // Print each size as a single number
  });
}


function setBrand() {
  brand = brandBox.value;
  updateColorOptions(brand);
  updateQualityOptions(brand, color);
  renderSelectOptions(colorBox, colorOptions);
  renderSelectOptions(qualityBox, qualityOptions);
  colorBox.value = "choose";
  qualityBox.value = "choose";
  submitData();
}

function setColor() {
  color = colorBox.value;
  updateQualityOptions(brand, color);
  updateSizeOptions(brand, color, quality);
  renderSelectOptions(qualityBox, qualityOptions);
  renderSelectOptions(sizeBox, sizeOptions);
  printSizeOptions();
  qualityBox.value = "choose";
  submitData();
}

function setQuality() {
  quality = qualityBox.value;
  updateSizeOptions(brand, color, quality);
  renderSelectOptions(sizeBox, sizeOptions);
  submitData();
}

function setPrice() {
  size = sizeBox.value;
  submitData();
}

function submitData() {
  const filteredShoes = Shoes.filter(
    (shoe) =>
      (brand === "choose" || shoe.brand === brand) &&
      (color === "choose" || shoe.color === color) &&
      (quality === "choose" || shoe.quality === quality) &&
      (size === "choose" || shoe.size === size)
  );

  renderProducts(filteredShoes);
}

function renderProducts(filteredShoes = Shoes) {
  productsSection.innerHTML = "";

  if (filteredShoes.length === 0) {
    productsSection.innerHTML = "<p>No matching products found</p>";
  } else {
    productsSection.innerHTML = `
        <p class="">Search results with brand <strong class="brand">${brand}</strong> color <strong class="color">${color}</strong> Qualtiy <strong class="quality">${quality}</strong>Size <strong class="quality">${size}</strong></p>
    `;
    filteredShoes.forEach((shoe) => {
      productsSection.innerHTML += `
        <div class="px-3 my-1" id="productItem">
          <p class="">${shoe.brand}</p>
          <p class="">${shoe.model}</p>
          <p class="">${shoe.price}</p>
          <p id="quality">Quality: ${shoe.quality}</p>
          <p id="size">Size: ${shoe.size}</p>
        </div>
      `;
    });
  }
}
