let randomColorList = [];
let colorID = 0;


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("color-btn").addEventListener("click", showRandomColorList);
    document.getElementById("buttonAdd").addEventListener("click", addColor);
    document.getElementById("buttonClear").addEventListener("click", clearAddForm);
    $(document).on("pagebeforeshow", "#colorLibrary", function (event) {   // have to use jQuery 
        let libraryColorUL =document.getElementById("list-library-color");
        libraryColorUL.innerHTML = "";       
     
        randomColorList.forEach(function (oneColor) {   // use handy array forEach method
             let aColor = document.createElement("li");
             aColor.classList.add('library-color-classname');
             aColor.id = oneColor.colorName;
             aColor.setAttribute("data-parm-color", oneColor.colorID);
             aColor.textContent = `ColorID ${oneColor.colorID} :  RGB ${oneColor.valueR } : ${oneColor.valueG } : ${oneColor.valueB}`;
             aColor.style.background = "rgb(" + oneColor.valueR  + "," + oneColor.valueG + "," + oneColor.valueB + ")";
             libraryColorUL.appendChild(aColor);
         });
        
         let arrayLibraryColor = document.querySelectorAll('.library-color-classname');
         arrayLibraryColor.forEach((element, i)=> {     
             element.addEventListener('click', function () {                     
                 var colorLibraryID = this.getAttribute("data-parm-color");  // data-parm has this movie object's ID value
                 // now save THIS ID value in the localStorage "dictionairy"
                 localStorage.setItem('colorLibraryID', colorLibraryID);
                 document.location.href = "index.html#libraryDetails";  // this will jump us to our #details page
             });
         });

    });

    // Color Library details page
    $(document).on("pagebeforeshow", "#libraryDetails", function (event) { 
        var colorPickID = localStorage.getItem('colorLibraryID');
        let pickColor = document.getElementById('show-apick-color');

    });

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


function addColor (){
    //get r,g,b values from input boxes
    let rValue = document.getElementById("r-add-value").value;
    let gValue = document.getElementById("g-add-value").value;
    let bValue = document.getElementById("b-add-value").value;
    // print exception message if r,g,b not in (0, 255)
    if(rValue < 0 || rValue > 255 || gValue < 0 || gValue > 255 || bValue < 0 || bValue > 255){
        document.getElementById("exception-container").textContent = "RGB value must be between 0 and 255";
    }
    // if r,g,b in (0, 255) and the color with this r,g,b value not in the color library array yet
    else if (isAddable(rValue, gValue, bValue)){
        randomColorList.push(new Color(randomColorList.length, rValue, gValue, bValue));
        document.getElementById("exception-container").textContent = "";
        document.location.href = "index.html#colorLibrary"; 
    } else{
        // print exception message this color already existing
        let message = "This color: RGB(" + rValue + ", " + gValue + ", " + bValue + ") already existing in your color library";
        document.getElementById("exception-container").textContent = message;
    }  
}

/* function showAllColors (){
    displayAllColors(randomColorList, "list-library-color", "#library-color-classname");
}; */

// return true if array color is empty or array color does not contain this rgb 
function isAddable (rValue, gValue, bValue){
    if (randomColorList.length === 0){
        return true;
    }
    else{
        for( let i = 0; i < randomColorList.length; i++){
            if (randomColorList[i].valueR === rValue && randomColorList[i].valueG === gValue && randomColorList[i].valueB === bValue){
                return false;
            }
        } 
        return true;
    }
};


function activateAColor(aColorToActivate){
    // get an array of className: {aColorToActivate}
    let arrayRandomColor = document.querySelectorAll(`.${aColorToActivate}`);
    arrayRandomColor.forEach((element, i)=> {    
        //add event listener for each element  
        element.addEventListener('click', function () {   
            // when it gets clicked take it data-para value             
            var colorIDName = this.getAttribute("data-parm");  
            // now save THIS ID value in the localStorage "dictionairy" with the key name colorName
            localStorage.setItem('colorName', colorIDName);
            document.location.href = "index.html#details";  // this will jump us to our #details page
        });
    });
};

// Utility functions 
function displayAllColors(colorList, allColorContainerName, colorClassName){
    document.getElementById(allColorContainerName).textContent = "";
    let colorButtonUl = document.createElement('ul');
    colorButtonUl.id = allColorContainerName + "ul";
    colorList.forEach((item, index)=>{
        let colorButtonLi = document.createElement('li');
        let liContainerName = allColorContainerName + "li"
        colorButtonLi.id = liContainerName ;
        appendAColor(item, liContainerName, colorClassName);
        appendGetrgbButton(item, liContainerName, colorClassName);
    });
};

function clearAddForm(){
    document.getElementById("r-add-value").value = "";
    document.getElementById("g-add-value").value = "";
    document.getElementById("b-add-value").value = "";
    document.getElementById("exception-container").textContent = "";
}

function createObject (){
    colorID = randomColorList.length;
    let valueR = parseInt(Math.random() * 256);
    let valueG = parseInt(Math.random() * 256);
    let valueB = parseInt(Math.random() * 256);
    return new Color(colorID, valueR, valueG, valueB);
};

// Create an div color of a object aColor and append it to a container
function appendAColor(aColor, listContainerName, colorClassName){    
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);  
    pageRandomColorPlaceHolder.append(aColor.displayColor(colorClassName));
};

// Create an button  
// aColor: an object color
//listContainerName: place holder for RGB button to attach to
function appendGetrgbButton(aColor, listContainerName, colorClassName, buttonName, buttonColor){    
    let colorPlaceHolder = document.getElementById(listContainerName);  
    colorPlaceHolder.append(aColor.displayButton(colorClassName, buttonName, buttonColor));
};