let randomColorList = [];
let favoriteColorID = 0;


document.addEventListener("DOMContentLoaded", function (event) {
    // color maker and show favorite colors
    document.getElementById("color-btn").addEventListener("click", showRandomColorList);
    document.getElementById("list-favorite-btn").addEventListener("click", showFavoriteColors);

    //add a color and color library
    document.getElementById("buttonAdd").addEventListener("click", addColor);
    document.getElementById("buttonClear").addEventListener("click", clearAddForm);
    $(document).on("pagebeforeshow", "#colorLibrary", function (event) {   // have to use jQuery 
        let libraryColorUL = document.getElementById("list-library-color");
        libraryColorUL.innerHTML = "";

        randomColorList.forEach(function (oneColor) {   // use handy array forEach method
            let aColor = document.createElement("li");
            aColor.classList.add('library-color-classname');
            aColor.id = oneColor.colorName;
            aColor.setAttribute("data-parm-color", oneColor.colorID);
            aColor.textContent = `ColorID ${oneColor.colorID} :  RGB ${oneColor.valueR} : ${oneColor.valueG} : ${oneColor.valueB}`;
            aColor.style.background = "rgb(" + oneColor.valueR + "," + oneColor.valueG + "," + oneColor.valueB + ")";
            libraryColorUL.appendChild(aColor);
        });

        let arrayLibraryColor = document.querySelectorAll('.library-color-classname');
        arrayLibraryColor.forEach((element, i) => {
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
        document.getElementById('pick-lbr-color').remove();
        let libraryPickContainer = document.createElement("div");
        libraryPickContainer.id = 'pick-lbr-color';
        document.getElementById('show-apick-lbr-color').append(libraryPickContainer);

        var colorPickID = localStorage.getItem('colorLibraryID');
        appendAColor(randomColorList[colorPickID], "pick-lbr-color", "libraryPickColor");
        appendAButton(randomColorList[colorPickID], "pick-lbr-color", "libray-pick", "getRGB", "lightyellow");
        let RGBInput = document.createElement('input');
        RGBInput.id = "pick-lbr-val";
        document.getElementById("pick-lbr-color").append(RGBInput);

        document.getElementById(colorPickID).addEventListener("click", function () {
            RGBInput.value = "rgb(" + randomColorList[colorPickID].valueR + "," + randomColorList[colorPickID].valueG + "," + randomColorList[colorPickID].valueB + ")";
        });
    });

});

// Color Maker 
function showRandomColorList() {

    let randomColor = createObject();
    randomColorList.push(randomColor);
    let indexOfRandomColor = randomColorList.indexOf(randomColor);
    appendAColor(randomColorList[indexOfRandomColor], "random-color-list", "random-color-classname");
    activateAColor("random-color-classname");

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {
        let colorElementID = localStorage.getItem('colorName');
        let colorElementIndexID = localStorage.getItem('colorIndex'); // get the unique key back from the storage dictionairy
        let monoId = localStorage.getItem('monoID-para');

        document.getElementById("test-para").textContent = "Color's detail: " + colorElementID;
        getRGBinputValues(colorElementID);
        createMonochromaticColorDiv(colorElementID);
        document.getElementById("change-btn").addEventListener('click', modifyRandomColor())

    })
};



// Add a color
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

function showAllColors() {
    displayAllColors(randomColorList, "list-library-color", "#library-color-classname");
};

function activateAColor(aColorToActivate) {
    let arrayRandomColor = document.querySelectorAll(`.${aColorToActivate}`);
    arrayRandomColor.forEach((element, i) => {
        element.addEventListener('click', function () {
            var colorIDName = this.getAttribute("data-parm");  // data-parm has this movie object's ID value
            // now save THIS ID value in the localStorage "dictionairy"
            localStorage.setItem('colorName', colorIDName);
            localStorage.setItem('colorIndex', i)
            document.location.href = "index.html#details";  // this will jump us to our #details page
        });
    });
};


function displayAllColors(colorList, allColorContainerName, colorClassName) {
    document.getElementById(allColorContainerName).textContent = "";
    colorList.forEach(item => {
        appendAColor(item, allColorContainerName, colorClassName);
    });
};

function getRGBinputValues(colorElementID) {
    randomColorList.forEach(element => {
        if (colorElementID === element.colorName) {
            document.getElementById("inputR").value = element.valueR;
            document.getElementById("inputG").value = element.valueG;
            document.getElementById("inputB").value = element.valueB;
            document.getElementById("color-item-detail").style.background
                = "rgb(" + element.valueR + "," + element.valueG + "," + element.valueB + ")";
        };
    });
}

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
        let colorElementID = localStorage.getItem('colorName');
        updateObject(localParm);
        getRGBinputValues(colorElementID);
        createMonochromaticColorDiv(colorElementID);
        document.location.href = "index.html#details"
    });
};

function updateObject(localParm) {
    console.log(localParm);
    return randomColorList[localParm].valueR = document.getElementById("inputR").value,
        randomColorList[localParm].valueG = document.getElementById("inputG").value,
        randomColorList[localParm].valueB = document.getElementById("inputB").value;
}

// Append the created object color to the page
function appendAColor(aColor, listContainerName, colorClassName) {
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);
    pageRandomColorPlaceHolder.append(aColor.displayColor(colorClassName));

};

// Create an button  
// aColor: an object color
//listContainerName: place holder for RGB button to attach to
function appendAButton(aColor, listContainerName, colorClassName, buttonName, buttonColor) {
    let colorPlaceHolder = document.getElementById(listContainerName);
    colorPlaceHolder.append(aColor.displayButton(colorClassName, buttonName, buttonColor));
};


function createMonochromaticColorDiv(colorElementID) {
    //colorElementID is "RGB" + RandomColorList.valueR + RandomColorList.valueG + RandomColorList.valueB
    randomColorList.forEach(element => {

        if (colorElementID == element.colorName) {

            for (i = 1; i < 5; i++) { //i ...number of 0 to 4 because there are 4 color suggestions
                document.getElementById(`m${i}`).textContent = "";
                let aMonoColor = document.createElement("div")
                aMonoColor.className = "monochromatic-class-name";
                aMonoColor.id = element.colorName + [i];
                document.getElementById(`m${i}`).append(aMonoColor);
                //to get similar color suggestions and create these array & ids
                aMonoColor.append(element.MonochromaticColor(i, aMonoColor, element.valueR, element.valueG, element.valueB));
                console.log(addToFavoriteList(aMonoColor.id));
            };
        }
    })

};