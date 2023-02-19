let Color = function(colorID,R,G,B) {
    this.colorID = colorID;
    this.valueR = R;
    this.valueG = G;
    this.valueB = B;
    this.colorName = "RGB"+ this.valueR + this.valueG + this.valueB;
    
};

Color.prototype.displayColor = function(colorClassName){
    let aColor = document.createElement("div");
    aColor.className = colorClassName;
    aColor.id = this.colorName;
    aColor.setAttribute("data-parm", aColor.id);
    aColor.textContent = `ColorID ${this.colorID} :  RGB ${this.valueR } : ${this.valueG } : ${this.valueB}`;
    aColor.style.background = "rgb(" + this.valueR  + "," + this.valueG + "," + this.valueB + ")";
    return aColor;
};