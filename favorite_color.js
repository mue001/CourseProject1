let favoriteColorList = [];
let colorID = 0;

let fColor = function (R, G, B) {
    this.fcolorID = favoriteColorList.length++;
    this.fvalueR = R;
    this.fvalueG = G;
    this.fvalueB = B;
    this.colorName = "RGB" + this.fvalueR + this.fvalueG + this.fvalueB;
};


function addToFavoriteList(suggestionColorID) {
    console.log(suggestionColorID)


    var addFavoriteBtnClass = document.getElementsByClassName("suggestion-color-btn");
    let addFavoriteArray = Array.from(addFavoriteBtnClass);

    randomColorList.forEach(element => {

        for (x = 0; x < addFavoriteArray.length + 1; x++) { 

            let addindex = x;

            $(`#m${addindex}-btn`).on("click", function () {
                console.log(`#m${addindex}-btn is clicked`);

                let suggestionR;
                let suggestionB;
                let suggestionG;

                if (suggestionColorID === element.colorName + addindex) {


                    for (i = 0; i < aMonoArray.length; i++) {
                        if (suggestionColorID === aMonoArray[i].colorID) {
                            console.log(suggestionColorID, aMonoArray[i].colorID)
                            suggestionR = aMonoArray[i].aMonoR;
                            suggestionG = aMonoArray[i].aMonoG;
                            suggestionB = aMonoArray[i].aMonoB;
                            favoriteColorList.push = new fColor(suggestionR, suggestionG, suggestionB);
                            console.log(favoriteColorList)
                            return console.log(suggestionR, suggestionG, suggestionB);
                        };
                    };
                };
            });
        };
    });

};

function showFavoriteColors() {
    document.getElementById("")
    // let localStorage.getItem('favoriteColorName', fcolorIDName);
    // document.location.href = "index.html#colorLibrary";
    // now save THIS ID value in the localStorage "dictionairy"

};
