$(document).ready(function(){

  var cat = {
    init: function(){
      if(!localStorage.cats){
        localStorage.cats = JSON.stringify([]);
        totalCatCounter = 0;
        var catOne = cat.addCat("Kitty","images/Jeff-the-Cat.jpg");
        var catTwo = cat.addCat("Kat","images/Jeff-the-Cat.jpg");
        var catThree = cat.addCat("Ken","images/Jeff-the-Cat.jpg");
      }
    },
    addCat: function(name, pic){
      var totalCatCounter;
      var obj = {
        catId: totalCatCounter,
        catName: name,
        catPic: pic,
        counter: 0
      }
      var c = JSON.parse(localStorage.cats);
      c.push(obj);
      totalCatCounter++;
      localStorage.cats = JSON.stringify(c);
    },
    getAllCats: function(){
      return JSON.parse(localStorage.cats);
    }
  };

  var contorller = {
    init: function(){
      cat.init();
      view.init();
    },
    getCatNames: function(){
      var catObjs = this.getCats();
      var names = [];
      for(var i = 0; i < catObjs.length; i++){
        console.log(catObjs[i].catName)
        names.push(catObjs[i].catName);
      }
      return names;
    },
    getCats: function(){
      return cat.getAllCats();
    },
    getAllCatsInfo: function(){
      var cats = getCats();
      return
    },
    getACatInfo: function(id){
      var cats = getCats();
      var clickedCat = cats[id];
      return clickedCat;
    },
    addCounterClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          updateCatCounter(id);
        });
      }
    },
    updateCatCounter: function(id){
      var cats = getCats();
      var clickedCat = cats[id];
      console.log(clickedCat);
      clickedCat.counter++
      view.updateCounterView();
    },
    addNameClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          showCatInfo(id);
        });
      }
    },
    showCatInfo: function(id){
      var info = getCatInfo(id);
      view.displayCatInfo(info);
    }
  };

  var view = {
    init: function(){
       var cats = contorller.getCatInfo();
       for(var i = 0; i < cats.length; i++){
         $('#cat-names').append("<li id='"+cat+"'>"+cats[i]+"</li>");
       }
    },
    displayCatInfo: function(info){
      console.log(info);
    }
  };

  contorller.init();
});
