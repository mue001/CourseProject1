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
    appendAColor(randomColorList[indexOfRandomColor], "random-color-list");
};

function showAllColors (){
    
    displayAllColors(randomColorList, "list-library-color");
};

// Utility functions 
function displayAllColors(colorList, allColorContainerName){
    colorList.forEach((item, index)=>{
        appendAColor(item,allColorContainerName);
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
function appendAColor(aColor, listContainerName){
    
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);  
    pageRandomColorPlaceHolder.append(aColor.displayColor());

};