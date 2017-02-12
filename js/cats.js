$(document).ready(function(){

  /***************************** MODEL ****************************/
  var cat = {
    init: function(){
      // localStorage.clear();
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
    updateCatCounter: function(id){
      var cats = JSON.parse(localStorage.cats);
      cats[id].counter++;
      localStorage.cats = JSON.stringify(cats);
    },
    getAllCats: function(){
      return JSON.parse(localStorage.cats);
    }
  };

  /***************************** CONTORLLER ****************************/
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
      var cats = this.getCats();
      return
    },
    getCatInfo: function(id){
      var cats = this.getCats();
      var clickedCat = cats[id];
      return clickedCat;
    },
    updateCatCounter: function(id){
      cat.updateCatCounter(id);
      view.updateCounterView(id);
    },
    addCounterClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          contorller.updateCatCounter(id);
        });
      }
    },
    showCatInfo: function(id){
      var info = this.getCatInfo(id);
      view.displayCatInfo(info, id);
    },
    addNameClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          contorller.showCatInfo(id);
        });
      }
    }
  };

  /***************************** VIEW ****************************/
  var view = {
    init: function(){
       var cats = contorller.getCatNames();
       for(var i = 0; i < cats.length; i++){
         $('#cat-names').append("<li id='cat"+ i +"'>"+cats[i]+"</li>");
         contorller.addNameClickListener($('#cat'+i), i);
       }
    },
    displayCatInfo: function(info, id){
      console.log(info);
      $('#container').empty();
      $('#container').append("<div class=\"cat-name\">"+info.catName+"</div>");
      $('#container').append("<div class=\"cat-pic\" id=\""+id+"pic"+"\"><img src='"+info.catPic+"'/></div>");
      $('#container').append("<div class=\"cat-click-counter\" id=\""+id+"\">"+info.counter+"</div>");
      contorller.addCounterClickListener($('#'+id+'pic'), id);
    },
    updateCounterView: function(id){
      console.log(id);
      var info = contorller.getCatInfo(id).counter;
      $('#'+id).text(info);
    }
  };

  contorller.init();
});
