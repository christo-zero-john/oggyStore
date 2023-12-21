var spreadsheet_id = '1tKC71sx60LqlV3rCIOjB8CxcPhRxhG2javuDB_O0WA4'; //oggy store data google spreadsheet id

var basic, category;
var dataDiv = document.getElementById("dataDiv");

function setCategories(){
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2">All Categories</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="categoryDiv">
        </div>
    `

    var categoryDiv = document.getElementById("categoryDiv");
    fetch(`https://opensheet.elk.sh/${spreadsheet_id}/basic`)
        .then(res => res.json())
        .then((data) => {
            
            basic = data;
            console.log("'basic sheet' details (categories)",basic);
            categoryDiv.innerHTML = ''
            for(x in basic){
                categoryDiv.innerHTML += `
                <div class="cursor-pointer card col-5 col-md-2 m-2 my-3 mx-md-3" id="" onclick="getCategoryData('${basic[x].category.toLowerCase()}')">
                    
                    <img class="card-img p-0 m-0 categoryCardImg" src="${basic[x].img}" alt="">
                    <p class="card-footer  text-center m-0" id="">${basic[x].category}</p>
            </div>
                `
            }
        })
}

function getCategoryData(category){
    console.log("getCategorydata invoked")
    console.log("category selected :",category);

    fetch(`https://opensheet.elk.sh/${spreadsheet_id}/${category}`)
        .then(res => res.json())
        .then(products => {
            console.log(products);
            category = category.toLowerCase();
            switch(category)
            {
                case 'footwear': 
                {
                    printShoes(products);
                    break;
                }
                case 'watches':
                {
                    printWatches(products);
                    break;
                }
                case 'speakers':
                {
                    printSpeakers(products);
                    break;
                }
                case 'earbuds':
                {
                    printEarbuds(products);
                    break;
                }
                case 'headsets':
                {
                    printHeadsets(products);
                    break;
                }
                case 'clothes':
                {
                    printClothes(products);
                    break;
                }
            }
        })
}

function printShoes(footwears){
    console.log("PrintShoes invoked")
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center">Category: footwears</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in footwears){
        productsDiv.innerHTML += `
            <div class= "m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/footwear.png" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${footwears[x].brand} </span>
                        <span class="model">${footwears[x].model}</span>
                    </p>
                    <p class="quality">Quality: ${footwears[x].quality}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${footwears[x].price}</div>
            </div>
        `
    }
}

function printWatches(watches){
    console.log("PrintWatches invoked",watches)
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2 py-3">Category: Watches</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in watches){
        productsDiv.innerHTML += `
            <div class= "m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/watches.jpg" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${watches[x].brand} </span>
                        <span class="model">${watches[x].model} </span>
                        <span class="model">${watches[x].type} </span>
                    </p>
                    <p class="quality">Best For: ${watches[x].customerType}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${watches[x].price}</div>
            </div>
        `
        console.log(watches[x])
    }
}

function printSpeakers(speakers){
    console.log("Printspeakers invoked",speakers)
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2 py-3">Category: speakers</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in speakers){
        productsDiv.innerHTML += `
            <div class= "m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/speakers.png" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${speakers[x].brand} </span>
                        <span class="model">${speakers[x].model} </span>
                    </p>
                    <p class="quality">Type: ${speakers[x].type}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${speakers[x].price}</div>
            </div>
        `
        console.log(speakers[x])
    }
}

function printEarbuds(earbuds){
    console.log("Printearbuds invoked",earbuds)
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2 py-3">Category: earbuds</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in earbuds){
        productsDiv.innerHTML += `
            <div class= "m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/earbuds.jpg" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${earbuds[x].brand} </span>
                        <span class="model">${earbuds[x].model} </span>
                    </p>
                    <p class="quality">Type: ${earbuds[x].type}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${earbuds[x].price}</div>
            </div>
        `
        console.log(earbuds[x])
    }
}

function printHeadsets(headsets){
    console.log("Printheadsets invoked",headsets)
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2 py-3">Category: headsets</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in headsets){
        productsDiv.innerHTML += `
            <div class= "m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/headsets.jpg" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${headsets[x].brand} </span>
                        <span class="model">${headsets[x].model} </span>
                    </p>
                    <p class="quality">Type: ${headsets[x].type}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${headsets[x].price}</div>
            </div>
        `
        console.log(headsets[x])
    }
}

function printClothes(clothes){
    console.log("Printclothes invoked",clothes)
    dataDiv.innerHTML = `
        <h1 class="fs-1 font-weight-normal text-center py-2 py-3">Category: clothes</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap" id="productsDiv"></div>
    `
    var productsDiv = document.getElementById("productsDiv");
    for(x in clothes){
        // var content = "";
        // switch(clothes[x].type){
        //     case 'shirt':
        //     {
                
        //     }
        // }
        productsDiv.innerHTML += `
            <div class="m-2 productItem card col-5 text-center col-md-2 ">
                <img src="/assets/clothing.webp" alt="" class="card-img">
                <div class="productDetails card-body">
                    <p class="">
                        <span class="brand">${clothes[x].subtype} </span>
                        <span class="model">${clothes[x].type} </span>
                    </p>
                    <p class="quality">Colour: ${clothes[x].colour}</p>
                </div>
                <div class="card-footer m-0 text-success"> ₹ ${clothes[x].price}</div>
            </div>
        `
        console.log(clothes[x])
    }
}


setCategories()