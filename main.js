let randomColorList = [];
let colorID = 0;


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("color-btn").addEventListener("click", showRandomColorList);
    document.getElementById("list-all-colors-btn").addEventListener("click", showAllColors);
});

function showRandomColorList (){

    let randomColor = createObject();
    randomColorList.push(randomColor);
    let indexOfRandomColor = randomColorList.indexOf(randomColor);
    appendAColor(randomColorList[indexOfRandomColor], "random-color-list", "random-color-classname");
    activateAColor("random-color-classname");
        // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let colorElementID = localStorage.getItem('colorName');  // get the unique key back from the storage dictionairy
        document.getElementById("test-para").textContent = "Color's detail: " + colorElementID;
    });
};

function showAllColors (){
    displayAllColors(randomColorList, "list-library-color", "#library-color-classname");
};

function activateAColor(aColorToActivate){
    let arrayRandomColor = document.querySelectorAll(`.${aColorToActivate}`);
    arrayRandomColor.forEach((element, i)=> {     
        element.addEventListener('click', function () {     
            
            var colorIDName = this.getAttribute("data-parm");  // data-parm has this movie object's ID value
            // now save THIS ID value in the localStorage "dictionairy"
            localStorage.setItem('colorName', colorIDName);
            document.location.href = "index.html#details";  // this will jump us to our #details page
        });
    });
};

// Utility functions 
function displayAllColors(colorList, allColorContainerName, colorClassName){
    document.getElementById(allColorContainerName).textContent = "";
    colorList.forEach((item, index)=>{
        appendAColor(item, allColorContainerName, colorClassName);
    });
};


function createObject (){
    colorID++;
    let valueR = parseInt(Math.random() * 256);
    let valueG = parseInt(Math.random() * 256);
    let valueB = parseInt(Math.random() * 256);
    return new Color(colorID, valueR, valueG, valueB);
};

// Append the created object color to the page
function appendAColor(aColor, listContainerName, colorClassName){
    
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);  
    pageRandomColorPlaceHolder.append(aColor.displayColor(colorClassName));

};