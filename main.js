let randomColorList = [];
let favoriteColorList = [];
let moColorList = [];
let favoriteColorID = 0;


document.addEventListener("DOMContentLoaded", function (event) {
    // color maker page
    document.getElementById("random-color-btn").addEventListener("click", showRandomColorList);

    //add color page
    document.getElementById("buttonAdd").addEventListener("click", addColor);
    document.getElementById("buttonClear").addEventListener("click", clearAddForm);

    // color library page 
    $(document).on("pagebeforeshow", "#colorLibrary", function (event) {   // have to use jQuery 
        showLibraryPage("lbr","index.html#libraryDetails", randomColorList);
    });

    // color library detail page
    document.getElementById("list-favorite-btn").addEventListener("click", showFavoriteColors);

        // Color Library details page
    $(document).on("pagebeforeshow", "#libraryDetails", function (event) {
        showLibraryDetailPage("lbr", randomColorList);
    });

    // Color favorite details page
    $(document).on("pagebeforeshow", "#favoriteDetails", function (event) {
        let showContainer = document.getElementById('frv-show-pick-color');
        let pickContainer = document.createElement('div');
        pickContainer.id = 'frv-pick-color';
        pickContainer.className = 'frv-pick-color';
        showContainer.append(pickContainer);
        
        showLibraryDetailPage("frv", favoriteColorList);
    });

});

// Color Maker method
function showRandomColorList() {

    let randomColor = createObject();
    randomColorList.push(randomColor);
    let indexOfRandomColor = randomColorList.indexOf(randomColor);
    appendAColor(randomColorList[indexOfRandomColor], "random-color-list", "random-color-classname", "data-parm", "div");
    activateAColor("random-color-classname", "data-parm", "colorName", "colorIndex", "index.html#details");

    // deatail page
    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {
        let colorElementIndexID = localStorage.getItem('colorIndex'); // get the unique key back from the storage dictionairy
        let monoId = localStorage.getItem('monoID-para');
        fillRGBinputValues(randomColorList,colorElementIndexID, "color-item-detail", "inputR", "inputG", "inputB");
        createMonochromaticColorDiv(randomColorList, "m", "monochromatic-class-name", colorElementIndexID);
        document.getElementById("change-btn").addEventListener('click', modifyRandomColor());
    });
};



// Add a color method
function addColor() {
    //get r,g,b values from input boxes
    let rValue = document.getElementById("r-add-value").value;
    let gValue = document.getElementById("g-add-value").value;
    let bValue = document.getElementById("b-add-value").value;
    // print exception message if r,g,b not in (0, 255)
    if (rValue < 0 || rValue > 255 || gValue < 0 || gValue > 255 || bValue < 0 || bValue > 255) {
        document.getElementById("exception-container").textContent = "RGB value must be between 0 and 255";
    }
    // if r,g,b in (0, 255) and the color with this r,g,b value not in the color library array yet
    else if (isAddable(rValue, gValue, bValue)) {
        randomColorList.push(new Color(randomColorList.length, rValue, gValue, bValue));
        document.getElementById("exception-container").textContent = "";
        document.location.href = "index.html#colorLibrary";
    } else {
        // print exception message this color already existing
        let message = "This color: RGB(" + rValue + ", " + gValue + ", " + bValue + ") already existing in your color library";
        document.getElementById("exception-container").textContent = message;
    }
};

// return true if array color is empty or array color does not contain this rgb 
function isAddable(rValue, gValue, bValue) {
    if (randomColorList.length === 0) {
        return true;
    }
    else {
        for (let i = 0; i < randomColorList.length; i++) {
            if (randomColorList[i].valueR === rValue && randomColorList[i].valueG === gValue && randomColorList[i].valueB === bValue) {
                return false;
            }
        }
        return true;
    }
};

function clearAddForm() {
    document.getElementById("r-add-value").value = "";
    document.getElementById("g-add-value").value = "";
    document.getElementById("b-add-value").value = "";
    document.getElementById("exception-container").textContent = "";
};


function activateAColor(aColorToActivate, dataParm, keyName, keyIndex, page) {
    let arrayRandomColor = document.querySelectorAll(`.${aColorToActivate}`);
    arrayRandomColor.forEach((element, i) => {
        element.addEventListener('click', function () {
            var colorIDName = this.getAttribute(dataParm); 
            // now save THIS ID value in the localStorage "dictionairy"
            localStorage.setItem(keyName, colorIDName);
            localStorage.setItem(keyIndex, i)
            document.location.href = page;  // this will jump us to the page
        });
    });
};



function fillRGBinputValues(colorArray, colorElementIndex, containerName, rInputName, gInputName, bInputName) {
    document.getElementById(rInputName).value = colorArray[colorElementIndex].valueR;
    document.getElementById(gInputName).value = colorArray[colorElementIndex].valueG;
    document.getElementById(bInputName).value = colorArray[colorElementIndex].valueB;
    document.getElementById(containerName).style.background
                = "rgb(" + colorArray[colorElementIndex].valueR + "," + colorArray[colorElementIndex].valueG + "," + colorArray[colorElementIndex].valueB + ")";
};

function getInboundValue(aValue){
    if(aValue < 0){
        return Math.max(aValue, 0);
    }
    else if(aValue > 255){
        return Math.min(aValue, 255);
    }
    else{
        return aValue;
    }
};

function createObject() {
    colorID = randomColorList.length;
    let valueR = parseInt(Math.random() * 256);
    let valueG = parseInt(Math.random() * 256);
    let valueB = parseInt(Math.random() * 256);
    return new Color(colorID, valueR, valueG, valueB);
};

function modifyRandomColor() {
    document.getElementById("change-btn").addEventListener('click', function () {
        let localParm = localStorage.getItem('colorIndex');
        updateObject(localParm);
        fillRGBinputValues(randomColorList,localParm, "color-item-detail", "inputR", "inputG", "inputB");
        createMonochromaticColorDiv(randomColorList,"m", "monochromatic-class-name", localParm);
        document.location.href = "index.html#details";
    });
};

function updateObject(localParm) {
    console.log(localParm);
    let r = document.getElementById("inputR").value;
    let g = document.getElementById("inputG").value;
    let b = document.getElementById("inputB").value;
    r = getInboundValue(r);
    g = getInboundValue(g);
    b = getInboundValue(b);

    return randomColorList[localParm].valueR = r,
        randomColorList[localParm].valueG = g,
        randomColorList[localParm].valueB = b;
}

// Append the created object color to the page
function appendAColor(aColor, listContainerName, colorClassName, dataParm, elementType) {
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);
    pageRandomColorPlaceHolder.append(aColor.displayColor(colorClassName, dataParm, elementType));

};

// Create an button  
// aColor: an object color
//listContainerName: place holder for RGB button to attach to
function appendAButton(aColor, listContainerName, colorClassName, buttonName, buttonColor) {
    let colorPlaceHolder = document.getElementById(listContainerName);
    colorPlaceHolder.append(aColor.displayButton(colorClassName, buttonName, buttonColor));
};


function createMonochromaticColorDiv(colorArray, preMonoID, monoClassName, colorIndex) {
    //colorElementID is "RGB" + RandomColorList.valueR + RandomColorList.valueG + RandomColorList.valueB
    moColorList = [];
    for (i = 1; i < 5; i++) { //i ...number of 0 to 4 because there are 4 color suggestions
        document.getElementById(`${preMonoID}${i}`).textContent = "";
        let aMonoColor = document.createElement("div")
        aMonoColor.className = monoClassName;
        let monoColorID = colorArray[colorIndex].colorName + [i];
        aMonoColor.id = monoColorID;
        document.getElementById(`${preMonoID}${i}`).append(aMonoColor);
                //to get similar color suggestions and create these array & ids

        let newRGB = colorArray[colorIndex].MonochromaticColor(i, aMonoColor, colorArray[colorIndex].valueR, colorArray[colorIndex].valueG, colorArray[colorIndex].valueB);

        document.getElementById(`${preMonoID}${i}`).style.background = `rgb(${newRGB[0]}, ${newRGB[1]}, ${newRGB[2]})`;

        document.getElementById(monoColorID).textContent = `rgb(${newRGB[0]}, ${newRGB[1]}, ${newRGB[2]})`;

        moColorList.push(new Color(moColorList.length, newRGB[0], newRGB[1], newRGB[2]));

       // console.log(addToFavoriteList(aMonoColor.id));
    };

    let tempMoColorList = document.querySelectorAll('.suggestion-color-btn');
    tempMoColorList.forEach((element, i) => {
        element.setAttribute('tempMono', i);
        element.setAttribute('tempMonoName', moColorList.colorName);
     });

    let stringTempMoArray = JSON.stringify(moColorList); // convert array to "string"
    localStorage.setItem('tempMonoArray', stringTempMoArray);

    let tempMoColList = document.querySelectorAll('.suggestion-color-btn');
    tempMoColList.forEach((element, i) => {
        element.addEventListener('click', function () {
            monoTempAttr = this.getAttribute('tempMono'); 
            monoTempPosAttr = this.getAttribute('tempMonoName'); 
            localStorage.setItem('tempMonoId', monoTempAttr);  
            localStorage.setItem('tempMonoNameId', monoTempPosAttr);  
            addTofavorite() ; 
         });
    }); 

};

function addTofavorite(){
    let frvColorPick = localStorage.getItem('tempMonoId');
    let frvCoNamePick = localStorage.getItem('tempMonoNameId');
    let monoColorArr = JSON.parse(localStorage.getItem('tempMonoArray')); 

    let lastColor = '';
    if(favoriteColorList.length === 0){
        favoriteColorList.push(new Color(favoriteColorList.length, monoColorArr[frvColorPick].valueR, monoColorArr[frvColorPick].valueG, monoColorArr[frvColorPick].valueB));
        alert(`Add RGB( ${monoColorArr[frvColorPick].valueR}, ${monoColorArr[frvColorPick].valueG}, ${monoColorArr[frvColorPick].valueB}) to your favorite list`);
    }
    else {
        lastColor = favoriteColorList[favoriteColorList.length -1].colorName;
        if (lastColor !== monoColorArr[frvColorPick].colorName){
            favoriteColorList.push(new Color(favoriteColorList.length, monoColorArr[frvColorPick].valueR, monoColorArr[frvColorPick].valueG, monoColorArr[frvColorPick].valueB));
            alert(`Add RGB( ${monoColorArr[frvColorPick].valueR}, ${monoColorArr[frvColorPick].valueG}, ${monoColorArr[frvColorPick].valueB}) to your favorite list`);
        }
    }
};


function showLibraryPage(lbr, page, aArray){
    let libraryColorUL = document.getElementById(`${lbr}-list-color`);
    libraryColorUL.innerHTML = "";

    aArray.forEach(function (oneColor) {   // use handy array forEach method
        appendAColor(oneColor, `${lbr}-list-color`, `${lbr}-color-classname`, `${lbr}-data-parm`, "li");
        
    });
    activateAColor(`${lbr}-color-classname`, `${lbr}-data-parm`, `${lbr}ColorName`, `${lbr}ColorID`, page);
};

function showLibraryDetailPage(aLbr, aArray){
    document.getElementById(`${aLbr}-pick-color`).remove();
    //document.getElementById(`${aLbr}-pick-color`).textContent = "";
    let libraryPickContainer = document.createElement("div");
    libraryPickContainer.id = `${aLbr}-pick-color`;
    document.getElementById(`${aLbr}-show-pick-color`).append(libraryPickContainer);

    var colorPickID = localStorage.getItem(`${aLbr}ColorID`);
    appendAColor(aArray[colorPickID], `${aLbr}-pick-color`, `${aLbr}PickColor`, `${aLbr}-data-parm`, "div");
    appendAButton(aArray[colorPickID], `${aLbr}-pick-color`, `${aLbr}-pick`, "getRGB", "lightyellow");
    let RGBInput = document.createElement('input');
    RGBInput.id = `${aLbr}-pick-val`;
    document.getElementById(`${aLbr}-pick-color`).append(RGBInput);

    document.getElementById(colorPickID).addEventListener("click", function () {
        RGBInput.value = "rgb(" + aArray[colorPickID].valueR + ", " + aArray[colorPickID].valueG + ", " + aArray[colorPickID].valueB + ")";
    });
};

function showFavoriteColors(){
    if(favoriteColorList.length === 0){
        alert('Your favorite list is empty!');
    }
    showLibraryPage("frv","index.html#favoriteDetails", favoriteColorList);
};