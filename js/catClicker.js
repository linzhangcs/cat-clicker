document.addEventListener('DOMContentLoaded', function(){
    /*var catImage = document.getElementById('cat');
    var clickLabel = document.getElementById('counter-label');
    var catImage2 = document.getElementById('cat2');
    var clickLabel2 = document.getElementById('counter-label2');
        var counter = 0;
        catImage.addEventListener('click', function(){
            console.log("Clicked");
            counter ++;
            clickLabel.innerHTML = counter;
            console.log(clickLabel.textContent);
        },false);*/
    var container = document.getElementById('container');
    if(container){
        var catOne = new CatClicker("Number One", "images/Jeff-the-Cat.jpg", 1);
        catOne.init(container);
        var catTwo = new CatClicker("Number Two", "images/Jeff-the-Cat.jpg", 2);
        catTwo.init(container);
        var catThr = new CatClicker("Number Three", "images/Jeff-the-Cat.jpg", 3);
        catThr.init(container);
    }
});

var CatClicker = function(name, image, id){
    this.name = name;
    this.image = image;
    this.id = id
    this.clickCounter = 0;
};
CatClicker.prototype.init = function(container){
    this.display(container);
    this.addClickCounter();
};
CatClicker.prototype.clicked = function(){
    this.clickCounter++;
};
CatClicker.prototype.updateCounterLabel = function(label){
    label.innerHTML = this.clickCounter;
};

CatClicker.prototype.display = function(container){
    container.innerHTML += "<div class=\"cat-clicker\"><h3>"+this.name+"</h3><img id=\"image"+this.id+"\" style=\"width: 30%\" src=\""+this.image+"\" /></div><h3>Click Counter: </h3><div id=\"counter"+this.id+"\">"+this.clickCounter+"</div>"
}

CatClicker.prototype.addClickCounter = function(){
    var catImage = document.getElementById("image"+this.id);
    var clickLabel = document.getElementById("counter"+this.id);
    var self = this;
    if(catImage && clickLabel){
        this.addClickListener.call(this,catImage,clickLabel);
    }
}

CatClicker.prototype.addClickListener = function(catImage,clickLabel){
        catImage.addEventListener('click', function(){
            this.clicked();
            this.updateCounterLabel(clickLabel);
        }, false);
};


