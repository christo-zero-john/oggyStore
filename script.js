var spreadsheet_id = '1tKC71sx60LqlV3rCIOjB8CxcPhRxhG2javuDB_O0WA4'; //oggy store data google spreadsheet id

var basic;
var categoryDiv = document.getElementById("categoryDiv");


function setCategories(){
    fetch(`https://opensheet.elk.sh/${spreadsheet_id}/basic`)
        .then(res => res.json())
        .then((data) => {
            
            basic = data;
            console.log(basic);
            categoryDiv.innerHTML = ''
            for(x in basic){
                categoryDiv.innerHTML += `
                <div class="card col-5 col-md-4 m-3" id="">
                    
                    <img class="card-img p-0 m-0 categoryCardImg" src="${basic[x].img}" alt="">
                    <p class="card-footer  text-center m-0" id="">${basic[x].category}</p>
            </div>
                `
            }
        })
}

setCategories()