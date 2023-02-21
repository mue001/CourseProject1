let randomColorList = [];
let favoriteColorList = [];
let colorID = 0;
let favoriteColorID = 0;


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("color-btn").addEventListener("click", showRandomColorList);
    document.getElementById("list-all-colors-btn").addEventListener("click", showAllColors);
    document.getElementById("list-favorite-btn").addEventListener("click", showFavoriteColors);

});

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
        document.getElementById("test-para").textContent = "Color's detail: " + colorElementID;
        getRGBinputValues(colorElementID);
        createMonochromaticColorDiv(colorElementID);
        // createComplementaryColorDiv(colorElementID);
        addToFavoriteList(colorElementIndexID);

        document.getElementById("change-btn").addEventListener('click', modifyRandomColor())
    })
};

function showFavoriteColors() {
    var fcolorIDName = this.getAttribute("data-parm");  // data-parm has this movie object's ID value
    // now save THIS ID value in the localStorage "dictionairy"
    localStorage.setItem('favoriteColorName', fcolorIDName);
    document.location.href = "index.html#colorLibrary";
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

// Utility functions 
function displayAllColors(colorList, allColorContainerName, colorClassName) {
    document.getElementById(allColorContainerName).textContent = "";
    colorList.forEach((item, index) => {
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

//we might need to use getRGBinputValues by clicking changebtn
function createObject() {
    colorID++;
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


//need to confirm if it works after making color suggestions
function addToFavoriteList(colorElementIndexID) {

    var addFavoriteBtnClass = document.getElementsByClassName("suggestion-color-btn");
    let addFavoriteArray = Array.from(addFavoriteBtnClass);

    var colorSuggestionClass = document.getElementsByClassName("monochromatic-class-name");
    let colorSuggestionArray = Array.from(colorSuggestionClass);

    addFavoriteArray.forEach(function (element, index) {
        element.addEventListener("click", function () {

            if (index === 0) {
                console.log(colorSuggestionArray[0].id)
            }
            if (index === 1) {
                console.log(colorSuggestionArray[1].id)
            }
            if (index === 2) {
                console.log(colorSuggestionArray[2].id)
            }
            if (index === 3) {
                console.log(colorSuggestionArray[3].id)
            }

      
        });
    })
};

function createFavoriteObject() {
    favoriteColorID++;
    //!!!! should get color codes from divs (document.getElementbyId)
    let fvalueR = getElementById;
    let fvalueG = 0;
    let fvalueB = 0;
    console.log(favoriteColorID, fvalueR, fvalueG, fvalueB)
    return new fColor(favoriteColorID, fvalueR, fvalueG, fvalueB);
};


// Append the created object color to the page
function appendAColor(aColor, listContainerName, colorClassName) {
    let pageRandomColorPlaceHolder = document.getElementById(listContainerName);
    pageRandomColorPlaceHolder.append(aColor.displayColor(colorClassName));

};


function createMonochromaticColorDiv(colorElementID) {
    randomColorList.forEach(element => {

        if (colorElementID == element.colorName) {

            for (i = 1; i < 5; i++) { //i ...number of 1 to 4
                document.getElementById(`m${i}`).textContent = "";

                let aMonoColor = document.createElement("div")
                aMonoColor.className = "monochromatic-class-name";
                aMonoColor.id = element.colorName + [i];
                document.getElementById(`m${i}`).append(aMonoColor);
                aMonoColor.append(element.MonochromaticColor(i, aMonoColor, element.valueR, element.valueG, element.valueB));

            }

        }
    })
};

// function createComplementaryColorDiv(colorElementID) {
//     randomColorList.forEach(element => {
//         if (colorElementID == element.colorName) {
//             for (i = 1; i < 5; i++) { //i ...number of 1 to 4
//                 document.getElementById(`c${i}`).textContent = "";
//                 let aComColor = document.createElement("div")
//                 aComColor.className = "complementary-class-name";
//                 aComColor.id = element.colorName + [i];
//                 document.getElementById(`c${i}`).append(aComColor);
//                 aComColor.textContent = "Complementary color suggestion " + [i];

//                 aComColor.append(element.MonochromaticColor(aComColor, element.valueR, element.valueG, element.valueB));
//             }

//         }
//     })
// };